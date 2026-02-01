# Auto-commit scripts

This folder contains simple automation to create automatic commit messages and push to Git.

Usage:

- Dry run (see what it would do):

  node ./auto-commit.js --dry-run

- Commit and push immediately:

  node ./auto-commit.js

- Run a watcher that auto-commits on file changes (ignores `.git` and `node_modules`):

  node ./auto-commit-watch.js

Notes:

- The watcher calls `auto-commit.js` when changes are detected.
- To run from the `simplicreate-angular` package you can use the npm scripts:

  npm run auto-commit
  npm run auto-commit:watch

Make sure you have appropriate push permissions and that `git` is available in your PATH.