/**
 * Test case for pushOtherRepository.
 * Runs with mocha.
 */
'use strict'

const pushOtherRepository = require('../lib/push_other_repository.js')
const {execSync} = require('child_process')
const assert = require('assert')
const request = require('request-promise')
const co = require('co')
const {GIT_USER, GIT_PASSWORD} = process.env

describe('push-other-repository', function () {
  this.timeout(60000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {
    execSync('rm -rf /tmp/sg-travis-mock-project-01')
  }))

  it('Push other repository', () => co(function * () {
    let commitsBefore = yield countCommits()
    yield pushOtherRepository({
      repository: 'sg-travis-mock-project-01'
    })
    let commitsAfter = yield countCommits()
    assert.equal(commitsAfter, commitsBefore + 1)
  }))
})

/**
 * Count commits on Github
 */
function countCommits () {
  let commitsUrl = 'https://api.github.com/repos/realglobe-Inc/sg-travis-mock-project-01/commits'
  let auth = (new Buffer(`${GIT_USER}:${GIT_PASSWORD}`)).toString('base64')
  return co(function * () {
    const commitsJson = yield request({
      uri: commitsUrl,
      headers: {
        'User-Agent': 'Request-Promise',
        Authorization: `Basic ${auth}`,
        json: true
      }
    })
    let commits = JSON.parse(commitsJson)
    return commits.length
  })
}

/* global describe, before, after, it */
