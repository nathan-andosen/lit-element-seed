#!/bin/bash

rm -rf ./components
rm -rf ./component-typings

rollup -c ./config/rollup.config.js