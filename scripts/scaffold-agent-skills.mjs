#!/usr/bin/env node
/**
 * Scaffold basic + advanced Cursor skills for manifest agents (skip existing).
 * Prefer: node scripts/generate-agent-skills.mjs (role-specific competency sections).
 * Run: node scripts/scaffold-agent-skills.mjs
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {
  AGENT_SKILL_MANIFEST,
  skillPath,
} from './agent-skill-manifest.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function titleFromSlug(slug) {
  return slug
    .replace(/-agent$/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function extractRole(agentPath) {
  try {
    const content = readFileSync(join(ROOT, agentPath), 'utf8');
    const m = content.match(/## Role\n([\s\S]*?)(?=\n## )/);
    return m?.[1]?.trim().split('\n')[0] ?? '';
  } catch {
    return '';
  }
}

function buildSkill(entry, tier) {
  const title = titleFromSlug(entry.slug);
  const role = extractRole(entry.agent) || `${title} for Stream Heaven`;
  const name = `stream-heaven-${entry.domain.replace(/\//g, '-')}-${entry.slug}-${tier}`;
  const isAdvanced = tier === 'advanced';

  const capabilitiesBasic = [
    'Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)',
    `Open agent: \`${entry.agent}\` and copy its \`## Prompt Template\` block`,
    'Work within assigned path boundaries; contract-first in `packages/shared-contracts/`',
    'Run `node scripts/validate-agents.mjs` after editing agent markdown',
  ];

  const capabilitiesAdvanced = [
    'Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`',
    'Cross-check dependencies listed in the agent file before multi-service changes',
    'Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks',
    'Run golden + skill validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-agent-skills.mjs`',
    'Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar',
  ];

  const caps = isAdvanced ? capabilitiesAdvanced : capabilitiesBasic;

  return `---
name: ${name}
description: >-
  ${isAdvanced ? 'Advanced' : 'Basic'} Cursor skill for Stream Heaven ${title} (phase ${entry.phase}).
  ${isAdvanced ? 'Multi-agent orchestration, ADRs, and production-grade validation.' : 'Single-agent execution with governance prefix and structural validation.'}
---

# ${title} — ${isAdvanced ? 'Advanced' : 'Basic'}

## When to use

- User invokes **${title}** or work in **${entry.domain}** (phase ${entry.phase})
- ${isAdvanced ? 'Cross-domain features, production readiness, or multi-chat orchestration' : 'Focused task within this agent\'s scope'}

## Agent

- **Path:** \`${entry.agent}\`
- **Role:** ${role}

## Scope (${tier})

${caps.map((c) => `- ${c}`).join('\n')}

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | \`platform-governance/MASTER-AI-OPERATING-SYSTEM.md\` |
| Agent registry | \`ai-agents/AGENT-REGISTRY.md\` |
| Shared contracts | \`packages/shared-contracts/\` |
| Validate agents | \`node scripts/validate-agents.mjs\` |
| Validate skills | \`node scripts/validate-agent-skills.mjs\` |

## Validation

\`\`\`powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
${isAdvanced ? 'node scripts/test-golden-agents.mjs' : ''}
\`\`\`

## Related skills

- Basic: \`.cursor/skills/stream-heaven/${entry.domain}/${entry.slug}/basic/SKILL.md\`
- Advanced: \`.cursor/skills/stream-heaven/${entry.domain}/${entry.slug}/advanced/SKILL.md\`
- Index: \`.cursor/skills/stream-heaven/README.md\`
`;
}

function main() {
  let created = 0;
  let skipped = 0;
  const createdFiles = [];

  for (const entry of AGENT_SKILL_MANIFEST) {
    for (const tier of ['basic', 'advanced']) {
      const rel = skillPath(entry, tier);
      const full = join(ROOT, rel);
      if (existsSync(full)) {
        skipped++;
        continue;
      }
      mkdirSync(dirname(full), { recursive: true });
      writeFileSync(full, buildSkill(entry, tier), 'utf8');
      created++;
      createdFiles.push(rel);
    }
  }

  console.log(JSON.stringify({ created, skipped, createdFiles }, null, 2));
}

main();
