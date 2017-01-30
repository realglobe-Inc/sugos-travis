#!/usr/bin/env node

const commander = require('commander')
const { join } = require('path')
const { execSync } = require('child_process')
const { setEnv } = require('../lib')

commander
  .command('init')
  .description('ci/travis 下に sugos-travis 関係のCIコマンドファイルを置く')
  .action(init)

commander
  .command('env')
  .description('.travis.yml に Travis CI 用の暗号化された環境変数を書く')
  .action(setEnv)

commander
  .command('npmignore')
  .description('.npmignore に SUGOS 用の設定を書く')
  .action(npmignore)

commander.parse(process.argv)

/**
 * ci/travis 下に sugos-travis 関係のコマンドファイルを置く
 */
function init () {
  let travisPath = join(__dirname, '../src/travis')
  let copy = `cp -r ${travisPath} ./ci/travis`
  execSync(copy)
}

/**
 * .npmignore に SUGOS 用の設定を追加する
 */
function npmignore () {
  let npmignorePath = join(__dirname, '../src/.npmignore')
  let write = `cat ${npmignorePath} >> .npmignore`
  execSync(write)
}
