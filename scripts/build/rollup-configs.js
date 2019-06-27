const DEFAULT_EXTENSIONS = require('@babel/core').DEFAULT_EXTENSIONS;
const postcss = require('rollup-plugin-postcss');
const postcssUrl = require('postcss-url');
const package = require('../../package.json');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const babel = require('rollup-plugin-babel');
const renameExtensions = require('@betit/rollup-plugin-rename-extensions').default;
const banner = require('./banner');

// #region PLUGIN OPTIONS -------------------------------------------------

const babelPluginOptions = {
  // tell babel we are not using a bablerc file
  babelrc: false,

  // by default, babel wont care about ts files
  extensions: [
    ...DEFAULT_EXTENSIONS,
    'ts',
    'tsx'
  ],


  runtimeHelpers: true,
  "plugins": [
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-transform-classes", {"loose": true}],
    [
      '@babel/plugin-transform-runtime',
      {
        "corejs": false,
        "helpers": false,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ],
  presets: [
    [
      '@babel/preset-env', {
        // "useBuiltIns": "entry",
        targets: {
          ie: '11'
        }
      }
    ]
  ]
};


const postCssPluginOptions = {
  // tell postCss to process scss files
  extensions: ['.scss', '.css'],

  // do not inject the css style in the head element
  inject: false,

  plugins: [
    postcssUrl({
      basePath: [
        './'
      ],
      url: 'inline'
    })
  ]
};


const typescriptPluginOptions = {
  typescript: require('typescript'),
  useTsconfigDeclarationDir: true
};

// #endregion


const watchOptions = {
  chokidar: {
    paths: 'src/**'
  }
};


// #region UMD BUILD -------------------------------------------------

const buildConfigUmd = {
  input: `src/index.ts`,
  output: {
    file: `dist/${package.name}.umd.js`,
    format: 'umd',
    name: package.name,
    sourcemap: true,
    globals: {
      '@babel/runtime/regenerator': '_regeneratorRuntime'
    }
  },
  watch: watchOptions,
  
  cache: true,
  treeshake: true,
  plugins: [
    // resolve / locate modules using the node resolution algorithm 
    resolve(),

    // convert CommonJs modules (var myModule = require('./my-module.js')) 
    // to ES6 modules
    commonjs(),

    // compile typescript files to js
    typescript(typescriptPluginOptions),

    // compile future js (es6, es7) to es5
    babel(babelPluginOptions),

    // process scss / css files
    postcss(postCssPluginOptions)
  ]
};

// #endregion



// #region ESM BUILD -------------------------------------------------

const buildConfigEsm = {
  input: `src/index.ts`,
  output: {
    dir: './dist',
    chunkFileNames: 'chunks/[name]-[hash].js',
    entryFileNames: '[name]/index.js',
    format: 'esm',
    sourcemap: true,
    banner: banner
  },
  watch: watchOptions,
  cache: true,
  treeshake: true,
  preserveModules: true,
  external: [
    'lit-element',
    'tslib',
    '@thenja/decorators'
  ],
  plugins: [
    // resolve / locate modules using the node resolution algorithm 
    resolve(),
    
    // compile typescript files to js
    typescript(typescriptPluginOptions),
    renameExtensions({
      include: ['**/*.ts', '**/*.scss', '**/*.css'],
      mappings: {
        '.ts': '.js',
        '.scss': '.js',
        '.css': '.js'
      },
    }),

    // process scss / css files
    postcss(postCssPluginOptions)
  ]
};

// #endregion



// export our build configs
module.exports = {
  umd: buildConfigUmd,
  esm: buildConfigEsm
};