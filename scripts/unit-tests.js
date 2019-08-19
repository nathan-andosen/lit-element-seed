const chokidar = require('chokidar');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const argv = require('yargs').argv
const debounce = require('./utils/debounce');
const generateShieldBadge = require('./code-coverage-shield-badge');
const watch = (argv.watch) ? true : false;
const spawn = require('child_process').spawn;
const npm = (process.platform === "win32" ? "npm.cmd" : "npm");
const watchDirs = [
  path.join(rootDir, 'src'),
  path.join(rootDir, 'spec', 'unit')
];
let isRunningTests = false;
let executeTestFunctionQueue = [];


/**
 * Compile typescript to js
 *
 * @returns
 */
const compileTs = () => {
  return new Promise((resolve, reject) => {
    const startTime = new Date().getTime();
    console.log('Compiling ts...');
    const tscSubProcess = spawn(npm, [
      'run', 'tsc', '--silent', '--', '-p', 'tsconfig.test.json'
    ], {
      stdio: 'inherit',
      cwd: rootDir
    });
    tscSubProcess.on('exit', function (code) {
      const endTime = new Date().getTime();
      console.log('Finished compiling ts...(' + (endTime - startTime) / 1000 + 's)');
      resolve();
    });
    tscSubProcess.on('error', function (code) {
      console.log('Error compiling typescript: ' + code.toString());
      reject();
    });
  });
};


/**
 * Run unit tests via jest
 *
 * @returns
 */
const runUnitTests = () => {
  return new Promise((resolve, reject) => {
    const startTime = new Date().getTime();
    console.log('Running unit tests...');
    const subProcess = spawn(npm, [
      'run', 'jest', '--silent', '--', '--config=spec/config/jest.unit.config.js'
    ], {
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
    return generateShieldBadge();
  })
  .then(() => {
    isRunningTests = false;
    if (executeTestFunctionQueue.length > 0) {
      executeTestFunctionQueue[0]();
      executeTestFunctionQueue = [];
    }
    if (watch) console.log('Watching for file changes...');
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
  const watcher = chokidar.watch(watchDirs);
  watcher.on('ready', () => {
    compileTsAndExecuteTests();
  });
  watcher.on('change', (path) => {
    startScript();
  });
} else {
  compileTsAndExecuteTests()
  .then(() => {
    console.log('Done.');
  })
  .catch((err) => {
    throw err;
  });
}