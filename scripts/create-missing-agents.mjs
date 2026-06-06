#!/usr/bin/env node
/**
 * Creates missing spec-named agent files for Stream Heaven completeness audit.
 * Skips files that already exist. Does not delete or rename generator-named agents.
 */
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { AGENT_DEFINITIONS } from './agent-gap-definitions.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const GOV_DEFAULT = [
  'platform-governance/MASTER-AI-OPERATING-SYSTEM.md',
  'platform-governance/api-standards.md',
  'platform-governance/security-rules.md',
];

const STACK =
  'Flutter (Riverpod, GoRouter), NestJS, PostgreSQL, Redis, Socket.IO, Agora/Zego, AWS S3, Cloudflare CDN, Firebase Auth';

function titleCase(slug) {
  return slug
    .replace(/\.md$/, '')
    .replace(/-agent$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildMarkdown(def) {
  const title = def.title || titleCase(def.file);
  const gov = def.governance || GOV_DEFAULT;
  const deps = def.dependencies || [
    'platform-governance/*',
    'packages/shared-contracts',
    'packages/shared-types',
    'ai-agents/orchestration/task-router.md',
  ];
  const resp = def.responsibilities.map((r) => `- ${r}`).join('\n');
  const depList = deps.map((d) => `- ${d}`).join('\n');
  const govList = gov.map((g) => `- ${g}`).join('\n');

  return `# ${title}

## Role
${def.role || `${title} specialist for Stream Heaven's ${def.domain} domain within the four-app entertainment ecosystem.`}

## Department
${def.department}

## Mission
${def.mission}

## Responsibilities
${resp}

## Inputs
- Platform governance documents and ADRs
- Agent registry and dependency map
- Product requirements for ${def.department}
- Existing codebase in apps/, services/, packages/

## Outputs
- Implementation plans and technical specifications
- Contract definitions in packages/shared-contracts when applicable
- Integration notes for dependent agents and services
- Test strategy and acceptance criteria

## Dependencies
${depList}

## Escalation
${def.escalation}

## Tech Stack
- **Frontend:** Flutter (Riverpod, GoRouter)
- **Backend:** NestJS, PostgreSQL, Redis
- **Realtime:** Socket.IO, Agora/Zego RTC
- **Storage/CDN:** AWS S3, Cloudflare
- **Auth:** Firebase Auth, OTP

## Phase Alignment
- **Phase:** ${def.phase}
- **Domain:** ${def.domain}
- **Priority:** ${def.priority || 'Standard'}

## Governance References
${govList}

## Execution Context
- Phase: ${def.phase}
- Domain: ${def.domain}
- Tech Stack: Flutter, NestJS, PostgreSQL, Redis, Socket.IO, AWS, Cloudflare

## Prompt Template

\`\`\`
You are the ${title} for Stream Heaven — an AI-native entertainment super ecosystem.

Context:
- Platform: Social App, Livestream App, Astro App, Media App (OTT)
- Stack: ${STACK}
- Audience: Indian + global users, low-end Android, poor connectivity
- Languages: English, Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, Marathi, Punjabi

Governance (must follow):
${gov.map((g) => `- ${g}`).join('\n')}

Your mission: ${def.mission.replace(/\n/g, ' ')}

Key responsibilities:
${def.responsibilities.slice(0, 5).map((r) => `- ${r}`).join('\n')}

Escalation: ${def.escalation.replace(/\n/g, ' ')}

Constraints:
- Contract-first: define APIs in packages/shared-contracts before implementation
- No secrets in code — AWS Secrets Manager / env vars only
- Reference existing services in services/ before creating duplicates
- Optimize for low-end devices and intermittent connectivity

Begin by stating your plan, then execute.
\`\`\`
`;
}

function main() {
  let created = 0;
  let skipped = 0;
  const createdFiles = [];

  for (const def of AGENT_DEFINITIONS) {
    const fullPath = join(ROOT, def.file);
    if (existsSync(fullPath)) {
      skipped++;
      continue;
    }
    mkdirSync(dirname(fullPath), { recursive: true });
    writeFileSync(fullPath, buildMarkdown(def), 'utf8');
    created++;
    createdFiles.push(def.file);
  }

  console.log(JSON.stringify({ created, skipped, createdFiles }, null, 2));
}

main();
