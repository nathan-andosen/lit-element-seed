// jest config for e2e tests
const {defaults} = require('jest-config');

module.exports = {
  
  roots: ["<rootDir>/../../compiled/spec/e2e"],
  // roots: ["<rootDir>/../compiled/spec/e2e"],
  preset: "jest-puppeteer"
};