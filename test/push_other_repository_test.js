/**
 * Test case for pushOtherRepository.
 * Runs with mocha.
 */
'use strict'

const pushOtherRepository = require('../lib/push_other_repository.js')
const {execSync} = require('child_process')
const assert = require('assert')
const asleep = require('asleep')
const request = require('request-promise')
const co = require('co')
const {GIT_USER, GIT_PASSWORD} = process.env

describe('push-other-repository', function () {
  this.timeout(60000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {
    execSync('rm -rf /tmp/sugos-travis-mock-project-01', {stdio: 'inherit'})
  }))

  it('Push other repository', () => co(function * () {
    yield pushOtherRepository({
      repository: 'sugos-travis-mock-project-01',
      force: true
    })
    yield asleep(3000)
    yield validateCommit()
  }))
})

/**
 * Github にプッシュされたかどうか確認する
 */
function validateCommit () {
  return co(function * () {
    let sha = execSync('git rev-parse HEAD', {cwd: '/tmp/sugos-travis-mock-project-01'}).toString().trim()
    let apiUrl = `https://api.github.com/repos/realglobe-Inc/sugos-travis-mock-project-01/commits/${sha}`
    let auth = (new Buffer(`${GIT_USER}:${GIT_PASSWORD}`)).toString('base64')
    const res = yield request({
      uri: apiUrl,
      headers: {
        'User-Agent': 'Request-Promise',
        Authorization: `Basic ${auth}`,
        json: true
      }
    })
    assert.equal(sha, JSON.parse(res).sha)
  })
}

/* global describe, before, after, it */
