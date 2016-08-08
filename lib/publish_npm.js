/**
 * Travis CI 上でパッチバージョンを上げて git push と npm publish する。ただし .npmignore に記載されたファイルのみ変更の場合は無視する。
 * @function publishNpm
 * @param {Object} options - Optional settings
 * @returns {Promise}
 */
'use strict'

const co = require('co')
const fs = require('fs')
const defaults = require('defaults')
const { runTasks } = require('ape-tasking')
const {join} = require('path')
const exec = require('./util/exec')
const {hasLibraryDiff, setGitConfig, isEmptyCommit, checkCiEnv} = require('./util')

/** @lends publishNpm */
function publishNpm (options = {}) {
  let { taskName, force } = defaults(options, {
    taskName: 'npm publish on Travis CI',
    force: false
  })

  return runTasks(taskName, [
    checkCiEnv,
    () => co(function * () {
      let shouldSkip = !force && !hasLibraryDiff() && !isEmptyCommit()
      if (shouldSkip) {
        return
      }
      setGitConfig()
      publishNewVersion()
    })
  ], false)
}

function publishNewVersion () {
  let commands = [
    `npm version patch -m "[ci skip] Travis CI incremented the version to ${version()}"`,
    'git push origin HEAD:master',
    'npm publish'
  ]
  for (let command of commands) {
    exec(command)
  }
}

function version () {
  let version = require(join(process.cwd(), 'package.json')).version
  let split = version.split('.')
  split[2] = Number(split[2]) + 1
  let newVersion = split.join('.')
  return newVersion
}

module.exports = publishNpm
