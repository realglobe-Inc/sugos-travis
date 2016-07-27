/**
 * Travis で HOME に .npmrc を作る。このスクリプトは before_install で使うので npm install しなくても走るようにしてある。
 * @function createNpmrc
 * @param {Object} options - Optional settings
 * @returns {Promise}
 */
'use strict'

const {execFileSync} = require('child_process')
const {join} = require('path')
const {checkCiEnv} = require('./util')

/** @lends createNpmrc */
function createNpmrc (options = {}) {
  checkCiEnv()
  let bin = join(__dirname, '..', 'bin/create_npmrc.sh')
  execFileSync(bin, {stdio: 'inherit'})
}

module.exports = createNpmrc
