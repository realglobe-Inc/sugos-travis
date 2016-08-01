#!/usr/bin/env node

/**
 * Commit empty and push to sugos
 */

process.chdir(`${__dirname}/../..`)

const { pushOtherRepository } = require('sg-travis')

pushOtherRepository({
  repository: 'sugos'
})
