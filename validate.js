const request = require('request-promise')
const {execSync} = require('child_process')

const co = require('co')
const assert = require('assert')
const {GIT_USER, GIT_PASSWORD} = process.env

co(function * () {
  yield validateCommit()
})

function validateCommit () {
  return co(function * () {
    let sha = execSync('git rev-parse HEAD', {cwd: '/tmp/sg-travis-mock-project-01'}).toString().trim()
    console.log('sha')
    console.log(sha)
//    let sha = execSync('GIT_DIR=/tmp/sg-travis-mock-project-01/.git git rev-parse HEAD',{}).toString().trim()
    let apiUrl = `https://api.github.com/repos/realglobe-Inc/sg-travis-mock-project-01/commits/${sha}`
    let auth = (new Buffer(`${GIT_USER}:${GIT_PASSWORD}`)).toString('base64')
    const res = yield request({
      uri: apiUrl,
      headers: {
        'User-Agent': 'Request-Promise',
        Authorization: `Basic ${auth}`,
        json: true
      }
    })
    assert.equal(sha, JSON.parse(res).sha)
  })
}
