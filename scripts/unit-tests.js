const chokidar = require('chokidar');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const argv = require('yargs').argv
const debounce = require('./utils/debounce');
const watch = (argv.watch) ? true : false;
const spawn = require('child_process').spawn;
const npm = (process.platform === "win32" ? "npm.cmd" : "npm");
const watchDirs = [
  path.join(rootDir, 'src'),
  path.join(rootDir, 'spec', 'unit')
];


const compileTs = () => {
  return new Promise((resolve, reject) => {
    const startTime = new Date().getTime();
    console.log('Compiling ts...');
    const tscSubProcess = spawn(npm, [
      'run', 'tsc', '--', '-p', 'tsconfig.test.json'
    ], {
      stdio: 'inherit',
      cwd: rootDir
    });
    tscSubProcess.on('exit', function (code) {
      // console.log('child process exited with code ' + code.toString());
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

const runUnitTests = () => {
  return new Promise((resolve, reject) => {
    const startTime = new Date().getTime();
    console.log('Running unit tests...');
    const subProcess = spawn(npm, [
      'run', 'jest', '--', '--config=spec/jest.unit.config.js'
    ], {
      stdio: 'inherit',
      cwd: rootDir
    });
    subProcess.on('exit', function (code) {
      const endTime = new Date().getTime();
      console.log('Finished running tests...(' + (endTime - startTime) / 1000 + 's)');
      if (watch) console.log('Watching for file changes...');
      resolve();
    });
    subProcess.on('error', function (code) {
      console.log('Error running tests: ' + code.toString());
      reject();
    });
  });
};


let running = false;
let queue = [];

const compileTsAndExecuteTests = () => {
  running = true;
  return compileTs()
  .then(() => {
    return runUnitTests();
  })
  .then(() => {
    running = false;
    if (queue.length > 0) {
      queue[0]();
      queue = [];
    }
  })
  .catch((err) => {
    throw err;
  });
};

const startScript = debounce(() => {
  if (running && queue.length === 0) {
    queue.push(compileTsAndExecuteTests);
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
    console.log('Done...');
  })
  .catch((err) => {
    throw err;
  });
}