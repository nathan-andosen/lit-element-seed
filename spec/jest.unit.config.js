// jest config for unit tests
const {defaults} = require('jest-config');

module.exports = {
  "rootDir": '../',
  "coverageReporters": ["html", "text-summary"],
  "coverageDirectory": "spec/coverage",
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": -10
    }
  },
  "collectCoverageFrom": [
    // "**/*.js",
    "<rootDir>/compiled/src/**/*.js",
    // "<rootDir>/compiled/spec/unit/**/*.js"
    // "!**/node_modules/**",
    // "!**/vendor/**"
  ],
  "collectCoverage": true,
  roots: [
    "<rootDir>/compiled/spec/unit",
    "<rootDir>/compiled/src"
  ],
  // roots: ["<rootDir>/../"],
  // preset: "jest-puppeteer"
};