const spawn = require('child_process').spawn;

module.exports = (command, params, rootDir) => {
  return new Promise((resolve, reject) => {
    const tscSubProcess = spawn('./node_modules/.bin/' + command, params, {
      stdio: 'inherit',
      cwd: rootDir
    });
    tscSubProcess.on('exit', function (code) {
      resolve();
    });
    tscSubProcess.on('error', function (code) {
      console.log('Error running command: ' + command + '. ' + code.toString());
      reject();
    });
  });
};