const fse = require('fs-extra');
const path = require('path');
const rootDir = path.join(__dirname, '../');

const componentTypingsDir = path.join(rootDir, 'component-typings');
const copySrc = path.join(componentTypingsDir, 'components');
const copyDest = path.join(rootDir, 'components');
const indexDefinitionSrc = path.join(componentTypingsDir, 'index.d.ts');
const indexDefinitionDest = path.join(rootDir, 'index.d.ts');

const postBuild = () => {
  return new Promise((resolve, reject) => {
    fse.copy(copySrc, copyDest, (err) => {
      if (err) { reject(err); return; }
      fse.copy(indexDefinitionSrc, indexDefinitionDest, (err) => {
        if (err) { reject(err); return; }
        fse.remove(componentTypingsDir, (err) => {
          if (err) { reject(err); return; }
          resolve();
        });
      });
    });
  });
};

module.exports = postBuild;
