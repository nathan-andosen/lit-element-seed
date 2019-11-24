const fse = require('fs-extra');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const argv = require('yargs').argv;
const utilities = require('./utilities');

process.env.JEST_PUPPETEER_CONFIG = "spec/config/jest-puppeteer.config.js";
process.env.HEADLESS = (argv.h) ? 'yes' : '';
process.env.SLOW_MO = (argv.s) ? argv.s : 0;

const executeScript = async () => {
  fse.removeSync(path.join(rootDir, 'compiled'));
  await utilities.runNodeProcess('tsc', ['-p', 'tsconfig.e2e.json'], rootDir);
  await utilities.runNodeProcess('jest', ['--config=spec/config/jest.e2e.config.js'], rootDir);
  console.log('Completed...');
};

executeScript();