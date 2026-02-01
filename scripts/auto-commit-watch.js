#!/usr/bin/env node
const chokidar = require('chokidar');
const { execSync } = require('child_process');

const run = (cmd) => execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
const debounce = (fn, wait = 2000) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
};

const commit = () => {
  try {
    const dry = run('node ./scripts/auto-commit.js --dry-run');
    console.log(dry);
    run('node ./scripts/auto-commit.js');
  } catch (e) {
    console.error('Auto-commit watch error:', e.message);
  }
};

console.log('Starting auto-commit watcher (ignores node_modules and .git)...');
const watcher = chokidar.watch('.', {
  ignored: /(^|[\\\/])(\.git|node_modules)/,
  ignoreInitial: true,
  cwd: process.cwd(),
});

watcher.on('all', debounce((event, path) => {
  console.log(`Detected change: ${event} ${path}`);
  commit();
}));
