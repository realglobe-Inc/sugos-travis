const exec = require('./exec')
const {GIT_USER, GIT_EMAIL} = process.env

/**
 * gitconfig を設定する
 */
function setGitConfig () {
  if (!process.env.CI) {
    return
  }
  exec(`git config --local user.name ${GIT_USER}`)
  exec(`git config --local user.email ${GIT_EMAIL}`)
  exec('git config -l')
}

module.exports = setGitConfig
