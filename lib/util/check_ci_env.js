/**
 * 環境変数 CI = true でなければエラー
 */
function checkCiEnv () {
  if (!process.env.CI) {
    throw new Error(`
This script runs only in CI environment.
`)
  }
}

module.exports = checkCiEnv
