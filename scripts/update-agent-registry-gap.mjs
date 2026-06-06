#!/usr/bin/env node
/** Patches AGENT-REGISTRY.md with naming policy, aliases, metrics, and gap-fill tables */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REG = join(ROOT, 'ai-agents/AGENT-REGISTRY.md');
const DEFS = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'agent-gap-definitions.json'), 'utf8')
);

const ALIASES = [
  ['livestream-agent', 'apps/livestream-app/agents/core/livestream-architect.md', 'apps/livestream-app/agents/core/livestream-agent.md'],
  ['audio-room-agent', '(new spec)', 'apps/livestream-app/agents/core/audio-room-agent.md'],
  ['creator-monetization-agent', '(new spec)', 'apps/livestream-app/agents/core/creator-monetization-agent.md'],
  ['livestream-scaling-agent', '(new spec)', 'apps/livestream-app/agents/core/livestream-scaling-agent.md'],
  ['live-comment-agent', '(new spec)', 'apps/livestream-app/agents/video-systems/live-comment-agent.md'],
  ['live-reaction-agent', '(new spec)', 'apps/livestream-app/agents/video-systems/live-reaction-agent.md'],
  ['low-latency-stream-agent', '(new spec)', 'apps/livestream-app/agents/video-systems/low-latency-stream-agent.md'],
  ['seat-management-agent', 'co-host-manager.md (partial)', 'apps/livestream-app/agents/multi-guest/seat-management-agent.md'],
  ['guest-request-agent', 'guest-invite-agent.md', 'apps/livestream-app/agents/multi-guest/guest-request-agent.md'],
  ['live-stage-agent', 'layout-compositor.md (partial)', 'apps/livestream-app/agents/multi-guest/live-stage-agent.md'],
  ['pk-tournament-agent', 'pk-battle-agent.md (partial)', 'apps/livestream-app/agents/operations/pk-tournament-agent.md'],
  ['livestream-battle-agent', 'pk-battle-agent.md', 'apps/livestream-app/agents/operations/livestream-battle-agent.md'],
  ['high-spender-agent', 'whale-retention-agent.md (partial)', 'apps/livestream-app/agents/economy-psychology/high-spender-agent.md'],
  ['gift-conversion-agent', 'gift-trigger-psychology.md (partial)', 'apps/livestream-app/agents/economy-psychology/gift-conversion-agent.md'],
  ['vip-retention-agent', 'whale-retention-agent.md', 'apps/livestream-app/agents/economy-psychology/vip-retention-agent.md'],
  ['social-feed-agent', 'feed-architect.md', 'apps/social-app/agents/social-feed-agent.md'],
  ['follow-system-agent', 'follow-graph-manager.md', 'apps/social-app/agents/follow-system-agent.md'],
  ['gift-trigger-agent', 'gift-trigger-psychology.md (live)', 'ai-agents/gift-effects/rendering/gift-trigger-agent.md'],
  ['gift-animation-agent', 'gift-animation-renderer.md', 'ai-agents/gift-effects/rendering/gift-animation-agent.md'],
  ['gift-rendering-agent', 'gift-animation-renderer.md', 'ai-agents/gift-effects/rendering/gift-rendering-agent.md'],
  ['particle-effects-agent', 'particle-system-agent.md', 'ai-agents/gift-effects/fx/particle-effects-agent.md'],
  ['screen-overlay-agent', 'fullscreen-overlay-agent.md', 'ai-agents/gift-effects/fx/screen-overlay-agent.md'],
  ['gift-sound-agent', 'gift-sound-designer.md', 'ai-agents/gift-effects/audio/gift-sound-agent.md'],
  ['universal-user-agent', 'unified-auth-agent.md', 'ai-agents/identity-platform/universal-user-agent.md'],
  ['single-sign-on-agent', 'sso-federation-agent.md', 'ai-agents/identity-platform/single-sign-on-agent.md'],
  ['device-identity-agent', 'device-trust-agent.md', 'ai-agents/identity-platform/device-identity-agent.md'],
  ['session-identity-agent', 'session-manager-agent.md', 'ai-agents/identity-platform/session-identity-agent.md'],
  ['identity-resolution-agent', 'identity-graph-agent.md (partial)', 'ai-agents/identity-platform/identity-resolution-agent.md'],
  ['event-stream-agent', 'event-bus-architect.md', 'ai-agents/event-system/event-stream-agent.md'],
  ['dead-letter-queue-agent', 'dead-letter-handler.md', 'ai-agents/event-system/dead-letter-queue-agent.md'],
  ['memory-retrieval-agent', 'memory-retrieval-agent.md (existing)', 'ai-agents/agent-memory/memory-retrieval-agent.md'],
  ['trust-safety-agent', 'trust-safety-reviewer.md', 'ai-agents/safety/trust-safety-agent.md'],
  ['load-testing-agent', 'load-test-agent.md', 'ai-agents/testing/load-testing-agent.md'],
  ['chaos-engineering-agent (testing)', 'chaos-test-agent.md', 'ai-agents/testing/chaos-engineering-agent.md'],
  ['chaos-engineering-agent (reliability)', 'chaos-engineer.md', 'ai-agents/core-engineering/reliability/chaos-engineering-agent.md'],
  ['aso-agent', 'app-store-optimization-agent.md', 'ai-agents/store-growth/aso-agent.md'],
  ['design-token-sync-agent', 'figma-sync-coordinator.md (partial)', 'ai-agents/core-engineering/frontend/design-token-sync-agent.md'],
];

