const path = require('path');
const rootDir = path.join(__dirname, '../../');
const fse = require('fs-extra');

/**
 * The exported pre build script function
 *
 * @returns
 */
const preBuild = () => {
  fse.removeSync(path.join(rootDir, 'component-typings'));
  fse.removeSync(path.join(rootDir, 'dist'));
};

module.exports = preBuild;