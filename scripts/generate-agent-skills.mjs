#!/usr/bin/env node
/**
 * Generate basic + advanced Cursor skills for all Stream Heaven agents.
 *
 * Usage:
 *   node scripts/generate-agent-skills.mjs
 *   node scripts/generate-agent-skills.mjs --dry-run
 *   node scripts/generate-agent-skills.mjs --force
 *   node scripts/generate-agent-skills.mjs --manifest
 *   node scripts/generate-agent-skills.mjs --agent ai-agents/games/ludo-agent.md
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import {
  collectAgentFiles,
  deriveSkillEntry,
  SKILL_ROOT_REL,
  buildSkillsBlock,
  insertSkillsSection,
} from './agent-skill-utils.mjs';
import {
  resolveTemplateKey,
  customizeSections,
  getTemplate,
} from './agent-skill-templates.mjs';
import { AGENT_SKILL_ENRICHMENTS } from './agent-skill-enrichments.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILL_ROOT = join(ROOT, SKILL_ROOT_REL);

const DRY_RUN = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');
const WRITE_MANIFEST = process.argv.includes('--manifest');
const agentArgIdx = process.argv.indexOf('--agent');
const SINGLE_AGENT = agentArgIdx >= 0 ? process.argv[agentArgIdx + 1] : null;

/** Hand-authored enrichments — skip regeneration unless stub or --force */
const MANUALLY_ENRICHED = new Set(Object.keys(AGENT_SKILL_ENRICHMENTS));

const STUB_THRESHOLD = 500;

