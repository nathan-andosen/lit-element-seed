#!/bin/bash

rm -rf compiled
./node_modules/.bin/tsc -p tsconfig.test.json

# ./node_modules/.bin/jest
JEST_PUPPETEER_CONFIG=spec/config/jest-puppeteer.config.js ./node_modules/.bin/jest --config=spec/config/jest.e2e.config.js