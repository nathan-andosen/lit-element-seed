#!/bin/bash

./node_modules/.bin/tsc -p tsconfig.test.json

# ./node_modules/.bin/jest
JEST_PUPPETEER_CONFIG=spec/jest-puppeteer.config.js ./node_modules/.bin/jest --config=spec/jest.unit.config.js