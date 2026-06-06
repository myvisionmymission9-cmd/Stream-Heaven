---
name: stream-heaven-all-agents
description: Indexes all Stream Heaven agents and resolves agent lookups by phase, domain, and keyword using AGENT-REGISTRY and scripts/list-agents.mjs. Use when the user asks to find, pick, or run any Stream Heaven agent.
disable-model-invocation: true
---

# Stream Heaven All Agents

Use this project skill to make the full Stream Heaven agent catalog immediately usable without creating hundreds of separate skills.

## Purpose

- Treat all `*.md` agent prompts in `ai-agents/`, `apps/*/agents/`, `analytics-platform/agents/`, and `api-platform/agents/` as install-ready.
- Resolve lookups through the single source of truth: `ai-agents/AGENT-REGISTRY.md`.
- Use `scripts/list-agents.mjs` for fast filtered discovery and Cursor `@` path mentions.

## Fast Lookup Workflow

1. Start from `ai-agents/AGENT-REGISTRY.md` to identify phase, domain, and canonical path.
2. Run `node scripts/list-agents.mjs` with filters when needed:
   - `node scripts/list-agents.mjs --phase 1`
   - `node scripts/list-agents.mjs --phase 2a`
   - `node scripts/list-agents.mjs --domain games`
   - `node scripts/list-agents.mjs --search auth`
3. In chat, reference the discovered file directly with `@relative/path/to/agent.md`.
4. Copy the agent file's `## Prompt Template` block into a new execution chat.
5. Prefix execution context with `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or lighter governance prompt if requested).

## Phase and Domain Map

Use these sections in `ai-agents/AGENT-REGISTRY.md` as jump points.

| Scope | Registry Section |
| --- | --- |
| Phase 0-1 foundation | `## Phase 0 — Meta QA`, `## Phase 1 — Foundation Implementation` |
| Phase 2a mobile shell | `## Phase 2a — Flutter Mobile Shell` |
| Core platform rollout | `## Phase 2` through `## Phase 20` |
| Livestream app agents | `apps/livestream-app/agents/` entries under later phase sections |
| Games and gamification | `ai-agents/games/` and sections referencing games systems |
| Gap-fill aliases | `## Gap-Fill Agents` plus `## Spec Name Alias Table` |

## Prompt Usage Pattern

Use this template when launching any discovered agent:

```text
1) Load governance: platform-governance/MASTER-AI-OPERATING-SYSTEM.md
2) Target agent file: <resolved path from AGENT-REGISTRY or list-agents>
3) Paste the agent's ## Prompt Template block
4) Provide task scope, affected paths, and expected outputs
5) After bulk edits: run node scripts/validate-agents.mjs
```

## Validation and Quality Commands

- Full catalog scan: `node scripts/validate-agents.mjs`
- JSON scan for tooling: `node scripts/validate-agents.mjs --json`
- Manifest agent skills (basic + advanced): `node scripts/validate-agent-skills.mjs`
- Scaffold missing paired skills: `node scripts/scaffold-agent-skills.mjs`
- Golden critical-agent test: `node scripts/test-golden-agents.mjs`
- Fast listing utility: `node scripts/list-agents.mjs`

## Per-agent skills (basic + advanced)

Critical agents use paired skills under `.cursor/skills/stream-heaven/`:

- Example: `.cursor/skills/stream-heaven/phase-1/auth-service-agent/basic/SKILL.md`
- Manifest: `scripts/agent-skill-manifest.mjs` · Index: `.cursor/skills/stream-heaven/README.md`

## Notes

- "Installed" means the agent markdown files exist, are discoverable, and pass structural validation checks.
- This skill is an index/orchestrator for all agents; it does not create per-agent SKILL files.
