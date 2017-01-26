/**
 * Travis の環境変数を設定する。暗号化された環境変数を.travis.ymlに書く。
 * @function setEnv
 * @param {Object} options - Optional settings
 * @returns {Promise}
 */
'use strict'

const co = require('co')
const hasbin = require('hasbin')
const fs = require('fs')
const { runTasks } = require('ape-tasking')
const { execSync } = require('child_process')

/** @lends setEnv */
function setEnv (options = {}) {
  let {
    taskName = 'Set environment variables on Travis CI',
    values = {
      NPM_USER: secret('jfrog:deployer:username'),
      NPM_PASSWORD: secret('jfrog:deployer:password'),
      GIT_USER: secret('github:ci:username'),
      GIT_PASSWORD: secret('github:ci:password'),
      GIT_EMAIL: secret('github:ci:email')
    }
  } = options

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
      let envSet = Object.keys(values).reduce((text, key) => {
        return `${text}${key}=${values[ key ]} `
      }, '')
      // Forkレポジトリと本家レポジトリでは異なる暗号化になるかも
      let encryptCommand = `travis encrypt ${envSet} --no-interactive`
      let encryptedEnv = execSync(encryptCommand).toString().trim()
      let formattedEnv = formatEnv(encryptedEnv)
      yield appendTravisyml(formattedEnv)
    })
  ], false)
}

function secret (key) {
  return execSync(`sugos-secrets get ${key} -r`).toString().trim()
}

function formatEnv (env) {
  return `env:
  secure: ${env}`
}

// CLI の `travis encrypt --add` は微妙にバグがあるので使わない
// バグ: .travis.yml に`>`があると勝手に改行される
function appendTravisyml (text) {
  return new Promise((resolve, reject) => {
    let writer = fs.createWriteStream('.travis.yml', { flags: 'a' })
    writer.on('clone', resolve)
    writer.on('error', reject)
    writer.write(text)
  })
}

module.exports = setEnv
