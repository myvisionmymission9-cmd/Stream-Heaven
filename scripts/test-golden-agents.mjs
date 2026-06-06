#!/usr/bin/env node
/**
 * Golden agent test — validates critical Phase 1–2a agents must PASS.
 *
 * Usage:
 *   node scripts/test-golden-agents.mjs
 *   node scripts/test-golden-agents.mjs --verbose
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const VERBOSE = process.argv.includes('--verbose');

const GOLDEN_AGENTS = [
  'ai-agents/meta/local-dev-bootstrap-agent.md',
  'ai-agents/phase-2a/flutter-mobile-shell-agent.md',
  'ai-agents/phase-1/auth-service-agent.md',
  'ai-agents/phase-1/profile-service-agent.md',
  'ai-agents/phase-1/api-gateway-bootstrap-agent.md',
  'ai-agents/testing/integration-smoke-test-agent.md',
  'ai-agents/meta/agent-prompt-tester-agent.md',
  'ai-agents/meta/agent-skill-validator-agent.md',
];

const REQUIRED_SECTIONS = [
  '## Role',
  '## Responsibilities',
  '## Prompt Template',
  '## Dependencies',
  '## Governance References',
];

const BOILERPLATE_RESP =
  /Design and implement .+ capabilities for Stream Heaven/i;

function validateGolden(relPath) {
  const full = join(ROOT, relPath);
  const result = { rel: relPath, exists: existsSync(full), grade: 'FAIL', issues: [], warnings: [] };

  if (!result.exists) {
    result.issues.push('File not found');
    return result;
  }

  const content = readFileSync(full, 'utf8');

  for (const section of REQUIRED_SECTIONS) {
    if (!content.includes(section)) result.issues.push(`Missing: ${section}`);
  }

  if (!content.match(/```[\s\S]+?```/)) {
    result.issues.push('Prompt Template has no fenced code block');
  }

  const stackHits = ['Flutter', 'NestJS', 'PostgreSQL', 'Redis', 'Socket.IO', 'AWS'].filter((k) =>
    content.includes(k)
  );
  if (stackHits.length < 3) {
    result.warnings.push(`Stack coverage ${stackHits.length}/6`);
  }

  const respMatch = content.match(/## Responsibilities\n([\s\S]*?)(?=\n## )/);
  const respText = respMatch?.[1] ?? '';
  if (BOILERPLATE_RESP.test(respText)) {
    result.warnings.push('Boilerplate responsibilities');
  }

  if (result.issues.length === 0) {
    result.grade = result.warnings.length >= 2 || BOILERPLATE_RESP.test(respText) ? 'PARTIAL' : 'PASS';
    if (result.warnings.length === 1 && !BOILERPLATE_RESP.test(respText)) {
      result.grade = 'PARTIAL';
    }
  }

  return result;
}

function main() {
  console.log('Stream Heaven Golden Agent Test');
  console.log('================================');

  const missing = GOLDEN_AGENTS.filter((p) => !existsSync(join(ROOT, p)));
  if (missing.length) {
    console.log('\nMISSING FILES:');
    missing.forEach((p) => console.log(`  - ${p}`));
  }

  const results = GOLDEN_AGENTS.map(validateGolden);
  const pass = results.filter((r) => r.grade === 'PASS').length;
  const partial = results.filter((r) => r.grade === 'PARTIAL').length;
  const fail = results.filter((r) => r.grade === 'FAIL').length;

  console.log(`\nGolden agents: ${GOLDEN_AGENTS.length}`);
  console.log(`PASS: ${pass} | PARTIAL: ${partial} | FAIL: ${fail}\n`);

  for (const r of results) {
    const icon = r.grade === 'PASS' ? 'OK' : r.grade === 'PARTIAL' ? '~~' : 'XX';
    console.log(`  [${icon}] ${r.grade.padEnd(7)} ${r.rel}`);
    if (VERBOSE || r.grade !== 'PASS') {
      r.issues.forEach((i) => console.log(`         ! ${i}`));
      r.warnings.forEach((w) => console.log(`         ~ ${w}`));
    }
  }

  console.log('\nFull registry scan...');
  const full = spawnSync(process.execPath, ['scripts/validate-agents.mjs'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  if (full.stdout) console.log(full.stdout.trim());
  if (full.stderr) console.error(full.stderr.trim());

  const exitCode = fail > 0 || full.status !== 0 ? 1 : 0;
  console.log(exitCode === 0 ? '\nGolden test: PASS' : '\nGolden test: FAIL');
  process.exit(exitCode);
}

main();
