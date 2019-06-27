const path = require('path');
const rootDir = path.join(__dirname, '../');
const removeDirectories = require('./utils/remove-directories');


/**
 * The exported pre build script function
 *
 * @returns
 */
const preBuild = () => {
  return new Promise((resolve, reject) => {
    const dirs = [
      path.join(rootDir, 'component-typings'),
      path.join(rootDir, 'components'),
      path.join(rootDir, 'dist')
    ];
    removeDirectories(0, dirs, (err) => {
      if (err) { reject(err); return; }
      resolve();
    });
  });
};

module.exports = preBuild;