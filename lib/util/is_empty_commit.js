const {execSync} = require('child_process')

/**
 * 直近のコミットが空コミットなら true を返す
 * @returns {Boolean}
 */
function isEmptyCommit () {
  return execSync('git diff --name-only').toString().length === 0
}

module.exports = isEmptyCommit