function parseAgent(content, slug) {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : slug;

  const roleMatch = content.match(/## Role\s*\n([\s\S]*?)(?=\n## )/);
  const role = roleMatch ? roleMatch[1].trim().split('\n')[0].trim() : title;

  const respMatch = content.match(/## Responsibilities\s*\n([\s\S]*?)(?=\n## )/);
  const responsibilities = [];
  if (respMatch) {
    for (const line of respMatch[1].split('\n')) {
      const t = line.trim();
      if (t.startsWith('- ')) responsibilities.push(t.slice(2));
    }
  }

  let phase = '?';
  let domainField = '';
  const ctxMatch = content.match(/## Execution Context\s*\n([\s\S]*?)(?=\n## )/);
  if (ctxMatch) {
    const phaseM = ctxMatch[1].match(/Phase:\s*(.+)/);
    const domainM = ctxMatch[1].match(/Domain:\s*(.+)/);
    if (phaseM) phase = phaseM[1].trim();
    if (domainM) domainField = domainM[1].trim();
  }

  return { title, role, responsibilities, phase, domainField };
}

function slugToDisplayName(slug) {
  return slug
    .replace(/-agent$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function skillName(domain, slug, tier) {
  const base = `stream-heaven-${domain.replace(/\//g, '-')}-${slug}-${tier}`.toLowerCase();
  return base.replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
}

function enrichmentToSections(sections) {
  return sections.map((s) => ({
    title: s.title.replace(/\s+Skills$/, ''),
    verb: 'Apply',
    items: s.bullets,
  }));
}

function formatCompetencySections(sections, tier) {
  const header = tier === 'advanced' ? '## Role-specific skills (advanced)' : '## Role-specific skills';
  const lines = [header, ''];
  for (const sec of sections) {
    lines.push(`### ${sec.title}`);
    lines.push(`${sec.verb}:`);
    for (const item of sec.items) {
      lines.push(`- ${item}`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

function keyPathsBlock(agentRel, domain) {
  const rows = [
    ['Master prompt', 'platform-governance/MASTER-AI-OPERATING-SYSTEM.md'],
    ['Agent registry', 'ai-agents/AGENT-REGISTRY.md'],
    ['Shared contracts', 'packages/shared-contracts/'],
    ['Validate agents', 'node scripts/validate-agents.mjs'],
    ['Validate skills', 'node scripts/validate-agent-skills.mjs'],
    ['Deep skill check', 'node scripts/validate-all-agent-skills.mjs'],
  ];
  if (domain.startsWith('apps/')) {
    rows.splice(2, 0, ['App root', `${domain.replace('apps/', 'apps/')}/`]);
  }
  if (domain.includes('games') || agentRel.includes('/games/')) {
    rows.push(['Games platform', 'ai-agents/games/games-platform-architect.md']);
  }
  if (domain.includes('phase-1') || agentRel.includes('phase-1/')) {
    rows.push(['Phase 1 setup', 'scripts/setup-phase1.ps1']);
  }

  return `## Key paths

| Resource | Path |
|----------|------|
${rows.map(([k, v]) => `| ${k} | \`${v}\` |`).join('\n')}
`;
}

function buildSkillContent(meta, tier, sections) {
  const { agentRel, domain, slug, role, phase } = meta;
  const displayName = slugToDisplayName(slug);
  const name = skillName(domain, slug, tier);
  const tierLabel = tier === 'advanced' ? 'Advanced' : 'Basic';
  const scopeLabel = tier === 'advanced' ? 'advanced' : 'basic';

  const scopeItems =
    tier === 'advanced'
      ? [
          '- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`',
          '- Cross-check ## Dependencies before multi-service changes',
          '- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks',
          '- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`',
          '- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar',
        ]
      : [
          '- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)',
          `- Open agent: \`${agentRel}\` and copy its \`## Prompt Template\` block`,
          '- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`',
          '- Run `node scripts/validate-agents.mjs` after editing agent markdown',
        ];

  const validationCmds =
    tier === 'advanced'
      ? `node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs
node scripts/test-golden-agents.mjs`
      : `node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs`;

  const whenToUse =
    tier === 'advanced'
      ? `- User invokes **${displayName}** or work in **${domain}** (phase ${phase})\n- Cross-domain features, production readiness, or multi-chat orchestration`
      : `- User invokes **${displayName}** or work in **${domain}** (phase ${phase})\n- Focused task within this agent's scope`;

  return `---
name: ${name}
description: >-
  ${tierLabel} Cursor skill for Stream Heaven ${displayName} (phase ${phase}).
  ${tier === 'advanced' ? 'Multi-agent orchestration, ADRs, and production-grade validation.' : 'Single-agent execution with governance prefix and structural validation.'}
---

# ${displayName} — ${tierLabel}

## When to use

${whenToUse}

## Agent

- **Path:** \`${agentRel}\`
- **Role:** ${role}

## Scope (${scopeLabel})

${scopeItems.join('\n')}

${formatCompetencySections(sections, tier)}
${keyPathsBlock(agentRel, domain)}
## Validation

\`\`\`powershell
${validationCmds}
\`\`\`

## Related skills

- Basic: \`${SKILL_ROOT_REL}/${domain}/${slug}/basic/SKILL.md\`
- Advanced: \`${SKILL_ROOT_REL}/${domain}/${slug}/advanced/SKILL.md\`
- Index: \`${SKILL_ROOT_REL}/README.md\`
`;
}

function competencyCharCount(content) {
  const m = content.match(/## Role-specific skills[\s\S]*?(?=\n## Key paths)/);
  return m ? m[0].length : 0;
}

function isStubSkill(skillPath) {
  if (!existsSync(skillPath)) return true;
  const content = readFileSync(skillPath, 'utf8');
  if (!content.includes('## Role-specific skills')) return true;
  return competencyCharCount(content) < STUB_THRESHOLD;
}

function shouldGenerate(agentRel, basicPath, advancedPath) {
  if (FORCE) return true;
  if (MANUALLY_ENRICHED.has(agentRel)) {
    const bothExist = existsSync(basicPath) && existsSync(advancedPath);
    const bothRich = !isStubSkill(basicPath) && !isStubSkill(advancedPath);
    if (bothExist && bothRich) return false;
  }
  if (!existsSync(basicPath) || !existsSync(advancedPath)) return true;
  return isStubSkill(basicPath) || isStubSkill(advancedPath);
}

function updateAgentSkillsSection(agentRel, entry) {
  const agentPath = join(ROOT, agentRel);
  let content = readFileSync(agentPath, 'utf8');
  const skillsBlock = buildSkillsBlock(entry);

  if (content.includes('## Skills')) {
    content = content.replace(/## Skills\s*\n(?:- .+\n)*/m, `${skillsBlock}\n`);
  } else {
    const updated = insertSkillsSection(content, skillsBlock);
    if (updated) {
      content = updated;
    } else if (content.includes('## Prompt Template')) {
      content = content.replace('## Prompt Template', `${skillsBlock}\n\n## Prompt Template`);
    } else {
      content = `${content.trim()}\n\n${skillsBlock}\n`;
    }
  }

  if (!DRY_RUN) {
    writeFileSync(agentPath, content, 'utf8');
  }
  return true;
}

function generateForAgent(agentRel) {
  const agentPath = join(ROOT, agentRel);
  if (!existsSync(agentPath)) {
    return { agentRel, status: 'error', reason: 'Agent file not found' };
  }

  const content = readFileSync(agentPath, 'utf8');
  const entry = deriveSkillEntry(agentRel);
  const { domain, slug } = entry;
  const parsed = parseAgent(content, slug);
  const basicDir = join(SKILL_ROOT, domain, slug, 'basic');
  const advancedDir = join(SKILL_ROOT, domain, slug, 'advanced');
  const basicPath = join(basicDir, 'SKILL.md');
  const advancedPath = join(advancedDir, 'SKILL.md');

  if (!shouldGenerate(agentRel, basicPath, advancedPath)) {
    updateAgentSkillsSection(agentRel, entry);
    return { agentRel, domain, slug, status: 'skipped', reason: 'Existing enriched skills' };
  }

  const templateKey = resolveTemplateKey(agentRel, parsed.domainField, parsed.role, slug);
  const displayName = slugToDisplayName(slug);
  const handAuthored = AGENT_SKILL_ENRICHMENTS[agentRel];

  const basicSections = handAuthored?.basic
    ? enrichmentToSections(handAuthored.basic)
    : customizeSections(getTemplate(templateKey, 'basic'), parsed.responsibilities, displayName);
  const advancedSections = handAuthored?.advanced
    ? enrichmentToSections(handAuthored.advanced)
    : customizeSections(getTemplate(templateKey, 'advanced'), parsed.responsibilities, displayName);

  const meta = { agentRel, domain, slug, ...parsed };
  const basicContent = buildSkillContent(meta, 'basic', basicSections);
  const advancedContent = buildSkillContent(meta, 'advanced', advancedSections);

  if (!DRY_RUN) {
    mkdirSync(basicDir, { recursive: true });
    mkdirSync(advancedDir, { recursive: true });
    writeFileSync(basicPath, basicContent, 'utf8');
    writeFileSync(advancedPath, advancedContent, 'utf8');
    updateAgentSkillsSection(agentRel, entry);
  }

  return {
    agentRel,
    domain,
    slug,
    templateKey,
    status: DRY_RUN ? 'dry-run' : 'generated',
    basicSections: basicSections.length,
    advancedSections: advancedSections.length,
  };
}

function writeManifest(agents) {
  const entries = [];
  for (const agentRel of agents) {
    const agentPath = join(ROOT, agentRel);
    if (!existsSync(agentPath)) continue;
    const entry = deriveSkillEntry(agentRel);
    const parsed = parseAgent(readFileSync(agentPath, 'utf8'), entry.slug);
    entries.push({
      agent: agentRel,
      domain: entry.domain,
      slug: entry.slug,
      phase: parsed.phase === '?' ? '—' : parsed.phase,
    });
  }

  entries.sort((a, b) => a.agent.localeCompare(b.agent));

  const lines = [
    '/**',
    ' * AUTO-GENERATED by scripts/generate-agent-skills.mjs — do not hand-edit.',
    ' * Agents with paired Cursor skills (basic + advanced).',
    ' * Regenerate: node scripts/generate-agent-skills.mjs --manifest --force',
    ' */',
    "import { SKILL_ROOT_REL as ROOT } from './agent-skill-utils.mjs';",
    '',
    "export { SKILL_ROOT_REL } from './agent-skill-utils.mjs';",
    '',
    'export const AGENT_SKILL_MANIFEST = [',
  ];

  for (const e of entries) {
    lines.push('  {');
    lines.push(`    agent: '${e.agent}',`);
    lines.push(`    domain: '${e.domain}',`);
    lines.push(`    slug: '${e.slug}',`);
    lines.push(`    phase: '${e.phase}',`);
    lines.push('  },');
  }

  lines.push('];', '');

  const outPath = join(ROOT, 'scripts/agent-skill-manifest.mjs');
  if (!DRY_RUN) {
    writeFileSync(outPath, lines.join('\n'), 'utf8');
  }
  return entries.length;
}

function main() {
  let agents = collectAgentFiles();
  if (SINGLE_AGENT) {
    agents = [SINGLE_AGENT.replace(/\\/g, '/')];
  }

  if (WRITE_MANIFEST && !SINGLE_AGENT) {
    const count = writeManifest(agents);
    console.log(`Manifest written: ${count} agents`);
  }

  const results = [];
  let generated = 0;
  let skipped = 0;
  let errors = 0;

  for (const agentRel of agents) {
    const result = generateForAgent(agentRel);
    results.push(result);
    if (result.status === 'generated' || result.status === 'dry-run') generated++;
    else if (result.status === 'skipped') skipped++;
    else if (result.status === 'error') errors++;
  }

  console.log('Stream Heaven Agent Skill Generator');
  console.log('==================================');
  console.log(`Mode: ${DRY_RUN ? 'dry-run' : 'write'}${FORCE ? ' (force)' : ''}`);
  console.log(`Agents discovered: ${agents.length}`);
  console.log(`Generated: ${generated}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Errors: ${errors}`);

  if (errors > 0) {
    console.log('\nErrors:');
    for (const r of results.filter((x) => x.status === 'error')) {
      console.log(`  - ${r.agentRel}: ${r.reason}`);
    }
  }

  process.exit(errors > 0 ? 1 : 0);
}

main();
