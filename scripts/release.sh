#!/bin/bash

# This file is a wrapper for correcting the path for calling scripts
# as well as piping "build:lib" and "semantic-release" scripts
# It only calls the latter if the first was successful, otherwise logs error

# TRAVIS_BUILD_DIR will make sure this bash script is called from the root
# The root folder should contain a package.json with build:lib command calling ng-packagr,
# as well as "semantic-release" script 
echo "Changing directory to $TRAVIS_BUILD_DIR"
cd "$TRAVIS_BUILD_DIR"

if npm "run" "build:lib" ; then
	npm "run" "semantic-release"
else
	echo "npm run build failed"
fi
