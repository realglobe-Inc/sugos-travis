/**
 * Test case for publishNpm.
 * Runs with mocha.
 */
'use strict'

const publishNpm = require('../lib/publish_npm.js')
const setGithubConfig = require('../lib/util/set_github_config.js')
const assert = require('assert')
const asleep = require('asleep')
const { execSync } = require('child_process')
const co = require('co')
const { join } = require('path')
const { TRAVIS } = process.env

describe('publish-npm', function () {
  this.timeout(60000)

  let workingDir = join(__dirname, '..')

  /**
   * Clone sugos-travis-mock-project-01
   */
  before(() => co(function * () {
    if (TRAVIS) {
      return
    }
    process.chdir(workingDir)
    if (process.env.CI) {
      setGithubConfig()
    }
    execSilent('rm -rf test/tmp')
    execSilent('mkdir test/tmp')
    process.chdir('test/tmp')
    execSilent('git clone https://github.com/realglobe-Inc/sugos-travis-mock-project-01.git')
    process.chdir('sugos-travis-mock-project-01')
  }))

  /**
   *  Remove sugos-travis-mock-project-01
   */
  after(() => co(function * () {
    process.chdir(workingDir)
    execSilent('rm -rf test/tmp/sugos-travis-mock-project-01')
  }))

  it('Publish npm', () => co(function * () {
    if (TRAVIS) {
      return
    }
    let patchVersionBefore = patchVersion()
    yield publishNpm({ force: true })
    yield asleep(10000)
    let patchVersionAfter = patchVersion()
    assert.equal(patchVersionAfter, patchVersionBefore + 1)
  }))
})

function patchVersion () {
  let version = execSync('npm view sugos-travis-mock-project-01 version').toString().trim()
  let patch = Number(version.split('.')[ 2 ])
  return patch
}

function execSilent (command, options = {}) {
  return execSync(command, Object.assign({ stdio: 'ignore' }, options))
}

/* global describe, before, after, it */
