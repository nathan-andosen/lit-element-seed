const fse = require('fs-extra');
const path = require('path');
const rootDir = path.join(__dirname, '../../');

const componentTypingsDir = path.join(rootDir, 'component-typings');
const copySrc = componentTypingsDir;
const copyDest = path.join(rootDir, 'components');

const postBuild = () => {
  try{
    fse.copySync(copySrc, copyDest);
    fse.removeSync(componentTypingsDir);
  } catch(err) {
    console.log('Post build error');
    console.log(err);
  }
};

module.exports = postBuild;
