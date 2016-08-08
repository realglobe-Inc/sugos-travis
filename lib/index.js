/**
 * Scripts for Travis CI
 * @module sg-travis
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get commitPush () { return d(require('./commit_push')) },
  get publishNpm () { return d(require('./publish_npm')) },
  get pushOtherRepository () { return d(require('./push_other_repository')) },
  get setEnv () { return d(require('./set_env')) },
  get util () { return d(require('./util')) }
}
