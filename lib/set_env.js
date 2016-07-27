/**
 * Travis の環境変数を設定する。暗号化された環境変数を.travis.ymlに書く。
 * @function setEnv
 * @param {Object} options - Optional settings
 * @returns {Promise}
 */
'use strict'

const co = require('co')
const defaults = require('defaults')
const hasbin = require('hasbin')
const { runTasks } = require('ape-tasking')
const {execSync} = require('child_process')

/** @lends setEnv */
function setEnv (options = {}) {
  let { taskName } = defaults(options, {
    taskName: 'Set environment variables on Travis CI'
  })

  return runTasks(taskName, [
    () => co(function * () {
      let hasSugosSecrets = hasbin.sync('sugos-secrets')
      let hasTravisCli = hasbin.sync('travis')
      if (!hasSugosSecrets) {
        errorMessage('sugos-secrets')
      }
      if (!hasTravisCli) {
        errorMessage('travis')
      }
      function errorMessage (bin) {
        console.error(`
  You need ${bin}.
`)
      }
    }),
    () => co(function * () {
      let env = {
        NPM_USER: secret('jfrog:deployer:username'),
        NPM_PASSWORD: secret('jfrog:deployer:password'),
        GIT_USER: secret('github:ci:username'),
        GIT_PASSWORD: secret('github:ci:password'),
        GIT_EMAIL: secret('github:ci:email')
      }
      for (let key of Object.keys(env)) {
        execSync(`travis encrypt ${key}=${env[key]} --add env --append`, {stdio: 'inherit'})
      }
    })
  ], false)
}

function secret (key) {
  return execSync(`sugos-secrets get ${key} -r`).toString().trim()
}

module.exports = setEnv
