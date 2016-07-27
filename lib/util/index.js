/**
 * Util functions
 * @module util
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get checkCiEnv () { return d(require('./check_ci_env')) },
  get exec () { return d(require('./exec')) },
  get hasLibraryDiff () { return d(require('./has_library_diff')) },
  get isEmptyCommit () { return d(require('./is_empty_commit')) },
  get setGitConfig () { return d(require('./set_git_config')) },
  get setGithubConfig () { return d(require('./set_github_config')) }
}
