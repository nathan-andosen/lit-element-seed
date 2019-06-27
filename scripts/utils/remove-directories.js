const fse = require('fs-extra');

/**
 * Remove directories
 *
 * @param {*} index
 * @param {*} dirs
 * @param {*} cb
 * @returns
 */
const removeDirectories = (index, dirs, cb) => {
  if (index >= dirs.length) { cb(); return; }
  fse.remove(dirs[index], (err) => {
    if (err) { cb(err); return; }
    removeDirectories(++index, dirs, cb);
  });
};

module.exports = removeDirectories;