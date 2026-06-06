#!/usr/bin/env node
/**
 * Creates spec-named agent files with domain-specific content (dual-naming policy).
 * Skips existing files. Run: node scripts/fill-agent-gaps.mjs
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEFS = join(dirname(fileURLToPath(import.meta.url)), 'agent-gap-definitions.json');

function titleFromFile(file) {
  const base = file.split('/').pop().replace(/\.md$/, '').replace(/^\d+d-/, '');
  return base.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function buildAgent(spec) {
  const name = titleFromFile(spec.file);
  const gov = spec.governance ?? [
    'platform-governance/flutter-ui-rules.md',
    'platform-governance/api-standards.md',
    'platform-governance/security-rules.md',
  ];
  const appHint = spec.domain?.includes('livestream')
    ? 'livestream-app'
    : spec.domain?.includes('social')
      ? 'social-app'
      : spec.domain;
  const tech =
    spec.stack ??
    'Flutter (Riverpod, GoRouter), NestJS, PostgreSQL, Redis, Socket.IO, AWS S3, Cloudflare CDN';

  return `# ${name}

## Role
${spec.role}

## Responsibilities
${spec.responsibilities.map((r) => `- ${r}`).join('\n')}

## Inputs
- Platform governance documents and packages/shared-contracts
- Agent registry dependency map and product specs
- Existing code in apps/${appHint}/, services/, packages/

## Outputs
- Implementation plans and technical specifications
- API contracts in packages/shared-contracts where applicable
- Integration notes, observability hooks, and test acceptance criteria

## Dependencies
${spec.dependencies.map((d) => `- ${d}`).join('\n')}

## Governance References
${gov.map((g) => `- ${g}`).join('\n')}

## Execution Context
- Phase: ${spec.phase}
- Domain: ${spec.domain}
- Tech Stack: ${tech}

## Prompt Template

\`\`\`
You are the ${name} for Stream Heaven — an AI-native entertainment super ecosystem.

Context:
- Platform: Social, Livestream, Astro, Media (OTT) on shared identity and realtime
- Stack: Flutter (Riverpod, GoRouter), NestJS, PostgreSQL, Redis, Socket.IO, Agora/Zego, AWS S3, Cloudflare CDN, Firebase Auth
- Audience: Indian + global; low-end Android; intermittent connectivity
- Languages: English, Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, Marathi, Punjabi

Governance (must follow):
${gov.map((g) => `- ${g}`).join('\n')}

Your mission: ${spec.role.replace(/\.$/, '')}.

Deliverables:
- Contract-first specs in packages/shared-contracts
- Integration with agents in Dependencies; no duplicate services
- Test strategy and rollout notes

Constraints:
- No secrets in repo; reference services/ before new microservices
- Optimize for low-end devices; escalate safety to ai-agents/safety/*

Begin by stating your plan, then execute.
\`\`\`
`;
}

function main() {
  const agents = JSON.parse(readFileSync(DEFS, 'utf8'));
  const report = { created: [], skipped: [], errors: [] };
  for (const spec of agents) {
    const full = join(ROOT, spec.file);
    try {
      if (existsSync(full)) {
        report.skipped.push(spec.file);
        continue;
      }
      mkdirSync(dirname(full), { recursive: true });
      writeFileSync(full, buildAgent(spec), 'utf8');
      report.created.push(spec.file);
    } catch (e) {
      report.errors.push({ file: spec.file, error: String(e) });
    }
  }
  console.log(
    JSON.stringify(
      {
        created: report.created.length,
        skipped: report.skipped.length,
        errors: report.errors.length,
        createdFiles: report.created,
      },
      null,
      2
    )
  );
}

main();
