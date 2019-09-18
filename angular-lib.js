/* This file configures the release of packages as Angular AOT Libraries. */

const path = require('path');

/* We will pass this value in a shell call below, 
so we should make the path absolute to avoid inconsistencies */
const rootPackageScriptLocation = path.resolve(__dirname, './scripts/update-root-package.js');

module.exports = {
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        [
            "@semantic-release/npm",
            /* Only publish the dist folder */
            {
                "pkgRoot": "dist"
            }
        ],
        [
            "@semantic-release/exec",
            /* Update root package.json and package-lock.json BEFORE git and github run,
            otherwise new version would not be commited automatically */
            {
                "prepareCmd": `node ${rootPackageScriptLocation}`
            }
        ],
        "@semantic-release/git",
        "@semantic-release/github"
    ]
}