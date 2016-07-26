/**
 * Test case for setGithubConfig.
 * Runs with mocha.
 */
'use strict'

const setGithubConfig = require('../lib/util/set_github_config.js')
const assert = require('assert')
const co = require('co')
const {execSync} = require('child_process')
const {GIT_USER, GIT_PASSWORD, HOME} = process.env

describe('set-github-config', function () {
  this.timeout(3000)

  it('Set github config', () => co(function * () {
    assert.ok(GIT_USER)
    assert.ok(GIT_PASSWORD)
    setGithubConfig()
    execSync(`cat ${HOME}/.netrc`)
    assert.ok(true)
  }))
})

/* global describe, before, after, it */
