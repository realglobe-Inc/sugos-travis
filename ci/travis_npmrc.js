#!/usr/bin/env node

/**
 * Create .npmrc on Travis CI.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const {createNpmrc} = require('../lib')

createNpmrc({})
