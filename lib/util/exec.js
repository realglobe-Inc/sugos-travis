const {execSync} = require('child_process')

function exec (command, options = {}) {
  console.log(`\n> ${command}`)
  return execSync(command, Object.assign({stdio: 'inherit'}, options))
}

module.exports = exec
