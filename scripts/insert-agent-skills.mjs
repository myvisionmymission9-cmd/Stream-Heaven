#!/usr/bin/env node
/**
 * Insert ## Skills section into manifest agent markdown files (skip if present).
 * Run: node scripts/insert-agent-skills.mjs
 * Dry-run: node scripts/insert-agent-skills.mjs --dry-run
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { AGENT_SKILL_MANIFEST } from './agent-skill-manifest.mjs';
import { buildSkillsBlock, insertSkillsSection } from './agent-skill-utils.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DRY_RUN = process.argv.includes('--dry-run');

function main() {
  const updated = [];
  const skipped = [];
  const failed = [];

  for (const entry of AGENT_SKILL_MANIFEST) {
    const agentPath = join(ROOT, entry.agent);
    if (!existsSync(agentPath)) {
      failed.push({ agent: entry.agent, reason: 'Agent file missing' });
      continue;
    }

    const content = readFileSync(agentPath, 'utf8');
    if (content.includes('## Skills')) {
      skipped.push(entry.agent);
      continue;
    }

    const skillsBlock = buildSkillsBlock(entry);
    const next = insertSkillsSection(content, skillsBlock);
    if (!next) {
      failed.push({ agent: entry.agent, reason: 'No insertion anchor (Execution Context or Prompt Template)' });
      continue;
    }

    if (!DRY_RUN) writeFileSync(agentPath, next, 'utf8');
    updated.push(entry.agent);
  }

  console.log(JSON.stringify({ dryRun: DRY_RUN, updated: updated.length, skipped: skipped.length, failed, updatedAgents: updated }, null, 2));
  process.exit(failed.length > 0 ? 1 : 0);
}

main();
