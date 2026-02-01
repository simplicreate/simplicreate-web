#!/usr/bin/env node
const { execSync } = require('child_process');

// Lightweight arg parsing to avoid extra deps
const args = process.argv.slice(2);
const run = (cmd) => execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();

const dry = args.includes('--dry-run') || args.includes('--dry') || args.includes('-n');
const noPush = args.includes('--no-push') || args.includes('--nopush');

function safeRun(cmd) {
  try {
    return run(cmd);
  } catch (e) {
    throw new Error(e.message || String(e));
  }
}

function summarizeStatus(status) {
  const lines = status.split('\n').filter(Boolean);
  const counts = { M: 0, A: 0, D: 0, R: 0, U: 0, '?': 0 };
  const files = [];

  lines.forEach((ln) => {
    // porcelain format: XY <file>
    const code = ln.slice(0, 2).trim();
    const file = ln.slice(3).trim();
    if (!file) return;
    files.push(file);
    if (code.startsWith('A') || code === '??') counts.A += 1;
    if (code.includes('M')) counts.M += 1;
    if (code.includes('D')) counts.D += 1;
    if (code.includes('R')) counts.R += 1;
    if (code.includes('U')) counts.U += 1;
    if (code === '??') counts['?'] += 1;
  });

  return { counts, files };
}

function buildMessage(summary) {
  const total = summary.files.length;
  const parts = [];
  if (summary.counts.M) parts.push(`${summary.counts.M} modified`);
  if (summary.counts.A) parts.push(`${summary.counts.A} added`);
  if (summary.counts.D) parts.push(`${summary.counts.D} deleted`);
  if (summary.counts.R) parts.push(`${summary.counts.R} renamed`);
  if (summary.counts.U) parts.push(`${summary.counts.U} updated (unmerged)`);

  const fileList = summary.files.slice(0, 8).join(', ');
  const more = summary.files.length > 8 ? ` +${summary.files.length - 8} more` : '';
  const short = fileList ? `: ${fileList}${more}` : '';

  const ts = new Date().toISOString();
  return `auto: ${total} file${total === 1 ? '' : 's'} changed (${parts.join(', ')})${short}\n\nAuto-commit by scripts/auto-commit.js at ${ts}`;
}

(function main() {
  try {
    // Ensure we're in a git repo
    safeRun('git rev-parse --is-inside-work-tree');
  } catch (e) {
    console.error('Not a git repository. Aborting.');
    process.exit(1);
  }

  const status = safeRun('git status --porcelain');
  if (!status) {
    console.log('No changes to commit.');
    return;
  }

  const summary = summarizeStatus(status);
  const message = buildMessage(summary);

  if (dry) {
    console.log('--- dry-run: would run the following commands ---');
    console.log('git add -A');
    console.log(`git commit -m "${message.replace(/"/g, '\\"')}"`);
    console.log('git push <current-branch> (unless --no-push was specified)');
    return;
  }

  console.log('Staging changes...');
  safeRun('git add -A');

  try {
    console.log('Committing...');
    safeRun(`git commit -m "${message.replace(/"/g, '\\"')}"`);
  } catch (e) {
    console.error('Commit failed:', e.message);
    process.exit(1);
  }

  if (!noPush) {
    try {
      const branch = safeRun('git rev-parse --abbrev-ref HEAD');
      console.log(`Pushing to ${branch}...`);
      safeRun(`git push origin ${branch}`);
      console.log('Push complete ✅');
    } catch (e) {
      console.error('Push failed:', e.message);
      process.exit(1);
    }
  } else {
    console.log('--no-push specified: skipping push.');
  }
})();
