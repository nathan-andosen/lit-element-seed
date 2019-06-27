const rollup = require('rollup');

/**
 * Build a rollup bundle and write it to disk
 *
 * @param {*} options
 * @returns
 */
const buildRollupBundle = (options) => {
  return rollup.rollup(options)
  .then((bundle) => {
    return bundle.write(options.output);
  })
  .then((output) => {
    return Promise.resolve();
  })
  .catch((err) => {
    return Promise.reject(err);
  });
};

module.exports = buildRollupBundle;