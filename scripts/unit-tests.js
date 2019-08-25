const chokidar = require('chokidar');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const argv = require('yargs').argv
const debounce = require('./utils/debounce');
const generateShieldBadge = require('./code-coverage-shield-badge');
const buildRollupBundle = require('./utils/build-rollup-bundle');
const fse = require('fs-extra');
const buildConfigs = require('./build/rollup-configs.js');
const watch = (argv.w) ? true : false;
const inBrowser = (argv.b) ? true : false;
const spawn = require('child_process').spawn;
const npm = (process.platform === "win32" ? "npm.cmd" : "npm");
const watchDirs = [
  path.join(rootDir, 'src'),
  path.join(rootDir, 'spec', 'unit')
];
let isRunningTests = false;
let executeTestFunctionQueue = [];
let karmaStarted = false;
const buildConfigEsm = buildConfigs.esm;


/**
 * We have to use rollupjs to compile the src directory, as the components
 * have scss style imports which require postcss to import
 *
 * @returns
 */
const compileSrcTs = () => {
  buildConfigEsm.output.dir = './compiled/src';
  return buildRollupBundle(buildConfigEsm)
  .then(() => {
    return Promise.resolve();
  })
  .catch((err) => {
    return Promise.reject(err);
  });
};


/**
 * To compile the spec directory, we use the typescript compiler
 *
 * @returns
 */
const compileSpecTs = () => {
  return new Promise((resolve, reject) => {
    const tscSubProcess = spawn(npm, [
      'run', 'tsc', '--silent', '--', '-p', 'tsconfig.unit.json'
    ], {
      stdio: 'inherit',
      cwd: rootDir
    });
    tscSubProcess.on('exit', function (code) {
      resolve();
    });
    tscSubProcess.on('error', function (code) {
      console.log('Error compiling typescript: ' + code.toString());
      reject();
    });
  });
};


/**
 * Compile typescript to js
 *
 * @returns
 */
const compileTs = () => {
  const startTime = new Date().getTime();
  console.log('Compiling components & specs...');
  return compileSpecTs()
  .then(() => {
    return compileSrcTs();
  })
  .then(() => {
    const endTime = new Date().getTime();
    console.log('Finished...(' + (endTime - startTime) / 1000 + 's)');
    return Promise.resolve();
  })
  .catch((err) => { return Promise.reject(err); });
};


/**
 * Run unit tests via karma
 *
 * @returns
 */
const runUnitTests = () => {
  return new Promise((resolve, reject) => {
    if (karmaStarted) { resolve(); return; }
    karmaStarted = true;
    const startTime = new Date().getTime();
    console.log('Running karam unit tests...');
    let cmd = (watch) ? ['run', 'karma:watch'] : ['run', 'karma:single'];
    if (inBrowser) process.env.MODE = 'browser';
    const subProcess = spawn(npm, cmd, {
      stdio: 'inherit',
      cwd: rootDir
    });
    subProcess.on('exit', function (code) {
      const endTime = new Date().getTime();
      console.log('Finished running tests...(' + (endTime - startTime) / 1000 + 's)');
      resolve();
    });
    subProcess.on('error', function (code) {
      console.log('Error running tests: ' + code.toString());
      reject();
    });
    // if watching, the subProcess will never exit as karma is also watching
    if (watch) resolve();
  });
};


/**
 * Compile typescript and run unit tests. Only do this if we are not in the 
 * middle of performing a unit test already.
 *
 * @returns
 */
const compileTsAndExecuteTests = () => {
  isRunningTests = true;
  return compileTs()
  .then(() => {
    return runUnitTests();
  })
  .then(() => {
    if (!watch) return generateShieldBadge();
    return Promise.resolve();
  })
  .then(() => {
    isRunningTests = false;
    if (executeTestFunctionQueue.length > 0) {
      executeTestFunctionQueue[0]();
      executeTestFunctionQueue = [];
    }
    return Promise.resolve();
  })
  .catch((err) => {
    throw err;
  });
};


/**
 * Start the execution of the unit tests with a debounce time.
 * If the unit tests are already being run, we add the execution function
 * to the queue to be ran at a later when the current running tests finish
 */
const startScript = debounce(() => {
  if (isRunningTests && executeTestFunctionQueue.length === 0) {
    executeTestFunctionQueue.push(compileTsAndExecuteTests);
    return;
  }
  compileTsAndExecuteTests();
}, 200);


if (watch) {
  fse.removeSync(path.join(rootDir, 'compiled'));
  const watcher = chokidar.watch(watchDirs);
  watcher.on('ready', () => {
    compileTsAndExecuteTests();
  });
  watcher.on('change', (path) => {
    startScript();
  });
} else {
  fse.removeSync(path.join(rootDir, 'compiled'));
  compileTsAndExecuteTests()
  .then(() => {
    console.log('Done.');
  })
  .catch((err) => {
    throw err;
  });
}