/**
 * Travis で HOME に .npmrc を作る。
 * このスクリプトは npm install しなくても走るようにしてある。
 * @function createNpmrc
 * @param {Object} options - Optional settings
 * @returns {Promise}
 */
'use strict'

const exec = require('./util/exec')

/** @lends createNpmrc */
function createNpmrc (options = {}) {
  let commands = [
    'test ! -e $HOME/.npmrc',
    'echo "registry = https://realglobe.artifactoryonline.com/realglobe/api/npm/npm-virtual" > $HOME/.npmrc',
    'curl -u${NPM_USER}:${NPM_PASSWORD} "https://realglobe.artifactoryonline.com/realglobe/api/npm/auth" >> $HOME/.npmrc',
    'cat $HOME/.npmrc'
  ]
  for (let command of commands) {
    exec(command)
  }
}

module.exports = createNpmrc
