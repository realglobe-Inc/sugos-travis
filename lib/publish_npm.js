/**
 * Travis CI 上でパッチバージョンを上げて git push と npm publish する。ただし .npmignore に記載されたファイルのみ変更の場合は無視する。
 * @function publishNpm
 * @param {Object} options - Optional settings
 * @returns {Promise}
 */
'use strict'

const co = require('co')
const defaults = require('defaults')
const { runTasks } = require('ape-tasking')
const {join} = require('path')
const exec = require('./util/exec')
const {hasLibraryDiff, setGitConfig, isEmptyCommit} = require('./util')

/** @lends publishNpm */
function publishNpm (options = {}) {
  let { taskName } = defaults(options, {
    taskName: 'npm publish on Travis CI'
  })

  return runTasks(taskName, [
    () => co(function * () {
      let shouldSkip = !hasLibraryDiff() && !isEmptyCommit()
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
    'npm --no-git-tag-version version patch',
    'git add package.json',
    `git commit -m "[ci skip] Travis CI incremented the version to ${version()}"`,
    'git diff HEAD^ HEAD',
    'git push origin HEAD:master',
    'npm publish'
  ]
  for (let command of commands) {
    exec(command)
  }
}

function version () {
  return require(join(process.cwd(), 'package.json')).version
}

module.exports = publishNpm
