#!/usr/bin/env node

/**
 * Publish npm package
 */

process.chdir(`${__dirname}/../..`)

const { publishNpm } = require('../../lib')

publishNpm({})
