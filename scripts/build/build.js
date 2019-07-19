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
const banner = require('./banner');
const package = require('../../package.json');
const path = require('path');
const rootDir = path.join(__dirname, '..', '..');

// our rollup configs
const buildConfigUmd = buildConfigs.umd;
const buildConfigEsm = buildConfigs.esm;

const printOutput = (msg) => { console.log(msg); };


// #region DEV SERVER & BUILD --------------------------------------------

// build the bundles, start a dev server, watch for file changes
if (mode === 'dev') {
  preBuild();

  buildConfigUmd.plugins.push(serve({
    open: false,
    port: 1350,
    contentBase: [ 'node_modules/@webcomponents', 'dist', 'src' ],
    headers: { 'Access-Control-Allow-Origin': '*' }
  }));
  buildConfigUmd.plugins.push(livereload({ 
    delay: 300,
    // usePolling: true,
    watch: [
      path.join(rootDir, 'src', 'index.html'),
      path.join(rootDir, 'src', 'pages'),
      path.join(rootDir, 'dist')
    ]
  }));
  
  const watcher = rollup.watch([buildConfigEsm, buildConfigUmd]);
  let startTime;
  watcher.on('event', (event) => {
    if (event.code === 'START') {
      startTime = new Date().getTime();
      printOutput('Building bundles...');
    } else if (event.code === 'END') {
      // finished bundling all bundles
      const endTime = new Date().getTime();
      printOutput('Finished building bundles (' + ((endTime - startTime) / 1000) + 's)');
      postBuild();
      printOutput('Waiting for changes...');
    } else if (event.code === 'FATAL' || event.code === 'ERROR') {
      throw event.error;
    }
  });
}

// #endregion


// #region PROD BUILD -----------------------------------------------------

// Build all the required bundles
if (mode === 'build') {
  const startTime = new Date().getTime();
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
    console.log('Building minified UMD bundle...');
    buildConfigUmd.output.file = `dist/${package.name}.umd.min.js`;
    buildConfigUmd.plugins.push(uglify({
      output: {
        preamble: banner
      }
    }));
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
