#!/bin/bash

echo "Changing directory to $TRAVIS_BUILD_DIR"

# note: This does not work with symlinks
cd "$TRAVIS_BUILD_DIR"

if npm "run" "build:lib" ; then
	npm "run" "semantic-release"
else
	echo "npm run build failed"
fi
