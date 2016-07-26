const {execSync} = require('child_process')
const {readFileSync} = require('fs')
const fileExists = require('file-exists')
const Ignore = require('ignore')

/**
 * Git のコミットの差分を見て、 .npmignore 以外の変更があれば true を返す。
 * @returns {Boolean}
 */
function hasLibraryDiff () {
  let shouldSkip = !fileExists('.npmignore')
  if (shouldSkip) {
    return true
  }
  let ignore = Ignore()
  let npmignore = readFileSync('.npmignore').toString()
  let diff = diffFiles()
  let filtered = ignore.add(npmignore).filter(diff)
  let changed = filtered.length > 0
  return changed
}

/**
 * 直前コミットと比較して変更のあったファイル名を配列で返す。
 */
function diffFiles () {
  let command = 'git diff HEAD^ HEAD --name-only'
  let files = execSync(command).toString().trim().split('\n')
  return files
}

module.exports = hasLibraryDiff
