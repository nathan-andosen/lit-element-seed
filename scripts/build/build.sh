#!/bin/bash

# get the options
while getopts ":v:" opt; do
  case $opt in
    v) 
      version="$OPTARG"
      ;;
    \?) 
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

# determine if we need to update the version
if [ -n "$version" ]; then
  npm --no-git-tag-version version $version
fi

# rm -rf dist
# rm -rf component-typings

node ./scripts/build/build.js