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
const package = require('../package.json');


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
    file: `dist/${package.name}.umd.js`,
    format: 'umd',
    name: package.name,
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
    dir: './dist',
    chunkFileNames: 'chunks/[name]-[hash].js',
    entryFileNames: '[name]/index.js',
    format: 'esm'
    // paths: {
    //   'tslib': '../../node_modules/tslib/tslib.es6.js',
    //   'lit-element': '../../node_modules/lit-element/lit-element.js'
    // }
  },
  treeshake: true,
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
  // treeshake = false will create bigger bundles but may speed up build times
  prodBuildEsm.treeshake = false;
  prodBuildUmd.plugins.push(serve({
    open: false,
    port: 1350,
    historyApiFallback: true,
    contentBase: [
      './',
      'src'
    ],
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }));
  prodBuildUmd.plugins.push(livereload({
    watch: ['./dist']
  }));
  prodBuildUmd.output.sourcemap = true;
  console.log('Building bundles...');
  const watchEvents = (watcher) => {
    let startTime;
    watcher.on('event', (event) => {
      if (event.code === 'START') {
        startTime = new Date().getTime();
        console.log('Detected file change. Rebuilding bundles...');
      } else if (event.code === 'END') {
        // finished bundling all bundles
        const endTime = new Date().getTime();
        console.log('Finished building bundles, time: ' +
          ((endTime - startTime) / 1000) + 's');
        console.log('Coping typescript definition files...');
        postBuild().then(() => {
          console.log('Waiting for changes...');
        })
        .catch((err) => {
          console.log(err);
        });
      } else if (event.code === 'FATAL' || event.code === 'ERROR') {
        throw event.error;
      }
    });
  };
  preBuild().then(() => {
    const watcher = rollup.watch([prodBuildEsm, prodBuildUmd]);
    watchEvents(watcher);
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
  const startTime = new Date().getTime();
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
    const endTime = new Date().getTime();
    console.log('Bundles built successfully. Time: ' +
      ((endTime - startTime) / 1000) + 's');
    process.exit();
  })
  .catch((err) => {
    console.log('Build Error...');
    console.log(err);
  });
}

// #endregion
