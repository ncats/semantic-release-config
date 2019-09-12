const path = require('path');
const rootPackageScriptLocation = path.resolve('./scripts/update-root-package.js')

module.exports = {
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        [
            "@semantic-release/npm",
            {
                "pkgRoot": "dist"
            }
        ],
        [
            "@semantic-release/exec",
            {
                "prepareCmd": `node ${rootPackageScriptLocation}`
            }
        ],
        "@semantic-release/git",
        "@semantic-release/github"
    ]
}