function row(spec) {
  const name = spec.file
    .split('/')
    .pop()
    .replace('.md', '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  const path = spec.file;
  const purpose = spec.role.replace(/\.$/, '').slice(0, 120);
  return `| ${name} | \`${path}\` | ${purpose} |`;
}

const byPhase = {};
for (const s of DEFS) {
  const k = `Phase ${s.phase} — ${s.domain}`;
  if (!byPhase[k]) byPhase[k] = [];
  byPhase[k].push(s);
}

let appendix = '\n## Gap-Fill Agents (2026-05-29)\n\n';
appendix +=
  '> Spec-named agents added under **dual naming**. Generator/legacy files retained. See alias table at top.\n\n';
for (const [phase, agents] of Object.entries(byPhase).sort()) {
  appendix += `### ${phase}\n\n| Agent | Path | Purpose |\n|-------|------|--------|\n`;
  appendix += agents.map(row).join('\n') + '\n\n';
}

const aliasMd = `## Naming Policy (Dual Naming)

**Decision (2026-05-29):** Keep all existing generator-named agent files unchanged. Add **spec-named** agents as **new files** (no symlinks on Windows). Use \`AGENT-REGISTRY.md\` alias table to map spec ↔ legacy disk paths. Prefer spec names in new docs and contracts; legacy names remain valid for existing chats.

### Alias Table (spec → legacy → spec path)

| Spec name | Legacy / generator path | Spec path |
|-----------|-------------------------|-----------|
${ALIASES.map(([s, l, p]) => `| ${s} | \`${l}\` | \`${p}\` |`).join('\n')}

`;

let reg = readFileSync(REG, 'utf8');
reg = reg.replace(
  /> Generated: 2026-05-29[\s\S]*?## How to Use/,
  `> Generated: 2026-05-29 (gap-fill pass)\n\n${aliasMd}## How to Use`
);
reg = reg.replace(
  /\| Total Agents \| 420\+ \|[\s\S]*?\| Agents validated \(script\) \| 366 \|/,
  `| Total Agents | 515+ |
| Agents validated (script) | 515 |
| PASS rate (validate-agents) | ~35% (182 PASS); legacy boilerplate agents remain PARTIAL |
| Spec-named gap-fill added | 149 |`
);

if (!reg.includes('## Gap-Fill Agents (2026-05-29)')) {
  reg = reg.trimEnd() + appendix;
}

writeFileSync(REG, reg, 'utf8');
console.log('Updated AGENT-REGISTRY.md');
