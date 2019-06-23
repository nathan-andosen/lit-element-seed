const fse = require('fs-extra');
const path = require('path');
const rootDir = path.join(__dirname, '../');

const componentTypingsDir = path.join(rootDir, 'component-typings');
const componentsDir = path.join(rootDir, 'components');

const preBuild = () => {
  return new Promise((resolve, reject) => {
    fse.remove(componentTypingsDir, (err) => {
      if (err) { reject(err); return; }
      fse.remove(componentsDir, (err) => {
        if (err) { reject(err); return; }
        resolve();
      });
    });
  });
};

module.exports = preBuild;