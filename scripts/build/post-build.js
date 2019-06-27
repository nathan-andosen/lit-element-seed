const fse = require('fs-extra');
const path = require('path');
const rootDir = path.join(__dirname, '../../');
const removeDirectories = require('../utils/remove-directories');

const componentTypingsDir = path.join(rootDir, 'component-typings');
const copySrc = componentTypingsDir;
const copyDest = path.join(rootDir, 'dist');

const postBuild = () => {
  return new Promise((resolve, reject) => {
    fse.copy(copySrc, copyDest, (err) => {
      removeDirectories(0, [componentTypingsDir], (err) => {
        if (err) { reject(err); return; }
        resolve();
      });
    });
  });
};

module.exports = postBuild;
