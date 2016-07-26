/**
 * Test case for setGitConfig.
 * Runs with mocha.
 */
'use strict'

const setGitConfig = require('../lib/util/set_git_config.js')
const assert = require('assert')
const co = require('co')
const {execSync} = require('child_process')
const {GIT_USER, GIT_EMAIL} = process.env

describe('set-git-config', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Set git config', () => co(function * () {
    assert.ok(GIT_USER)
    assert.ok(GIT_EMAIL)
    setGitConfig()
    let user = execSync('git config user.name').toString().trim()
    let email = execSync('git config user.email').toString().trim()
    assert.equal(user, GIT_USER)
    assert.equal(email, GIT_EMAIL)
  }))
})

/* global describe, before, after, it */
