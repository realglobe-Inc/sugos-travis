#!/usr/bin/env node

/**
 * Commit empty and push to sugos-index
 */

process.chdir(`${__dirname}/../..`)

const { pushOtherRepository } = require('sg-travis')

pushOtherRepository({
  repository: 'sugos-index'
})
