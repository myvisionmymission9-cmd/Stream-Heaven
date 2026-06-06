#!/usr/bin/env node
/**
 * Stream Heaven agent listing utility.
 *
 * Usage:
 *   node scripts/list-agents.mjs
 *   node scripts/list-agents.mjs --phase 1
 *   node scripts/list-agents.mjs --phase 2a
 *   node scripts/list-agents.mjs --domain games
 *   node scripts/list-agents.mjs --search auth
 *   node scripts/list-agents.mjs --phase 1 --search auth
 */

import { execFileSync } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function parseArgs(argv) {
  const args = {
    phase: null,
    domain: null,
    search: null,
    json: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--phase') {
      args.phase = (argv[i + 1] ?? '').trim();
      i += 1;
    } else if (token === '--domain') {
      args.domain = (argv[i + 1] ?? '').trim().toLowerCase();
      i += 1;
    } else if (token === '--search') {
      args.search = (argv[i + 1] ?? '').trim().toLowerCase();
      i += 1;
    } else if (token === '--json') {
      args.json = true;
    } else if (token === '--help' || token === '-h') {
      printHelp();
      process.exit(0);
    } else {
      console.error(`Unknown argument: ${token}`);
      printHelp();
      process.exit(1);
    }
  }

  return args;
}

function printHelp() {
  console.log('Stream Heaven list-agents');
  console.log('');
  console.log('Options:');
  console.log('  --phase <value>   Filter by phase (for example: 1, 2a, 10)');
  console.log('  --domain <value>  Filter by domain keyword in path (for example: games)');
  console.log('  --search <value>  Free-text path search (for example: auth)');
  console.log('  --json            Output machine-readable JSON');
  console.log('  --help, -h        Show this help');
}

function loadAgentsFromValidator() {
  const output = execFileSync(
    process.execPath,
    ['scripts/validate-agents.mjs', '--json'],
    { cwd: ROOT, encoding: 'utf8' }
  );
  const parsed = JSON.parse(output);
  return parsed.results.map((r) => r.rel);
}

function matchesPhase(relPath, phaseRaw) {
  if (!phaseRaw) return true;
  const rel = relPath.toLowerCase();
  const phase = phaseRaw.toLowerCase().replace(/\s+/g, '');

  // Primary match for explicit phase folders like phase-1 or phase-2a.
  if (rel.includes(`phase-${phase}`)) return true;

  // Support "phase1" style user input.
  if (phase.startsWith('phase') && rel.includes(phase.replace('phase', 'phase-'))) return true;

  return false;
}

function groupByTopLevel(paths) {
  const grouped = new Map();
  for (const rel of paths) {
    const top = rel.split('/')[0] || 'unknown';
    if (!grouped.has(top)) grouped.set(top, []);
    grouped.get(top).push(rel);
  }
  for (const list of grouped.values()) {
    list.sort((a, b) => a.localeCompare(b));
  }
  return new Map([...grouped.entries()].sort((a, b) => a[0].localeCompare(b[0])));
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const allAgents = loadAgentsFromValidator();

  const filtered = allAgents.filter((rel) => {
    const relLower = rel.toLowerCase();
    if (!matchesPhase(rel, args.phase)) return false;
    if (args.domain && !relLower.includes(args.domain)) return false;
    if (args.search && !relLower.includes(args.search)) return false;
    return true;
  });

  const grouped = groupByTopLevel(filtered);

  if (args.json) {
    const groups = {};
    for (const [name, entries] of grouped.entries()) {
      groups[name] = entries;
    }
    console.log(
      JSON.stringify(
        {
          total: filtered.length,
          filters: {
            phase: args.phase,
            domain: args.domain,
            search: args.search,
          },
          groups,
        },
        null,
        2
      )
    );
    return;
  }

  console.log('Stream Heaven Agent List');
  console.log('========================');
  console.log(`Total agents: ${filtered.length}`);
  console.log(
    `Filters: phase=${args.phase || 'any'}, domain=${args.domain || 'any'}, search=${args.search || 'any'}`
  );
  console.log('');

  for (const [groupName, entries] of grouped.entries()) {
    console.log(`[${groupName}] ${entries.length}`);
    for (const rel of entries) {
      console.log(`  @${rel}`);
    }
    console.log('');
  }

  if (filtered.length === 0) {
    console.log('No agent files matched your filters.');
    process.exit(1);
  }
}

main();
