// jest config for unit tests
const {defaults} = require('jest-config');

module.exports = {
  
  roots: ["<rootDir>/../compiled/spec/"],
  preset: "jest-puppeteer"
};