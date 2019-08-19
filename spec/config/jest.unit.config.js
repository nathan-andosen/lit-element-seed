// jest config for unit tests
const {defaults} = require('jest-config');

module.exports = {
  "rootDir": '../../',
  "collectCoverage": true,
  "coverageReporters": ["html", "text-summary", "json"],
  "coverageDirectory": "spec/coverage",
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  },
  "collectCoverageFrom": [
    "<rootDir>/compiled/src/**/*.js"
  ],
  roots: [
    "<rootDir>/compiled/spec/unit",
    "<rootDir>/compiled/src"
  ]
};