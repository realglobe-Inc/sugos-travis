const exec = require('./exec')
const {GIT_USER, GIT_EMAIL} = process.env

/**
 * gitconfig を設定する
 */
function setGitConfig (options = {}) {
  if (!process.env.CI) {
    return
  }
  exec(`git config --local user.name ${GIT_USER}`, options)
  exec(`git config --local user.email ${GIT_EMAIL}`, options)
  exec('git config -l', options)
}

module.exports = setGitConfig
