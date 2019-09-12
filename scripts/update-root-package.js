/* 
  This file is called during "prepareCmd" step of "@semantic-release/exec" 
  in lib.js configuration file. It will update the root package since 
  commit-analyzer plugin only updates package.json and package-lock.json
  files inside the "/dist" folder.
  Once this has run, git and github plugins will run with correct version 
  in root files, allowing for automatic version update commit .
	https://github.com/semantic-release/npm#examples 
*/

const fs = require('fs');
const path = require('path');

/* Locate Travis Root to ensure scripts are called from the right folder */
const travisDir = process.env.TRAVIS_BUILD_DIR;
console.log('Current Travis directory is: ', travisDir);

/* Open nested package content */
const nestedPackage = require(path.join(travisDir, './dist/package.json'));
console.log('Nested package.json contains version', nestedPackage.version);

/* Open root package content */
const rootPackage = require(path.join(travisDir, './package.json'));
console.log('Root package.json contains version', rootPackage.version);

/* Update root package object with latest version */
console.log('Updating root package.json version');
rootPackage.version = nestedPackage.version;

/* Serialize root package object, then save it back in package.json */
fs.writeFile(
  path.join(travisDir, './package.json'),
  JSON.stringify(rootPackage, null, 2),
  function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Version updated successfully');
  },
);

/* Open Root Package Lock, we already have latest version from nested package.json */
const rootPackageLock = require(path.join(travisDir, './package-lock.json'));

/* Update lock object */
console.log('Updating root package-lock.json version');
rootPackageLock.version = nestedPackage.version;

/* Serialize lock object and save it back in package-lock.json */
fs.writeFile(
  path.join(travisDir, './package-lock.json'),
  JSON.stringify(rootPackageLock, null, 2),
  function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Version updated successfully');
  },
);
