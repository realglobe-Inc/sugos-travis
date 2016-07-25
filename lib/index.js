/**
 * Scripts for Travis CI
 * @module sg-travis
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get publishNpm () { return d(require('./publish_npm')) },
  get pushOtherRepository () { return d(require('./push_other_repository')) }
}
