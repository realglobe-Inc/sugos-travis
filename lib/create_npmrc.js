/**
 * Travis で HOME に .npmrc を作る。
 * @function createNpmrc
 * @param {Object} options - Optional settings
 * @returns {Promise}
 */
'use strict'

const co = require('co')
const defaults = require('defaults')
const { runTasks } = require('ape-tasking')
const exec = require('./util/exec')
const fileExists = require('file-exists')

/** @lends createNpmrc */
function createNpmrc (options = {}) {
  let { taskName } = defaults(options, {
    taskName: 'Set environment variables on Travis CI'
  })

  return runTasks(taskName, [
    () => co(function * () {
      let shouldSkip = fileExists(process.env.HOME + '/.npmrc')
      if (shouldSkip) {
        return
      }
      let commands = [
        'echo "registry = https://realglobe.artifactoryonline.com/realglobe/api/npm/npm-virtual" > $HOME/.npmrc',
        'curl -u${NPM_USER}:${NPM_PASSWORD} "https://realglobe.artifactoryonline.com/realglobe/api/npm/auth" >> $HOME/.npmrc',
        'cat $HOME/.npmrc'
      ]
      for (let command of commands) {
        exec(command)
      }
    })
  ], false)
}

module.exports = createNpmrc
