const fse = require('fs-extra');
const path = require('path');
const rootDir = path.join(__dirname, '../');

const componentTypings = path.join(rootDir, 'component-typings');
const copySrc = path.join(componentTypings, 'components');
const copyDest = path.join(rootDir, 'components');
const indexDefinitionSrc = path.join(componentTypings, 'index.d.ts');
const indexDefinitionDest = path.join(rootDir, 'index.d.ts');

fse.copy(copySrc, copyDest, (err) => {
  fse.copy(indexDefinitionSrc, indexDefinitionDest, (err) => {
    fse.remove(componentTypings, (err) => {
      process.exit();
    });
  });
});