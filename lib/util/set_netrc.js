const exec = require('./exec')
const fileExists = require('file-exists')
const {HOME, GIT_USER, GIT_PASSWORD} = process.env

/**
 * Github の認証情報を設定する
 */
function setGithubConfig () {
  let netrcPath = `${HOME}/.netrc`
  let shouldSkip = fileExists(netrcPath)
  if (shouldSkip) {
    return
  }
  exec(`echo "machine github.com" > ${netrcPath}`)
  exec(`echo "login ${GIT_USER}" >> ${netrcPath}`)
  exec(`echo "password ${GIT_PASSWORD}" >> ${netrcPath}`)
  exec(`cat ${netrcPath}`)
}

module.exports = setGithubConfig
