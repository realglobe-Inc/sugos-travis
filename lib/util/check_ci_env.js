const co = require('co')

/**
 * 環境変数 CI = true でなければエラー
 */
function checkCiEnv () {
  return co(function * () {
    if (!process.env.CI) {
      throw new Error(`
  This script runs only in CI environment.
  `)
    }
  })
}

module.exports = checkCiEnv
