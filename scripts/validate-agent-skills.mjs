#!/usr/bin/env node
/**
 * Validates basic + advanced Cursor skills exist for manifest agents.
 *
 * Usage:
 *   node scripts/validate-agent-skills.mjs
 *   node scripts/validate-agent-skills.mjs --json
 */
import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { AGENT_SKILL_MANIFEST } from './agent-skill-manifest.mjs';
import { skillPath, SKILL_ROOT_REL } from './agent-skill-utils.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const JSON_OUT = process.argv.includes('--json');

const REQUIRED_FRONTMATTER = ['name:', 'description:'];

function validateSkillFile(rel) {
  const issues = [];
  if (!existsSync(join(ROOT, rel))) {
    return { ok: false, issues: ['Missing file'] };
  }
  const content = readFileSync(join(ROOT, rel), 'utf8');
  if (!content.startsWith('---')) issues.push('Missing YAML frontmatter');
  for (const key of REQUIRED_FRONTMATTER) {
    if (!content.includes(key)) issues.push(`Missing frontmatter: ${key}`);
  }
  if (!content.includes('## When to use')) issues.push('Missing ## When to use');
  if (!content.includes('## Agent')) issues.push('Missing ## Agent');
  if (!content.includes('## Validation')) issues.push('Missing ## Validation');
  return { ok: issues.length === 0, issues };
}

function main() {
  const results = [];
  let pass = 0;
  let fail = 0;

  for (const entry of AGENT_SKILL_MANIFEST) {
    const agentExists = existsSync(join(ROOT, entry.agent));
    const row = {
      slug: entry.slug,
      domain: entry.domain,
      phase: entry.phase,
      agent: entry.agent,
      agentExists,
      basic: null,
      advanced: null,
    };

    for (const tier of ['basic', 'advanced']) {
      const rel = skillPath(entry, tier);
      const v = validateSkillFile(rel);
      row[tier] = { path: rel, ...v };
      if (!agentExists || !v.ok) fail++;
      else pass++;
    }

    results.push(row);
  }

  const summary = {
    manifestAgents: AGENT_SKILL_MANIFEST.length,
    skillPairsExpected: AGENT_SKILL_MANIFEST.length * 2,
    checks: AGENT_SKILL_MANIFEST.length * 2,
    pass,
    fail,
    skillRoot: SKILL_ROOT_REL,
    results,
  };

  if (JSON_OUT) {
    console.log(JSON.stringify(summary, null, 2));
    process.exit(fail > 0 ? 1 : 0);
  }

  console.log('Stream Heaven Agent Skills Validation');
  console.log('=====================================');
  console.log(`Manifest agents: ${summary.manifestAgents}`);
  console.log(`Skill files expected: ${summary.skillPairsExpected} (basic + advanced each)`);
  console.log(`PASS: ${pass} | FAIL: ${fail}\n`);

  for (const r of results) {
    const icon = (t) => (r[t]?.ok ? 'OK' : 'XX');
    console.log(`  [${icon('basic')}/${icon('advanced')}] ${r.domain}/${r.slug} (phase ${r.phase})`);
    if (!r.agentExists) console.log(`         ! Agent missing: ${r.agent}`);
    for (const tier of ['basic', 'advanced']) {
      if (!r[tier].ok) {
        r[tier].issues.forEach((i) => console.log(`         ! ${tier}: ${i} (${r[tier].path})`));
      }
    }
  }

  const exitCode = fail > 0 ? 1 : 0;
  console.log(exitCode === 0 ? '\nSkill validation: PASS' : '\nSkill validation: FAIL');
  process.exit(exitCode);
}

main();
