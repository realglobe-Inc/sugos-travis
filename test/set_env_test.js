/**
 * Test case for setEnv.
 * Runs with mocha.
 */
'use strict'

const setEnv = require('../lib/set_env.js')
const assert = require('assert')
const path = require('path')
const mkdirp = require('mkdirp')
const co = require('co')

describe('set-env', function () {
  this.timeout(83000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Set env', () => co(function * () {
    let filename = `${__dirname}/../tmp/testing-travis.yml`
    mkdirp.sync(path.dirname(filename))
    yield setEnv({
      values: {
        foo: 'bar'
      },
      target: filename
    })
  }))
})

/* global describe, before, after, it */
