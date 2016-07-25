const {execSync} = require('child_process')

function exec (command) {
  console.log(`\n> ${command}`)
  execSync(command, {stdio: 'inherit'})
}

module.exports = exec
