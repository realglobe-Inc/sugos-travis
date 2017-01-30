#!/usr/bin/env node

/**
 * Commit empty and push to sugos-index
 */

process.chdir(`${__dirname}/../..`)

const { pushOtherRepository } = require('sugos-travis')

pushOtherRepository({
  repository: 'sugos-index'
})
