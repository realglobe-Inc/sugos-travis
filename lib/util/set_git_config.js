const exec = require('./exec')
const {GIT_USER, GIT_EMAIL} = process.env

/**
 * gitconfig を設定する
 */
function setGitConfig () {
  exec(`git config --global user.name ${GIT_USER}`)
  exec(`git config --global user.email ${GIT_EMAIL}`)
  exec('git config -l')
}

module.exports = setGitConfig
