import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { uglify } from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import renameExtensions from '@betit/rollup-plugin-rename-extensions';
import postcssUrl from 'postcss-url';

const componentName = 'status-alert';


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
  extensions: ['scss'],

  // do not inject the css style in the head element
  inject: false,

  plugins: [
    postcssUrl({
      basePath: [
        './assets/icomoon',
        './'
      ],
      url: 'inline',
      // url: (asset, dir, options, decl, warn, result) => {
      //   console.log(asset);
      //   console.log(dir);
      // }
    })
  ]
};


const typescriptPluginOptions = {
  typescript: require('typescript'),
  useTsconfigDeclarationDir: true
};

// #endregion




const prodBuildUmd = {
  // input: `src/components/${componentName}/${componentName}.component.ts`,
  input: `src/index.ts`,
  output: {
    // file: `dist/${componentName}/${componentName}.component.umd.js`,
    // dir: `dist/[name]`,
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
    postcss(postCssPluginOptions),
    
    
    // uglify()
  ]
};


const prodBuildEsm = {
  // input: {
  //   // 'input': 'src/index.ts',
  //   'status-alert': `src/components/status-alert/index.ts`,
  //   'fancy-button': `src/components/fancy-button/index.ts`
  // },
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
    // resolve / locate modules using the node resolution algorithm 
    // resolve(),

    // convert CommonJs modules (var myModule = require('./my-module.js')) 
    // to ES6 modules
    // commonjs(),

    // compile typescript files to js
    typescript(typescriptPluginOptions),
    renameExtensions({
      include: ['**/*.ts', '**/*.scss'],
      mappings: {
        '.ts': '.js',
        '.scss': '.js'
      },
    }),
    // ts(),

    // process scss / css files
    postcss(postCssPluginOptions)
  ]
};



export default [
  prodBuildEsm,
  prodBuildUmd
];