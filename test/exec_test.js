/**
 * Test case for exec.
 * Runs with mocha.
 */
'use strict'

const exec = require('../lib/util/exec.js')
const assert = require('assert')
const co = require('co')

describe('exec', function () {
  this.timeout(3000)

  it('Exec', () => co(function * () {
    let hoge = exec('echo hoge', {stdio: 'pipe'}).toString().trim()
    assert.equal(hoge, 'hoge')
  }))
})

/* global describe, it */
