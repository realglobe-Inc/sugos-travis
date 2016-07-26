/**
 * Travis で HOME に .npmrc を作る。
 * このスクリプトは npm install しなくても走るようにしてある。
 * @function createNpmrc
 * @param {Object} options - Optional settings
 * @returns {Promise}
 */
'use strict'

const {execFileSync} = require('child_process')
const {join} = require('path')

/** @lends createNpmrc */
function createNpmrc (options = {}) {
  let bin = join(__dirname, '..', 'bin/create_npmrc.sh')
  execFileSync(bin, {stdio: 'inherit'})
}

module.exports = createNpmrc
