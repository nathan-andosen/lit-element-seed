const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify').uglify;
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');
const postBuild = require('./post-build');
const preBuild = require('./pre-build');
const argv = require('yargs').argv
const mode = (argv.mode) ? argv.mode : 'build';
const buildConfigs = require('./rollup-configs.js');
const buildRollupBundle = require('../utils/build-rollup-bundle');

// our rollup configs
const buildConfigUmd = buildConfigs.umd;
const buildConfigEsm = buildConfigs.esm;


// #region DEV SERVER & BUILD --------------------------------------------

// build the bundles, start a dev server, watch for file changes
if (mode === 'dev') {
  buildConfigUmd.plugins.push(serve({
    port: 1350,
    // historyApiFallback: true,
    contentBase: [ './', 'src' ],
    headers: { 'Access-Control-Allow-Origin': '*' }
  }));
  buildConfigUmd.plugins.push(livereload({ 
    watch: ['./dist', '/src/index.html'] 
  }));
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
    const watcher = rollup.watch([buildConfigEsm, buildConfigUmd]);
    watchEvents(watcher);
  }).catch((err) => { throw err; });
}

// #endregion


// #region PROD BUILD -----------------------------------------------------

// Build all the required bundles
if (mode === 'build') {
  const startTime = new Date().getTime();
  buildConfigUmd.plugins.push(uglify());
  buildConfigUmd.cache = false;
  buildConfigEsm.cache = false;
  preBuild()
  .then(() => {
    console.log('Building ES bundle...');
    return buildRollupBundle(buildConfigEsm);
  })
  .then(() => {
    console.log('Building UMD bundle...');
    return buildRollupBundle(buildConfigUmd);
  })
  .then(() => {
    console.log('Coping typescript declaration files...');
    return postBuild();
  })
  .then(() => {
    const endTime = new Date().getTime();
    console.log('Bundles built successfully. (' +
      ((endTime - startTime) / 1000) + 's)');
    process.exit();
  })
  .catch((err) => {
    throw err;
  });
}

// #endregion
