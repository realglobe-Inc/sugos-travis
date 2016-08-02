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
  // require を使うと update される前のバージョンが使われるので
  let pkg = fs.readFileSync(join(process.cwd(), 'package.json'), 'utf-8')
  return JSON.parse(pkg).version
}

module.exports = publishNpm
