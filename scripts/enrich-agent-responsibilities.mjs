#!/usr/bin/env node
/**
 * Enrich boilerplate ## Responsibilities sections in agent .md files.
 *
 * Usage:
 *   node scripts/enrich-agent-responsibilities.mjs
 *   node scripts/enrich-agent-responsibilities.mjs --dry-run
 *   node scripts/enrich-agent-responsibilities.mjs --force
 *   node scripts/enrich-agent-responsibilities.mjs --agent ai-agents/executive/cto-agent.md
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  collectAgentFiles,
  parseAgentMeta,
  deriveSkillEntry,
  domainCategory,
} from './agent-skill-utils.mjs';
import {
  generateResponsibilities,
  needsResponsibilityEnrichment,
  isBoilerplateResponsibilities,
} from './agent-responsibility-templates.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const FORCE = args.includes('--force');
const agentIdx = args.indexOf('--agent');
const SINGLE_AGENT = agentIdx !== -1 ? args[agentIdx + 1] : null;

function buildContext(agentRel) {
  const meta = parseAgentMeta(agentRel);
  const entry = deriveSkillEntry(agentRel);
  return {
    agentRel,
    slug: entry.slug,
    title: entry.slug.replace(/-/g, ' '),
    domain: entry.domain,
    domainLabel: meta.domainLabel,
    category: domainCategory(entry.domain),
    phase: meta.phase,
    role: meta.role,
    content: meta.content,
  };
}

function replaceResponsibilitiesSection(content, bullets) {
  if (!content.includes('## Responsibilities')) {
    return null;
  }
  const block = bullets.map((b) => `- ${b}`).join('\n');
  return content.replace(
    /## Responsibilities\n[\s\S]*?(?=\n## )/,
    `## Responsibilities\n${block}\n`
  );
}

function shouldProcess(content) {
  if (FORCE) return true;
  return needsResponsibilityEnrichment(content);
}

function resolveAgentFiles() {
  let files = collectAgentFiles();
  if (SINGLE_AGENT) {
    const needle = SINGLE_AGENT.replace(/\\/g, '/');
    files = files.filter((f) => f === needle || f.endsWith(needle));
    if (files.length === 0) {
      console.error(`Agent not found: ${SINGLE_AGENT}`);
      process.exit(1);
    }
  }
  return files;
}

function main() {
  const files = resolveAgentFiles();
  let updated = 0;
  let skipped = 0;
  let errors = 0;
  const samples = [];

  for (const agentRel of files) {
    const filePath = join(ROOT, agentRel);
    let content;
    try {
      content = readFileSync(filePath, 'utf8');
    } catch {
      errors++;
      continue;
    }

    if (!shouldProcess(content)) {
      skipped++;
      continue;
    }

    const ctx = buildContext(agentRel);
    const bullets = generateResponsibilities(ctx);
    if (bullets.length < 5) {
      console.warn(`Warning: only ${bullets.length} bullets for ${agentRel}`);
    }

    const newContent = replaceResponsibilitiesSection(content, bullets);
    if (!newContent || newContent === content) {
      skipped++;
      continue;
    }

    if (!DRY_RUN) {
      writeFileSync(filePath, newContent, 'utf8');
    }

    updated++;
    if (samples.length < 5) {
      samples.push({
        path: agentRel,
        boilerplate: isBoilerplateResponsibilities(content),
      });
    }
  }

  console.log('Stream Heaven Agent Responsibility Enrichment');
  console.log('=============================================');
  console.log(`Mode: ${DRY_RUN ? 'dry-run' : 'write'}${FORCE ? ' (force)' : ''}`);
  console.log(`Agents scanned: ${files.length}`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);
  if (errors) console.log(`Errors: ${errors}`);
  if (samples.length) {
    console.log('');
    console.log('Sample updates:');
    for (const s of samples) {
      console.log(`  ${s.path}${s.boilerplate ? ' (was boilerplate)' : ''}`);
    }
  }
}

main();
