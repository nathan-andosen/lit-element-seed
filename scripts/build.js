const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript2');
const renameExtensions = require('@betit/rollup-plugin-rename-extensions').default;
const postcss = require('rollup-plugin-postcss');
const postcssUrl = require('postcss-url');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify').uglify;
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');
const DEFAULT_EXTENSIONS = require('@babel/core').DEFAULT_EXTENSIONS;
const postBuild = require('./post-build');
const preBuild = require('./pre-build');
const argv = require('yargs').argv
const mode = (argv.mode) ? argv.mode : 'build';


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


const prodBuildUmd = {
  input: `src/index.ts`,
  output: {
    file: 'components/lit-element-seed.umd.js',
    format: 'umd',
    name: 'lit-element-seed',
    globals: {
      '@babel/runtime/regenerator': '_regeneratorRuntime'
    }
  },
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

const prodBuildEsm = {
  input: `src/index.ts`,
  output: {
    dir: './',
    chunkFileNames: 'chunks/[name]-[hash].js',
    entryFileNames: '[name]/index.js',
    format: 'esm'
  },
  treeshake: false,
  preserveModules: true,
  external: [
    'lit-element',
    'tslib'
  ],
  plugins: [
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


// build the bundles, start a dev server, watch for file changes
if (mode === 'dev') {
  prodBuildUmd.plugins.push(serve());
  prodBuildUmd.plugins.push(livereload());
  prodBuildUmd.output.sourcemap = true;
  const watcher = rollup.watch([prodBuildEsm, prodBuildUmd]);
  console.log('Building bundles...');
  const watchEvents = () => {
    watcher.on('event', (event) => {
      if (event.code === 'START') {
        console.log('Detected file change. Rebuilding bundles...');
      } else if (event.code === 'END') {
        // finished bundling all bundles
        console.log('Coping typescript definition files...');
        postBuild().then(() => {
          console.log('Waiting for changes...');
        })
        .catch((err) => {
          console.log(err);
        });
      }
    });
  };
  preBuild().then(() => {
    watchEvents();
  }).catch((err) => { throw err; });
}


// #region PROD BUILD -----------------------------------------------------

/**
 * Build a rollup bundle
 *
 * @param {*} options
 * @returns
 */
const buildBundle = (options) => {
  return rollup.rollup(options)
  .then((bundle) => {
    return bundle.write(options.output);
  })
  .then((output) => {
    return Promise.resolve();
  })
  .catch((err) => {
    console.log('Error...');
    console.log(err);
  });
};

// Build all the required bundles
if (mode === 'build') {
  prodBuildUmd.plugins.push(uglify());
  preBuild()
  .then(() => {
    console.log('Building ES bundle...');
    return buildBundle(prodBuildEsm);
  })
  .then(() => {
    console.log('Building UMD bundle...');
    return buildBundle(prodBuildUmd);
  })
  .then(() => {
    console.log('Coping typescript definition files...');
    return postBuild();
  })
  .then(() => {
    console.log('Bundles built successfully');
  })
  .catch((err) => {
    console.log('Build Error...');
    console.log(err);
  });
}

// #endregion
