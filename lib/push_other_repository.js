/**
 * Travis CI 上で他のリポジトリに空 git push する。ただし .npmignore に記載されたファイルの変更のみの場合は無視する。
 * @function pushOtherRepository
 * @param {Object} options - Optional settings
 * @returns {Promise}
 */
'use strict'

const co = require('co')
const defaults = require('defaults')
const { runTasks } = require('ape-tasking')
const exec = require('./util/exec')
const {hasLibraryDiff, setGitConfig, setGithubConfig, isEmptyCommit, checkCiEnv} = require('./util')
const {TRAVIS_REPO_SLUG} = process.env

/** @lends pushOtherRepository */
function pushOtherRepository (options = {}) {
  let { taskName, repository } = defaults(options, {
    taskName: 'Push other repository on Travis CI',
    repository: null
  })
  if (!repository) {
    throw new Error('Repository name is required in the argument options')
  }

  return runTasks(taskName, [
    () => co(function * () {
      checkCiEnv()
    }),
    () => co(function * () {
      let shouldSkip = !hasLibraryDiff() && !isEmptyCommit()
      if (shouldSkip) {
        return
      }
      setGitConfig()
      setGithubConfig()
      clone(repository)
      setGitConfig({ cwd: `/tmp/${repository}` })
      push(repository)
    })
  ], false)
}

function clone (repository) {
  // とりあえず realglobe-Inc のみ
  exec(`git clone https://github.com/realglobe-Inc/${repository}.git`, {cwd: '/tmp'})
}

function push (repository) {
  let commands = [
    `git commit --allow-empty -m "Kick from ${TRAVIS_REPO_SLUG}"`,
    'git push origin master'
  ]
  for (let command of commands) {
    exec(command, {cwd: `/tmp/${repository}`})
  }
}

module.exports = pushOtherRepository
