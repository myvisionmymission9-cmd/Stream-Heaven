/**
 * Shared utilities for agent skill generation and validation.
 */
import { readdirSync, readFileSync, statSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export const SKILL_ROOT_REL = '.cursor/skills/stream-heaven';

export const AGENT_GLOB_DIRS = [
  'ai-agents',
  'apps',
  'analytics-platform/agents',
  'api-platform/agents',
];

const AGENT_NAME_PATTERN =
  /agent|architect|specialist|orchestrator|router|lead|engineer|coordinator|manager|designer|reviewer|guardian|curator|advisor|moderator|enhancer|pipeline|integration|flow|engine|planner|tracker|keeper/;

export function walkMdFiles(dir, acc = []) {
  if (!statSync(dir, { throwIfFalse: false })?.isDirectory()) return acc;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      walkMdFiles(full, acc);
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.md') &&
      entry.name !== 'AGENT-REGISTRY.md' &&
      AGENT_NAME_PATTERN.test(entry.name)
    ) {
      acc.push(full);
    }
  }
  return acc;
}

export function collectAgentFiles() {
  const files = [];
  for (const rel of AGENT_GLOB_DIRS) {
    walkMdFiles(join(ROOT, rel), files);
  }
  return [...new Set(files)]
    .map((f) => relative(ROOT, f).replace(/\\/g, '/'))
    .sort();
}

export function deriveSkillEntry(agentRel) {
  const parts = agentRel.replace(/\\/g, '/').split('/');
  const filename = parts.pop().replace('.md', '');
  const slug = filename;

  if (parts[0] === 'apps') {
    const app = parts[1] ?? 'apps';
    return { agent: agentRel, domain: `apps/${app}`, slug, phase: null };
  }

  if (parts[0] === 'ai-agents') {
    parts.shift();
    const domain = parts.join('/') || 'ai-agents';
    return { agent: agentRel, domain, slug, phase: null };
  }

  if (parts.at(-1) === 'agents') {
    parts.pop();
  }
  const domain = parts.join('/') || 'agents';
  return { agent: agentRel, domain, slug, phase: null };
}

export function skillDir(entry, tier) {
  return `${SKILL_ROOT_REL}/${entry.domain}/${entry.slug}/${tier}`;
}

export function skillPath(entry, tier) {
  return `${skillDir(entry, tier)}/SKILL.md`;
}

export function titleFromSlug(slug) {
  return slug
    .replace(/-agent$/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function parseAgentMeta(agentRel) {
  const content = readFileSync(join(ROOT, agentRel), 'utf8');
  const section = (name) => {
    const m = content.match(new RegExp(`## ${name}\\n([\\s\\S]*?)(?=\\n## )`));
    return m?.[1]?.trim() ?? '';
  };

  const role = section('Role').split('\n')[0]?.trim() ?? '';
  const responsibilities = section('Responsibilities')
    .split('\n')
    .filter((l) => l.trim().startsWith('-'))
    .map((l) => l.replace(/^-\s*/, '').trim());

  const exec = section('Execution Context');
  const phaseMatch = exec.match(/Phase:\s*([^\n]+)/i);
  const domainMatch = exec.match(/Domain:\s*([^\n]+)/i);
  const stackMatch = exec.match(/Tech Stack:\s*([^\n]+)/i);

  return {
    content,
    role: role || `${titleFromSlug(deriveSkillEntry(agentRel).slug)} for Stream Heaven`,
    responsibilities,
    phase: phaseMatch?.[1]?.trim() ?? '—',
    domainLabel: domainMatch?.[1]?.trim() ?? deriveSkillEntry(agentRel).domain,
    techStack: stackMatch?.[1]?.trim() ?? '',
  };
}

export function buildSkillsBlock(entry) {
  const base = `${SKILL_ROOT_REL}/${entry.domain}/${entry.slug}`;
  return `## Skills
- Basic: \`${base}/basic/SKILL.md\`
- Advanced: \`${base}/advanced/SKILL.md\``;
}

export function insertSkillsSection(content, skillsBlock) {
  if (content.includes('## Skills')) return content;

  const execMatch = content.match(/## Execution Context\n([\s\S]*?)(?=\n## )/);
  if (execMatch) {
    const insertAt = execMatch.index + execMatch[0].length;
    return content.slice(0, insertAt) + `\n\n${skillsBlock}\n` + content.slice(insertAt);
  }

  const promptIdx = content.indexOf('## Prompt Template');
  if (promptIdx !== -1) {
    return content.slice(0, promptIdx) + `${skillsBlock}\n\n` + content.slice(promptIdx);
  }

  return null;
}

export function domainCategory(domain) {
  const top = domain.split('/')[0];
  const map = {
    executive: 'executive',
    governance: 'governance',
    'phase-1': 'phase-1',
    'phase-2': 'phase-2',
    'phase-2a': 'phase-2a',
    meta: 'meta',
    'master-brain': 'master-brain',
    orchestration: 'orchestration',
    'core-engineering': 'core-engineering',
    'design-system': 'design-system',
    'user-experience-intelligence': 'ux',
    games: 'games',
    testing: 'testing',
    'ml-platform': 'ml-platform',
    'search-infrastructure': 'search',
    'enterprise-security': 'security',
    web3: 'web3',
    'ad-network': 'ads',
    'future-systems': 'future',
    'identity-platform': 'identity',
    payments: 'payments',
    content: 'content',
    analytics: 'analytics',
    reliability: 'reliability',
    observability: 'observability',
    compliance: 'compliance',
    'data-platform': 'data',
    'ai-platform': 'ai',
    'media-app': 'media',
    'astro-app': 'astro',
    'social-app': 'social',
    'livestream-app': 'livestream',
    apps: 'apps',
  };

  if (domain.startsWith('apps/social-app')) return 'social';
  if (domain.startsWith('apps/livestream-app')) return 'livestream';
  if (domain.startsWith('apps/astro-app')) return 'astro';
  if (domain.startsWith('apps/media-app')) return 'media';
  if (domain.includes('/backend')) return 'backend';
  if (domain.includes('/frontend')) return 'frontend';
  if (domain.includes('/realtime')) return 'realtime';
  if (domain.includes('/database')) return 'database';
  if (domain.includes('/infrastructure')) return 'infrastructure';
  if (domain.includes('/reliability')) return 'reliability';

  return map[top] ?? 'general';
}
