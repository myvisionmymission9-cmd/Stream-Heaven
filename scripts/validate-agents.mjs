#!/usr/bin/env node
/**
 * Stream Heaven Agent Skill Validator
 * Scans agent .md files for required sections and quality signals.
 *
 * Usage:
 *   node scripts/validate-agents.mjs
 *   node scripts/validate-agents.mjs --json
 *   node scripts/validate-agents.mjs --verbose
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const JSON_OUT = process.argv.includes('--json');
const VERBOSE = process.argv.includes('--verbose');

const AGENT_GLOB_DIRS = [
  'ai-agents',
  'apps',
  'analytics-platform/agents',
  'api-platform/agents',
];

const REQUIRED_SECTIONS = [
  '## Role',
  '## Responsibilities',
  '## Prompt Template',
  '## Dependencies',
  '## Governance References',
];

const STACK_KEYWORDS = ['Flutter', 'NestJS', 'PostgreSQL', 'Redis', 'Socket.IO', 'AWS'];
const BOILERPLATE_RESP =
  /Design and implement .+ capabilities for Stream Heaven/i;
const ESCALATION_PATTERN =
  /(escalat|handoff|coordinate with|depends on|ai-agents\/)/i;

function walkMdFiles(dir, acc = []) {
  if (!statSync(dir, { throwIfFalse: false })?.isDirectory()) return acc;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      walkMdFiles(full, acc);
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.md') &&
      (entry.name.includes('agent') ||
        entry.name.endsWith('-designer.md') ||
        entry.name.endsWith('-architect.md') ||
        entry.name.endsWith('-specialist.md') ||
        entry.name.endsWith('-coordinator.md') ||
        entry.name.endsWith('-manager.md') ||
        entry.name.endsWith('-engine.md') ||
        entry.name.endsWith('-reviewer.md') ||
        entry.name.endsWith('-guardian.md') ||
        entry.name.endsWith('-curator.md') ||
        entry.name.endsWith('-lead.md') ||
        entry.name.endsWith('-engineer.md') ||
        entry.name.endsWith('-orchestrator.md') ||
        entry.name.endsWith('-router.md') ||
        entry.name.endsWith('-planner.md') ||
        entry.name.endsWith('-tracker.md') ||
        entry.name.endsWith('-keeper.md') ||
        entry.name.endsWith('-advisor.md') ||
        entry.name.endsWith('-moderator.md') ||
        entry.name.endsWith('-enhancer.md') ||
        entry.name.endsWith('-pipeline.md') ||
        entry.name.endsWith('-integration.md') ||
        entry.name.endsWith('-flow.md'))
    ) {
      acc.push(full);
    }
  }
  return acc;
}

function collectAgentFiles() {
  const files = [];
  for (const rel of AGENT_GLOB_DIRS) {
    walkMdFiles(join(ROOT, rel), files);
  }
  return [...new Set(files)].sort();
}

function validateAgent(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const rel = relative(ROOT, filePath).replace(/\\/g, '/');
  const issues = [];
  const warnings = [];

  for (const section of REQUIRED_SECTIONS) {
    if (!content.includes(section)) issues.push(`Missing section: ${section}`);
  }

  if (!content.includes('## Prompt Template')) {
    issues.push('Missing executable Prompt Template block');
  } else if (!content.match(/```[\s\S]+?```/)) {
    issues.push('Prompt Template section has no fenced code block');
  }

  const stackHits = STACK_KEYWORDS.filter((k) => content.includes(k));
  if (stackHits.length < 3) {
    warnings.push(
      `Weak stack coverage (${stackHits.length}/6): ${stackHits.join(', ') || 'none'}`
    );
  }

  const respMatch = content.match(/## Responsibilities\n([\s\S]*?)(?=\n## )/);
  const respText = respMatch?.[1] ?? '';
  const respLines = respText
    .split('\n')
    .filter((l) => l.trim().startsWith('-'));
  const isBoilerplate =
    BOILERPLATE_RESP.test(respText) &&
    respLines.length <= 6 &&
    respLines.every((l) =>
      /Follow platform-governance|Coordinate with dependent|Optimize for Indian|Document decisions|Design and implement/.test(
        l
      )
    );

  if (isBoilerplate) {
    warnings.push('Boilerplate responsibilities (not domain-specific)');
  } else if (respLines.length < 3) {
    warnings.push('Few actionable responsibility bullets');
  }

  const hasEscalation =
    ESCALATION_PATTERN.test(content) ||
    /## Dependencies[\s\S]*ai-agents\//.test(content);
  if (!hasEscalation) {
    warnings.push('No clear dependencies/escalation paths');
  }

  const hasExecutionContext = content.includes('## Execution Context');
  if (!hasExecutionContext) warnings.push('Missing Execution Context section');

  let grade = 'PASS';
  if (issues.length > 0) grade = 'FAIL';
  else if (isBoilerplate || warnings.length >= 2) grade = 'PARTIAL';
  else if (warnings.length === 1) grade = 'PARTIAL';

  return { rel, grade, issues, warnings, stackHits: stackHits.length, isBoilerplate };
}

function main() {
  const files = collectAgentFiles();
  const results = files.map(validateAgent);

  const stats = {
    total: results.length,
    pass: results.filter((r) => r.grade === 'PASS').length,
    partial: results.filter((r) => r.grade === 'PARTIAL').length,
    fail: results.filter((r) => r.grade === 'FAIL').length,
    boilerplate: results.filter((r) => r.isBoilerplate).length,
  };

  if (JSON_OUT) {
    console.log(JSON.stringify({ stats, results }, null, 2));
    process.exit(stats.fail > 0 ? 1 : 0);
  }

  console.log('Stream Heaven Agent Skill Validation');
  console.log('====================================');
  console.log(`Agents scanned: ${stats.total}`);
  console.log(`PASS:    ${stats.pass} (${pct(stats.pass, stats.total)})`);
  console.log(`PARTIAL: ${stats.partial} (${pct(stats.partial, stats.total)})`);
  console.log(`FAIL:    ${stats.fail} (${pct(stats.fail, stats.total)})`);
  console.log(`Boilerplate responsibilities: ${stats.boilerplate}`);
  console.log('');

  if (stats.fail > 0) {
    console.log('FAILURES:');
    for (const r of results.filter((x) => x.grade === 'FAIL')) {
      console.log(`  ${r.rel}`);
      r.issues.forEach((i) => console.log(`    - ${i}`));
    }
    console.log('');
  }

  if (VERBOSE) {
    console.log('PARTIAL (sample):');
    for (const r of results.filter((x) => x.grade === 'PARTIAL').slice(0, 20)) {
      console.log(`  ${r.rel}`);
      r.warnings.forEach((w) => console.log(`    ~ ${w}`));
    }
  }

  process.exit(stats.fail > 0 ? 1 : 0);
}

function pct(n, total) {
  return total ? `${((n / total) * 100).toFixed(1)}%` : '0%';
}

main();
