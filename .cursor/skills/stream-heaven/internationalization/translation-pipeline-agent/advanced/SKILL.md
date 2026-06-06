---
name: stream-heaven-internationalization-translation-pipeline-agent-advanced
description: >-
  Advanced Cursor skill for Stream Heaven Translation Pipeline (phase 20).
  Multi-agent orchestration, ADRs, and production-grade validation.
---

# Translation Pipeline — Advanced

## When to use

- User invokes **Translation Pipeline** or work in **internationalization** (phase 20)
- Cross-domain features, production readiness, or multi-chat orchestration

## Agent

- **Path:** `ai-agents/internationalization/translation-pipeline-agent.md`
- **Role:** Translation Pipeline Agent specialist for Stream Heaven's internationalization domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (advanced)

- Coordinate handoffs via `ai-agents/orchestration/task-router.md` and `quality-gate.md`
- Cross-check ## Dependencies before multi-service changes
- Produce ADR draft using `docs/adr/SH-000-template.md` when architecture forks
- Run golden + deep validation: `node scripts/test-golden-agents.mjs` and `node scripts/validate-all-agent-skills.mjs`
- Enrich agent Responsibilities if still boilerplate — use `ai-agents/phase-1/auth-service-agent.md` as quality bar

## Role-specific skills (advanced)

### Behavioral Science & Ethics
Balance:
- Design and implement internationalization capabilities for Stream Heaven. (Translation Pipeline scope)
- addiction-risk-agent reviews for dopamine loops
- transparent limits on infinite scroll nudges
- parental and minor protection UX patterns
- ethical personalization without manipulation
- regional cultural sensitivity in engagement tactics

### Creator Psychology UX
Support:
- go-live confidence builders for first-time hosts
- earnings visibility without anxiety-inducing comparisons
- moderation feedback loops that educate creators
- burnout detection signals in creator dashboards
- community reputation surfacing for trust
- Follow platform-governance standards for all outputs.

### Cross-App Experience Coherence
Unify:
- design-system tokens across Social, Livestream, Astro, OTT
- shared navigation mental models in mobile shell
- wallet and profile UX consistency
- notification tone and branding alignment
- deep link landing experiences per app
- Coordinate with dependent agents and shared packages.

### Personalization UX
Tailor:
- explainable recommendations UI snippets
- user controls for interest tuning and resets
- regional content prioritization without filter bubbles
- new user vs power user layout adaptations
- session satisfaction surveys with low friction

### Accessibility Excellence
Include:
- WCAG-aligned contrast and touch targets
- screen reader labels for live and feed interactions
- reduced motion and high-contrast modes
- voice navigation experiments for hands-busy users
- accessibility regression in CI checklists

### Production Validation
Validate:
- usability test gates before GA features
- quantitative UX metric dashboards
- heatmap and scroll depth analysis on key screens
- support ticket taxonomy linked to UX changes
- rollback criteria for negative retention experiments

### Multi-Agent Orchestration
Coordinate:
- design-tokens-architect for visual consistency
- growth-ai agents for experiment allocation
- flutter-architect for implementation feasibility
- ux-research-lead for study design review
- ADR for major navigation architecture changes

### Attention Economy Strategy
Govern:
- session length healthy bounds per app
- break reminders for extended live viewing
- quality-time metrics vs raw dwell time
- founder-war-room reporting on engagement ethics
- platform-governance alignment on feature-approval

## Key paths

| Resource | Path |
|----------|------|
| Master prompt | `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` |
| Agent registry | `ai-agents/AGENT-REGISTRY.md` |
| Shared contracts | `packages/shared-contracts/` |
| Validate agents | `node scripts/validate-agents.mjs` |
| Validate skills | `node scripts/validate-agent-skills.mjs` |
| Deep skill check | `node scripts/validate-all-agent-skills.mjs` |

## Validation

```powershell
node scripts/validate-agents.mjs
node scripts/validate-agent-skills.mjs
node scripts/validate-all-agent-skills.mjs
node scripts/test-golden-agents.mjs
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/internationalization/translation-pipeline-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/internationalization/translation-pipeline-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
