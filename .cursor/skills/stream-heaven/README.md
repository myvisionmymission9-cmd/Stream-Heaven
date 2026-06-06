# Stream Heaven Agent Skills

Paired **basic** and **advanced** Cursor skills for Stream Heaven agents across all phases and domains.

## Layout

```
.cursor/skills/stream-heaven/<domain>/<agent-slug>/basic/SKILL.md
.cursor/skills/stream-heaven/<domain>/<agent-slug>/advanced/SKILL.md
```

Examples:

- `.cursor/skills/stream-heaven/phase-1/auth-service-agent/basic/SKILL.md`
- `.cursor/skills/stream-heaven/executive/cto-agent/advanced/SKILL.md`
- `.cursor/skills/stream-heaven/games/ludo-agent/basic/SKILL.md`

## Skill content

Each skill includes:

- YAML frontmatter (`name`, `description`)
- **When to use**, **Agent**, **Scope** (basic or advanced)
- **Role-specific competency sections** (4–10 headers with bullet lists)
- **Key paths**, **Validation**, **Related skills**

Priority agents (CTO, auth, profile, gateway, NestJS, Flutter, Socket.IO, social feed, livestream) have hand-authored deep enrichments in `scripts/agent-skill-enrichments.mjs`. All other agents receive domain-tailored generated content from `scripts/agent-skill-templates.mjs`.

## Manifest

Agents requiring both tiers are listed in `scripts/agent-skill-manifest.mjs` (auto-generated).

## Commands

```powershell
# Generate skills for all agents (skips existing enriched unless stub)
node scripts/generate-agent-skills.mjs

# Regenerate everything + refresh manifest
node scripts/generate-agent-skills.mjs --force --manifest

# Regenerate one agent (e.g. after editing enrichments)
node scripts/generate-agent-skills.mjs --force --agent ai-agents/phase-1/auth-service-agent.md

# Validate
node scripts/validate-agent-skills.mjs       # manifest agents (917)
node scripts/validate-all-agent-skills.mjs   # deep check: sections, bullets, all agents with ## Skills
node scripts/validate-agents.mjs             # agent markdown structure
node scripts/test-golden-agents.mjs          # phase-critical golden agents
```

Legacy helpers (superseded by `generate-agent-skills.mjs` for content):

```powershell
node scripts/scaffold-agent-skills.mjs    # thin stubs only — prefer generate script
node scripts/insert-agent-skills.mjs      # insert ## Skills into agent md
```

## Legacy workflow skills

These remain for setup flows (not per-agent paired skills):

| Skill | Purpose |
|-------|---------|
| `stream-heaven-phase1-dev/` | Windows Phase 1 backend setup |
| `stream-heaven-phase2a-flutter/` | Flutter mobile shell setup |
| `stream-heaven-agent-golden-test/` | Golden agent validation |

## Usage

1. Load governance: `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`
2. Pick **basic** for focused single-agent work; **advanced** for cross-domain / production orchestration
3. Open the agent path from the skill's **Agent** section and use its Prompt Template
