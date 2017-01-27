#!/usr/bin/env node

/**
 * Set environment variables in Travis CI
 */

process.chdir(`${__dirname}/../..`)

const { setEnv } = require('../../lib')
const { PublicRepo } = setEnv.presets

setEnv({
  values: PublicRepo
})
