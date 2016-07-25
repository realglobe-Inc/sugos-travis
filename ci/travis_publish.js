#!/usr/bin/env node

/**
 * Npm publish on Travis CI.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const {publish} = require('../lib')

publish({})
