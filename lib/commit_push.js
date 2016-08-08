/**
 * Github にコミットしてプッシュする
 * @function commitPush
 * @param {Object} options - Optional settings
 * @returns {Promise}
 */
'use strict'

const co = require('co')
const defaults = require('defaults')
const { runTasks } = require('ape-tasking')
const exec = require('./util/exec')
const {setGitConfig, checkCiEnv} = require('./util')

/** @lends commitPush */
function commitPush (options = {}) {
  let { taskName } = defaults(options, {
    taskName: 'Commmit and push to Github on Travis CI'
  })

  return runTasks(taskName, [
    checkCiEnv,
    () => co(function * () {
      setGitConfig()
      pushCommands()
    })
  ], false)
}

function pushCommands () {
  let commands = [
    'git add .',
    'git commit -m "[ci skip] Run build"',
    'git push origin HEAD:master'
  ]
  for (let command of commands) {
    try {
      exec(command)
    } catch (e) {
      console.log('Command Failed')
      console.log(e)
    }
  }
}

module.exports = commitPush
