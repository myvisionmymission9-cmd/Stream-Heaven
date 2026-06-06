#!/usr/bin/env node
/** Remove duplicate boilerplate agents outside apps app agents folders */
import { readFileSync, unlinkSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BOILERPLATE = /Design and implement .+ capabilities for Stream Heaven/i;

function findInAgents(agentsDir, name) {
  function search(dir) {
    if (!statSync(dir, { throwIfFalse: false })?.isDirectory()) return null;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, e.name);
      if (e.isDirectory()) {
        const hit = search(full);
        if (hit) return hit;
      } else if (e.isFile() && e.name === name) return full;
    }
    return null;
  }
  return search(agentsDir);
}

const removed = [];
for (const app of ['social-app', 'livestream-app', 'astro-app', 'media-app']) {
  const appDir = join(ROOT, 'apps', app);
  const agentsDir = join(appDir, 'agents');
  if (!existsSync(agentsDir)) continue;

  function walkOutsideAgents(dir) {
    if (!statSync(dir, { throwIfFalse: false })?.isDirectory()) return;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name === 'agents') continue;
        walkOutsideAgents(full);
      } else if (e.isFile() && e.name.endsWith('.md') && e.name.includes('agent')) {
        const inner = findInAgents(agentsDir, e.name);
        if (!inner) return;
        try {
          if (BOILERPLATE.test(readFileSync(full, 'utf8'))) {
            unlinkSync(full);
            removed.push(relative(ROOT, full).replace(/\\/g, '/'));
          }
        } catch (_) {}
      }
    }
  }
  walkOutsideAgents(appDir);
}

console.log(JSON.stringify({ removed: removed.length, files: removed }, null, 2));
