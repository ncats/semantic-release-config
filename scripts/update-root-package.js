/* 
	Semantic-release only updates the nested package.json version, 
	https://github.com/semantic-release/npm#examples 
*/
const fs = require('fs');
const path = require('path');

const travisDir = process.env.TRAVIS_BUILD_DIR;

console.log('Current Travis directory is: ', travisDir);

const nestedPackage = require(path.join(travisDir, './dist/package.json'));
console.log('Nested package.json contains version', nestedPackage.version);

const rootPackage = require(path.join(travisDir, './package.json'));
console.log('Root package.json contains version', rootPackage.version);

console.log('Updating root package.json version');
rootPackage.version = nestedPackage.version;

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

const rootPackageLock = require(path.join(travisDir, './package-lock.json'));
console.log('Updating root package-lock.json version');
rootPackageLock.version = nestedPackage.version;

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
