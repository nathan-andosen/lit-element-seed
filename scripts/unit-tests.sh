#!/bin/bash

# echo 'Compiling typescript...'
# ./node_modules/.bin/tsc -p tsconfig.test.json

# echo 'Run unit tests...'
./node_modules/.bin/jest --config=spec/jest.unit.config.js

# node ./scripts/unit-tests-watcher.js