const fse = require('fs-extra');
const path = require('path');
const spawn = require('child_process').spawn;
const rootDir = path.join(__dirname, '..');
const argv = require('yargs').argv;

process.env.JEST_PUPPETEER_CONFIG = "spec/config/jest-puppeteer.config.js";
process.env.HEADLESS = (argv.h) ? 'yes' : '';
process.env.SLOW_MO = (argv.s) ? argv.s : 0;

const compileSpecTs = () => {
  return new Promise((resolve, reject) => {
    const tscSubProcess = spawn('./node_modules/.bin/tsc', [
      '-p', 'tsconfig.e2e.json'
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

const runJestTests = () => {
  return new Promise((resolve, reject) => {
    const tscSubProcess = spawn('./node_modules/.bin/jest', [
      '--config=spec/config/jest.e2e.config.js'
    ], {
      stdio: 'inherit',
      cwd: rootDir
    });
    tscSubProcess.on('exit', function (code) {
      resolve();
    });
    tscSubProcess.on('error', function (code) {
      console.log('Error running jest tests: ' + code.toString());
      reject();
    });
  });
};


const executeScript = async () => {
  fse.removeSync(path.join(rootDir, 'compiled'));
  await compileSpecTs();
  await runJestTests();
  console.log('Completed...');
};

executeScript();