const chokidar = require('chokidar');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const argv = require('yargs').argv
const exec = require('child_process').exec;

const watchDirs = [
  path.join(rootDir, 'src'),
  path.join(rootDir, 'spec', 'unit')
];


const runUnitTests = () => {
  exec('npm run unit-test', (error, stdout, stderr) => {
    // done
    console.log(stdout);
  });
};


// console.log(watchGlobs[0]);
const watcher = chokidar.watch(watchDirs);

watcher.on('ready', () => {
  console.log('Watching for file changes...');
});

watcher.on('change', (path) => {
  console.log('HAS CHANGE: ' + path);
  runUnitTests();

});
