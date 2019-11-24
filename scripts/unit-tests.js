const chokidar = require('chokidar');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const argv = require('yargs').argv;
const generateShieldBadge = require('./code-coverage-shield-badge');
const utilities = require('./utilities');
const fse = require('fs-extra');
const buildConfigs = require('./build/rollup-configs.js');
const watch = (argv.w) ? true : false;
const inBrowser = (argv.b) ? true : false;
const spawn = require('child_process').spawn;
const watchDirs = [
  path.join(rootDir, 'src'),
  path.join(rootDir, 'spec', 'unit')
];
let isRunningTests = false;
let executeTestFunctionQueue = [];
let karmaStarted = false;
const buildConfigEsm = buildConfigs.esm;


/**
 * Compile typescript to js
 *
 * @returns
 */
const compileTypescriptFiles = async () => {
  const startTime = new Date().getTime();
  console.log('Compiling typescript files...');
  await utilities.runNodeProcess('tsc', ['-p', 'tsconfig.unit.json'], rootDir);
  // compile the components using rollupjs, we do this as the components
  // have scss style imports which require postcss to import
  buildConfigEsm.output.dir = './compiled/src/components';
  await utilities.buildRollupBundle(buildConfigEsm);
  const endTime = new Date().getTime();
  console.log('Finished...(' + (endTime - startTime) / 1000 + 's)');
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
    if (inBrowser) process.env.MODE = 'browser';
    const params = ['start', 'karma.conf.js'];
    if (!watch) params.push('--single-run');
    const subProcess = spawn('./node_modules/.bin/karma', params, {
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
const compileTypescriptAndExecuteTests = async () => {
  isRunningTests = true;
  await compileTypescriptFiles();
  await runUnitTests();
  if (!watch) await generateShieldBadge();
  isRunningTests = false;
  if (executeTestFunctionQueue.length > 0) {
    executeTestFunctionQueue[0]();
    executeTestFunctionQueue = [];
  }
};


/**
 * Start the execution of the unit tests with a debounce time.
 * If the unit tests are already being run, we add the execution function
 * to the queue to be ran at a later time when the current running tests finish
 */
const startScript = utilities.debounce(() => {
  if (isRunningTests && executeTestFunctionQueue.length === 0) {
    executeTestFunctionQueue.push(compileTypescriptAndExecuteTests);
    return;
  }
  compileTypescriptAndExecuteTests();
}, 200);


const executeScript = () => {
  fse.removeSync(path.join(rootDir, 'compiled'));
  if (watch) {
    const watcher = chokidar.watch(watchDirs);
    watcher.on('ready', () => {
      compileTypescriptAndExecuteTests();
    });
    watcher.on('change', (path) => {
      startScript();
    });
    return;
  }
  // single run
  compileTypescriptAndExecuteTests()
  .then(() => {
    console.log('Done.');
  })
  .catch((err) => {
    throw err;
  });
};

executeScript();
