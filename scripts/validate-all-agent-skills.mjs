#!/usr/bin/env node
/**
 * Deep quality validation for agent Cursor skills (structure + competency depth).
 *
 * Usage:
 *   node scripts/validate-all-agent-skills.mjs
 *   node scripts/validate-all-agent-skills.mjs --json
 */
import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { AGENT_SKILL_MANIFEST } from './agent-skill-manifest.mjs';
import { skillPath } from './agent-skill-utils.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const JSON_OUT = process.argv.includes('--json');

const MIN_SECTIONS_BASIC = 4;
const MIN_SECTIONS_ADVANCED = 6;
const MIN_COMPETENCY_CHARS = 500;
const MIN_BULLETS_PER_SECTION = 3;

function analyzeSkill(rel) {
  const issues = [];
  if (!existsSync(join(ROOT, rel))) {
    return { ok: false, issues: ['Missing file'], sections: 0, competencyChars: 0 };
  }

  const content = readFileSync(join(ROOT, rel), 'utf8');

  if (!content.startsWith('---')) issues.push('Missing YAML frontmatter');
  if (!content.includes('name:')) issues.push('Missing frontmatter name');
  if (!content.includes('description:')) issues.push('Missing frontmatter description');
  if (!content.includes('## When to use')) issues.push('Missing ## When to use');
  if (!content.includes('## Agent')) issues.push('Missing ## Agent');
  if (!content.includes('## Validation')) issues.push('Missing ## Validation');
  if (!content.includes('## Key paths')) issues.push('Missing ## Key paths');
  if (!content.includes('## Related skills')) issues.push('Missing ## Related skills');

  const hasRoleSpecific = content.includes('## Role-specific skills');
  const sectionMatches = [...content.matchAll(/^### .+$/gm)];
  const sections = sectionMatches.length;

  const competencyMatch = content.match(
    /## Role-specific skills[\s\S]*?(?=\n## Key paths)/
  );
  let competencyChars = 0;
  if (competencyMatch) {
    competencyChars = competencyMatch[0].length;
  } else {
    const altMatch = content.match(
      /## (?:Scope|Role-specific)[\s\S]*?(?=\n## Key paths)/
    );
    const bodyStart = content.indexOf('## Scope');
    const keyPathsIdx = content.indexOf('## Key paths');
    if (bodyStart >= 0 && keyPathsIdx > bodyStart) {
      const between = content.slice(bodyStart, keyPathsIdx);
      const skillSections = [...between.matchAll(/^## .+ Skills$/gm)];
      if (skillSections.length >= MIN_SECTIONS_BASIC) {
        competencyChars = between.length;
      }
    }
    if (altMatch && competencyChars === 0) competencyChars = altMatch[0].length;
  }

  const tier = rel.includes('/advanced/') ? 'advanced' : 'basic';
  const minSections = tier === 'advanced' ? MIN_SECTIONS_ADVANCED : MIN_SECTIONS_BASIC;

  if (!hasRoleSpecific && sections < minSections) {
    issues.push(`Need ## Role-specific skills or ${minSections}+ ### sections (found ${sections})`);
  }

  if (competencyChars < MIN_COMPETENCY_CHARS) {
    issues.push(`Thin competency content (${competencyChars} chars, need ${MIN_COMPETENCY_CHARS}+)`);
  }

  for (const match of sectionMatches) {
    const idx = content.indexOf(match[0]);
    const nextH2 = content.indexOf('\n## ', idx + 1);
    const nextH3 = content.indexOf('\n### ', idx + 1);
    const end = [nextH2, nextH3, content.indexOf('\n## Key paths')]
      .filter((n) => n > idx)
      .sort((a, b) => a - b)[0] ?? content.length;
    const block = content.slice(idx, end);
    const bullets = (block.match(/^- /gm) || []).length;
    if (bullets < MIN_BULLETS_PER_SECTION) {
      issues.push(`Section "${match[0].slice(4)}" has only ${bullets} bullets`);
      break;
    }
  }

  return { ok: issues.length === 0, issues, sections, competencyChars, hasRoleSpecific };
}

function main() {
  const results = [];
  let pass = 0;
  let fail = 0;

  for (const entry of AGENT_SKILL_MANIFEST) {
    const row = { slug: entry.slug, domain: entry.domain, agent: entry.agent, basic: null, advanced: null };
    for (const tier of ['basic', 'advanced']) {
      const rel = skillPath(entry, tier);
      const analysis = analyzeSkill(rel);
      row[tier] = { path: rel, ...analysis };
      if (analysis.ok) pass++;
      else fail++;
    }
    results.push(row);
  }

  const summary = {
    manifestAgents: AGENT_SKILL_MANIFEST.length,
    checks: AGENT_SKILL_MANIFEST.length * 2,
    pass,
    fail,
    results,
  };

  if (JSON_OUT) {
    console.log(JSON.stringify(summary, null, 2));
    process.exit(fail > 0 ? 1 : 0);
  }

  console.log('Stream Heaven Agent Skills Deep Validation');
  console.log('==========================================');
  console.log(`Agents: ${summary.manifestAgents}`);
  console.log(`PASS: ${pass} | FAIL: ${fail}\n`);

  for (const r of results) {
    const bOk = r.basic?.ok;
    const aOk = r.advanced?.ok;
    if (bOk && aOk) continue;
    console.log(`  [${bOk ? 'OK' : 'XX'}/${aOk ? 'OK' : 'XX'}] ${r.domain}/${r.slug}`);
    for (const tier of ['basic', 'advanced']) {
      if (!r[tier].ok) {
        r[tier].issues.forEach((i) => console.log(`         ! ${tier}: ${i}`));
      }
    }
  }

  console.log(fail === 0 ? '\nDeep skill validation: PASS' : '\nDeep skill validation: FAIL');
  process.exit(fail > 0 ? 1 : 0);
}

main();
