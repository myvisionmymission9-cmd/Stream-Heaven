# Stream Heaven Agent Registry

> Master catalog of all AI agents organized by phase, domain, and purpose.
> Generated: 2026-05-29 (gap-fill pass)

## Naming Policy (Dual Naming)

**Decision (2026-05-29):** Keep all existing generator-named agent files unchanged. Add **spec-named** agents as **new files** (no symlinks on Windows). Use `AGENT-REGISTRY.md` alias table to map spec ↔ legacy disk paths. Prefer spec names in new docs and contracts; legacy names remain valid for existing chats.

### Alias Table (spec → legacy → spec path)

| Spec name | Legacy / generator path | Spec path |
|-----------|-------------------------|-----------|
| livestream-agent | `apps/livestream-app/agents/core/livestream-architect.md` | `apps/livestream-app/agents/core/livestream-agent.md` |
| audio-room-agent | `(new spec)` | `apps/livestream-app/agents/core/audio-room-agent.md` |
| creator-monetization-agent | `(new spec)` | `apps/livestream-app/agents/core/creator-monetization-agent.md` |
| livestream-scaling-agent | `(new spec)` | `apps/livestream-app/agents/core/livestream-scaling-agent.md` |
| live-comment-agent | `(new spec)` | `apps/livestream-app/agents/video-systems/live-comment-agent.md` |
| live-reaction-agent | `(new spec)` | `apps/livestream-app/agents/video-systems/live-reaction-agent.md` |
| low-latency-stream-agent | `(new spec)` | `apps/livestream-app/agents/video-systems/low-latency-stream-agent.md` |
| seat-management-agent | `co-host-manager.md (partial)` | `apps/livestream-app/agents/multi-guest/seat-management-agent.md` |
| guest-request-agent | `guest-invite-agent.md` | `apps/livestream-app/agents/multi-guest/guest-request-agent.md` |
| live-stage-agent | `layout-compositor.md (partial)` | `apps/livestream-app/agents/multi-guest/live-stage-agent.md` |
| pk-tournament-agent | `pk-battle-agent.md (partial)` | `apps/livestream-app/agents/operations/pk-tournament-agent.md` |
| livestream-battle-agent | `pk-battle-agent.md` | `apps/livestream-app/agents/operations/livestream-battle-agent.md` |
| high-spender-agent | `whale-retention-agent.md (partial)` | `apps/livestream-app/agents/economy-psychology/high-spender-agent.md` |
| gift-conversion-agent | `gift-trigger-psychology.md (partial)` | `apps/livestream-app/agents/economy-psychology/gift-conversion-agent.md` |
| vip-retention-agent | `whale-retention-agent.md` | `apps/livestream-app/agents/economy-psychology/vip-retention-agent.md` |
| social-feed-agent | `feed-architect.md` | `apps/social-app/agents/social-feed-agent.md` |
| follow-system-agent | `follow-graph-manager.md` | `apps/social-app/agents/follow-system-agent.md` |
| gift-trigger-agent | `gift-trigger-psychology.md (live)` | `ai-agents/gift-effects/rendering/gift-trigger-agent.md` |
| gift-animation-agent | `gift-animation-renderer.md` | `ai-agents/gift-effects/rendering/gift-animation-agent.md` |
| gift-rendering-agent | `gift-animation-renderer.md` | `ai-agents/gift-effects/rendering/gift-rendering-agent.md` |
| particle-effects-agent | `particle-system-agent.md` | `ai-agents/gift-effects/fx/particle-effects-agent.md` |
| screen-overlay-agent | `fullscreen-overlay-agent.md` | `ai-agents/gift-effects/fx/screen-overlay-agent.md` |
| gift-sound-agent | `gift-sound-designer.md` | `ai-agents/gift-effects/audio/gift-sound-agent.md` |
| universal-user-agent | `unified-auth-agent.md` | `ai-agents/identity-platform/universal-user-agent.md` |
| single-sign-on-agent | `sso-federation-agent.md` | `ai-agents/identity-platform/single-sign-on-agent.md` |
| device-identity-agent | `device-trust-agent.md` | `ai-agents/identity-platform/device-identity-agent.md` |
| session-identity-agent | `session-manager-agent.md` | `ai-agents/identity-platform/session-identity-agent.md` |
| identity-resolution-agent | `identity-graph-agent.md (partial)` | `ai-agents/identity-platform/identity-resolution-agent.md` |
| event-stream-agent | `event-bus-architect.md` | `ai-agents/event-system/event-stream-agent.md` |
| dead-letter-queue-agent | `dead-letter-handler.md` | `ai-agents/event-system/dead-letter-queue-agent.md` |
| memory-retrieval-agent | `memory-retrieval-agent.md (existing)` | `ai-agents/agent-memory/memory-retrieval-agent.md` |
| trust-safety-agent | `trust-safety-reviewer.md` | `ai-agents/safety/trust-safety-agent.md` |
| load-testing-agent | `load-test-agent.md` | `ai-agents/testing/load-testing-agent.md` |
| chaos-engineering-agent (testing) | `chaos-test-agent.md` | `ai-agents/testing/chaos-engineering-agent.md` |
| chaos-engineering-agent (reliability) | `chaos-engineer.md` | `ai-agents/core-engineering/reliability/chaos-engineering-agent.md` |
| aso-agent | `app-store-optimization-agent.md` | `ai-agents/store-growth/aso-agent.md` |
| design-token-sync-agent | `figma-sync-coordinator.md (partial)` | `ai-agents/core-engineering/frontend/design-token-sync-agent.md` |

## Quick Reference

| Metric | Count |
|--------|-------|
| Total Agents | 908 |
| Agents validated (script) | 908 |
| PASS / PARTIAL / FAIL | 213 / 695 / 0 |
| PASS rate | 23.5% |
| Agent skill pairs (manifest) | 22 agents × 2 tiers = 44 skills |
| Spec-named gap-fill (audit target) | 152 |
| Phases Covered | 0–1 (impl), 2–20 (+ Games add-on) |
| Domains | 54+ |
| Governance docs | 22 |
| Last audit | 2026-05-31 |

## How to Use

1. Find your phase and domain below
2. Open the agent `.md` file
3. Copy the **Prompt Template** section into a new Cursor chat
4. Prefix with `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
5. Run `node scripts/validate-agents.mjs` after bulk agent changes
6. For manifest agents, use paired skills: `.cursor/skills/stream-heaven/<domain>/<slug>/basic|advanced/SKILL.md` — validate with `node scripts/validate-agent-skills.mjs`
7. If a spec name differs from the generator filename, check **Spec Name Alias Table** below

## Spec Name Alias Table

> **Naming policy (2026-05-29):** Generator-named agents are retained. Spec-named agent files were added where gaps existed. Both may coexist; use this table to resolve spec ↔ on-disk paths.

| Spec / Search Name | On-Disk Path | Notes |
|--------------------|--------------|-------|
| livestream-agent | `apps/livestream-app/agents/core/livestream-agent.md` | Generator alternate: `livestream-architect.md` |
| livestream-architect | `apps/livestream-app/agents/core/livestream-architect.md` | Spec alternate: `livestream-agent.md` |
| streaming-quality-agent | `apps/livestream-app/agents/core/streaming-quality-agent.md` | Generator: `stream-quality-adaptor.md` |
| watch-session-agent | `apps/livestream-app/agents/video-systems/watch-session-agent.md` | Generator: `viewer-session-agent.md` |
| multi-host-agent | `apps/livestream-app/agents/core/multi-host-agent.md` | Generator: `co-host-manager.md` |
| multi-guest-layout-agent | `apps/livestream-app/agents/multi-guest/multi-guest-layout-agent.md` | Generator: `layout-compositor.md` |
| audio-mixer-agent | `apps/livestream-app/agents/multi-guest/audio-mixer-agent.md` | Generator: `audio-mix-coordinator.md` |
| guest-request-agent | `apps/livestream-app/agents/multi-guest/guest-request-agent.md` | Generator: `guest-invite-agent.md` |
| stream-moderation-agent | `apps/livestream-app/agents/core/stream-moderation-agent.md` | Generator: `ban-kick-moderator.md` |
| adaptive-streaming-agent | `apps/livestream-app/agents/video-systems/adaptive-streaming-agent.md` | Generator: `bitrate-adaptation-agent.md` |
| gift-conversion-agent | `apps/livestream-app/agents/economy-psychology/gift-conversion-agent.md` | Generator: `gift-trigger-psychology.md` |
| emotional-engagement-agent | `apps/livestream-app/agents/economy-psychology/emotional-engagement-agent.md` | Generator: `fomo-mechanics-designer.md` |
| gift-animation-agent | `ai-agents/gift-effects/rendering/gift-animation-agent.md` | Generator: `gift-animation-renderer.md` |
| gift-rendering-agent | `ai-agents/gift-effects/rendering/gift-rendering-agent.md` | Spec-named |
| particle-effects-agent | `ai-agents/gift-effects/fx/particle-effects-agent.md` | Generator: `particle-system-agent.md` |
| shader-effects-agent | `ai-agents/gift-effects/fx/shader-effects-agent.md` | Generator: `gpu-shader-specialist.md` |
| screen-overlay-agent | `ai-agents/gift-effects/fx/screen-overlay-agent.md` | Generator: `fullscreen-overlay-agent.md` |
| gift-priority-agent | `ai-agents/gift-effects/rendering/gift-priority-agent.md` | Generator: `gift-queue-manager.md` |
| gift-sync-agent | `ai-agents/gift-effects/rendering/gift-sync-agent.md` | Generator: `combo-effect-chainer.md` |
| gift-sound-effect-agent | `ai-agents/gift-effects/audio/gift-sound-effect-agent.md` | Generator: `gift-sound-designer.md` |
| live-audio-mixer-agent | `ai-agents/gift-effects/audio/live-audio-mixer-agent.md` | Generator: `audio-mix-priority-agent.md` |
| universal-user-agent | `ai-agents/identity-platform/universal-user-agent.md` | Generator: `unified-auth-agent.md` |
| single-sign-on-agent | `ai-agents/identity-platform/single-sign-on-agent.md` | Generator: `sso-federation-agent.md` |
| device-identity-agent | `ai-agents/identity-platform/device-identity-agent.md` | Generator: `device-trust-agent.md` |
| session-identity-agent | `ai-agents/identity-platform/session-identity-agent.md` | Generator: `session-manager-agent.md` |
| identity-resolution-agent | `ai-agents/identity-platform/identity-resolution-agent.md` | Generator: `identity-graph-agent.md` |
| cross-app-profile-agent | `ai-agents/identity-platform/cross-app-profile-agent.md` | Spec-named |
| event-stream-agent | `ai-agents/event-system/event-stream-agent.md` | Generator: `event-bus-architect.md` |
| dead-letter-queue-agent | `ai-agents/event-system/dead-letter-queue-agent.md` | Generator: `dead-letter-handler.md` |
| context-memory-agent | `ai-agents/agent-memory/context-memory-agent.md` | Generator: `context-store-agent.md` |
| cross-agent-memory-agent | `ai-agents/agent-memory/cross-agent-memory-agent.md` | Generator: `cross-chat-sync-agent.md` |
| aso-agent | `ai-agents/store-growth/aso-agent.md` | Generator: `app-store-optimization-agent.md` |
| keyword-ranking-agent | `ai-agents/store-growth/keyword-ranking-agent.md` | Generator: `aso-keywords-agent.md` |
| trust-safety-agent | `ai-agents/safety/trust-safety-agent.md` | Generator: `trust-safety-reviewer.md` |
| content-policy-agent | `ai-agents/safety/content-policy-agent.md` | Generator: `content-safety-agent.md` |
| ai-moderation-agent | `ai-agents/safety/ai-moderation-agent.md` | Related: `harassment-detection-agent.md` |
| end-to-end-testing-agent | `ai-agents/testing/end-to-end-testing-agent.md` | Generator: `e2e-test-architect.md` |
| load-testing-agent | `ai-agents/testing/load-testing-agent.md` | Generator: `load-test-agent.md` |
| chaos-engineering-agent | `ai-agents/testing/chaos-engineering-agent.md` | Generator: `chaos-test-agent.md` |
| integration-testing-agent | `ai-agents/testing/integration-testing-agent.md` | Generator: `integration-smoke-test-agent.md` |
| design-token-sync-agent | `ai-agents/core-engineering/design-token-sync-agent.md` | Related: `figma-sync-coordinator.md` |
| queue-processing-agent | `ai-agents/core-engineering/queue-processing-agent.md` | Spec-named Phase 5 |
| autoscaling-agent | `ai-agents/core-engineering/autoscaling-agent.md` | Spec-named Phase 5 |

*Full alias source:* `scripts/agent-spec-aliases.mjs` · *Gap definitions:* `scripts/agent-gap-definitions.mjs` · *Audit report:* `docs/AGENT-COMPLETENESS-REPORT.md`

## Tech Stack (All Agents)

- **Frontend:** Flutter (Riverpod, GoRouter)
- **Backend:** Node.js, NestJS
- **Database:** PostgreSQL, Redis
- **Realtime:** Socket.IO
- **Streaming:** Agora SDK / Zego SDK
- **Storage:** AWS S3, CDN: Cloudflare
- **Auth:** Firebase Auth, OTP
- **Hosting:** AWS
- **Languages:** English, Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, Marathi, Punjabi

---

## Phase 0 — Meta QA (Agent System)

| Agent | Path | Purpose |
|-------|------|--------|
| Agent Registry Auditor | `ai-agents/meta/agent-registry-auditor-agent.md` | Audits AGENT-REGISTRY completeness vs filesystem |
| Agent Skill Validator | `ai-agents/meta/agent-skill-validator-agent.md` | Runs and interprets `scripts/validate-agents.mjs` |
| Agent Coverage Analyst | `ai-agents/meta/agent-coverage-analyst-agent.md` | Finds gaps and overlaps across agent domains |
| Agent Prompt Tester | `ai-agents/meta/agent-prompt-tester-agent.md` | Samples agents for domain-specific prompt quality |
| Agent Onboarding Agent | `ai-agents/meta/agent-onboarding-agent.md` | Onboards new agents into registry and validation |

## Phase 1 — Governance + Foundation

### Governance (platform-governance/)

| Agent | Path | Purpose |
|-------|------|--------|
| Governance Compliance Agent | `ai-agents/governance/governance-compliance-agent.md` | Enforces 22 governance docs before implementation |

**Governance docs:** `platform-governance/` (22 files) · Master prompt: `MASTER-AI-OPERATING-SYSTEM.md`  
**Skills:** `.cursor/skills/stream-heaven/governance/governance-compliance-agent/{basic,advanced}/`

### Foundation Implementation

| Agent | Path | Purpose |
|-------|------|--------|
| Auth Service Agent | `ai-agents/phase-1/auth-service-agent.md` | Firebase + OTP NestJS auth-service bootstrap |
| Profile Service Agent | `ai-agents/phase-1/profile-service-agent.md` | user-service profiles, preferences, cross-app identity |
| API Gateway Bootstrap Agent | `ai-agents/phase-1/api-gateway-bootstrap-agent.md` | api-gateway routing, JWT validation, rate limits |
| Phase 1 Remediation Agent | `ai-agents/phase-1/phase-1-remediation-agent.md` | Audit fixes, test/lint deps, Docker/setup, smoke tests |
| Phase 1 Autonomous Completion Agent | `ai-agents/phase-1/phase-1-autonomous-completion-agent.md` | Finish all Phase 1 runtime, gaps, docs without user involvement |
| Phase 1 Service Bootstrap Agent | `ai-agents/phase-1/phase-1-service-bootstrap-agent.md` | Start Docker + NestJS services, health wait, smoke — zero user involvement |
| Local Dev Bootstrap Agent | `ai-agents/meta/local-dev-bootstrap-agent.md` | Windows Phase 1–2a setup scripts and troubleshooting |
| GitHub Repo Bootstrap Agent | `ai-agents/meta/github-repo-bootstrap-agent.md` | git/gh verify, init, secret scan, gh repo create, push only on explicit request |
| GitHub Repo Bootstrap Autonomous Agent | `ai-agents/meta/github-repo-bootstrap-autonomous-agent.md` | Headless token auth, `github-bootstrap-autonomous.ps1`, init/link/push with zero user involvement |
| D-Drive Dev Bootstrap Agent | `ai-agents/meta/d-drive-dev-bootstrap-agent.md` | D-drive Git/gh/repo migration, WORKFLOW.md, Phase 1 from D path |
| D-Drive Project Bootstrap Agent | `ai-agents/meta/d-drive-project-bootstrap-agent.md` | Copy-only Desktop→D sync, C: space tips, path fixes, never delete source |
| Daily Dev Start Agent | `ai-agents/meta/daily-dev-start-agent.md` | One-command daily startup via scripts/start-dev-d-drive.ps1 |
| Integration Smoke Test Agent | `ai-agents/testing/integration-smoke-test-agent.md` | OTP → JWT → profile smoke suite |

## Phase 2a — Flutter Mobile Shell

| Agent | Path | Purpose |
|-------|------|--------|
| Flutter Mobile Shell Agent | `ai-agents/phase-2a/flutter-mobile-shell-agent.md` | apps/mobile OTP login, profile, GoRouter, gateway integration |
| Phase 2a Autonomous Bootstrap Agent | `ai-agents/phase-2a/phase-2a-autonomous-bootstrap-agent.md` | Phase 1 health + setup-phase2a + flutter analyze/test; `pnpm run phase2a:start` |
| Flutter Architect | `ai-agents/core-engineering/frontend/flutter-architect.md` | Flutter app structure and four-app ecosystem |
| Riverpod Specialist | `ai-agents/core-engineering/frontend/riverpod-specialist.md` | Riverpod state for mobile features |
| Routing Specialist | `ai-agents/core-engineering/frontend/routing-specialist.md` | GoRouter navigation |

**Cursor skills (setup):** `.cursor/skills/stream-heaven-phase1-dev/`, `stream-heaven-phase2a-flutter/`, `stream-heaven-agent-golden-test/`  
**Cursor skills (per-agent):** `.cursor/skills/stream-heaven/` — basic + advanced tiers; see `scripts/agent-skill-manifest.mjs`  
**Guide:** `docs/PHASE-2A-FLUTTER-GUIDE.md`

**Master prompt:** `platform-governance/MASTER-AI-OPERATING-SYSTEM.md`  
**Multi-chat guide:** `docs/MULTI-CHAT-EXECUTION-GUIDE.md`

---

## Phase 2

### Executive

| Agent | Path | Purpose |
|-------|------|--------|
| Ceo Strategic Advisor | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/executive/ceo-strategic-advisor.md` | Ceo Strategic Advisor specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cto Platform Advisor | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/executive/cto-platform-advisor.md` | Cto Platform Advisor specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cpo Product Advisor | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/executive/cpo-product-advisor.md` | Cpo Product Advisor specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cfo Finance Advisor | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/executive/cfo-finance-advisor.md` | Cfo Finance Advisor specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem |
| Coo Operations Advisor | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/executive/coo-operations-advisor.md` | Coo Operations Advisor specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem |
| Chief Architect | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/executive/chief-architect.md` | Chief Architect specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem |
| Chief Growth Officer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/executive/chief-growth-officer.md` | Chief Growth Officer specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem |
| Chief Safety Officer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/executive/chief-safety-officer.md` | Chief Safety Officer specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem |
| Board Reporting Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/executive/board-reporting-agent.md` | Board Reporting Agent specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem |
| Okr Tracker | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/executive/okr-tracker.md` | Okr Tracker specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem |
| Resource Allocator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/executive/resource-allocator.md` | Resource Allocator specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem |
| Vision Keeper | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/executive/vision-keeper.md` | Vision Keeper specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem |
| Strategy Planner | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/executive/strategy-planner.md` | Strategy Planner specialist for Stream Heaven's executive domain, ensuring alignment with platform governance and the four-app ecosystem |

### Phase 2 — autonomous delivery

| Agent | Path | Purpose |
|-------|------|--------|
| Phase 2 Autonomous Completion Agent | `ai-agents/phase-2/phase-2-autonomous-completion-agent.md` | Complete Phase 2 contracts, services, gateway, mobile stubs, and validation gates without user handholding |

## Phase 3

### Master Brain

| Agent | Path | Purpose |
|-------|------|--------|
| Platform Orchestrator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/master-brain/platform-orchestrator.md` | Platform Orchestrator specialist for Stream Heaven's master brain domain, ensuring alignment with platform governance and the four-app ecosystem |
| Decision Engine | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/master-brain/decision-engine.md` | Decision Engine specialist for Stream Heaven's master brain domain, ensuring alignment with platform governance and the four-app ecosystem |
| Context Synthesizer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/master-brain/context-synthesizer.md` | Context Synthesizer specialist for Stream Heaven's master brain domain, ensuring alignment with platform governance and the four-app ecosystem |
| Knowledge Router | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/master-brain/knowledge-router.md` | Knowledge Router specialist for Stream Heaven's master brain domain, ensuring alignment with platform governance and the four-app ecosystem |
| Priority Resolver | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/master-brain/priority-resolver.md` | Priority Resolver specialist for Stream Heaven's master brain domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cross Domain Coordinator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/master-brain/cross-domain-coordinator.md` | Cross Domain Coordinator specialist for Stream Heaven's master brain domain, ensuring alignment with platform governance and the four-app ecosystem |
| Master Planner | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/master-brain/master-planner.md` | Master Planner specialist for Stream Heaven's master brain domain, ensuring alignment with platform governance and the four-app ecosystem |

## Phase 4

### Orchestration

| Agent | Path | Purpose |
|-------|------|--------|
| Task Router | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/orchestration/task-router.md` | Task Router specialist for Stream Heaven's orchestration domain, ensuring alignment with platform governance and the four-app ecosystem |
| Workflow Engine | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/orchestration/workflow-engine.md` | Workflow Engine specialist for Stream Heaven's orchestration domain, ensuring alignment with platform governance and the four-app ecosystem |
| Agent Scheduler | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/orchestration/agent-scheduler.md` | Agent Scheduler specialist for Stream Heaven's orchestration domain, ensuring alignment with platform governance and the four-app ecosystem |
| Dependency Resolver | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/orchestration/dependency-resolver.md` | Dependency Resolver specialist for Stream Heaven's orchestration domain, ensuring alignment with platform governance and the four-app ecosystem |
| Pipeline Builder | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/orchestration/pipeline-builder.md` | Pipeline Builder specialist for Stream Heaven's orchestration domain, ensuring alignment with platform governance and the four-app ecosystem |
| Chat Coordinator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/orchestration/chat-coordinator.md` | Chat Coordinator specialist for Stream Heaven's orchestration domain, ensuring alignment with platform governance and the four-app ecosystem |
| Handoff Manager | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/orchestration/handoff-manager.md` | Handoff Manager specialist for Stream Heaven's orchestration domain, ensuring alignment with platform governance and the four-app ecosystem |
| Quality Gate | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/orchestration/quality-gate.md` | Quality Gate specialist for Stream Heaven's orchestration domain, ensuring alignment with platform governance and the four-app ecosystem |
| Rollback Coordinator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/orchestration/rollback-coordinator.md` | Rollback Coordinator specialist for Stream Heaven's orchestration domain, ensuring alignment with platform governance and the four-app ecosystem |

## Phase 5

### Backend

| Agent | Path | Purpose |
|-------|------|--------|
| Nestjs Architect | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/backend/nestjs-architect.md` | Nestjs Architect specialist for Stream Heaven's backend domain, ensuring alignment with platform governance and the four-app ecosystem |
| Microservice Designer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/backend/microservice-designer.md` | Microservice Designer specialist for Stream Heaven's backend domain, ensuring alignment with platform governance and the four-app ecosystem |
| Api Contract Author | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/backend/api-contract-author.md` | Api Contract Author specialist for Stream Heaven's backend domain, ensuring alignment with platform governance and the four-app ecosystem |
| Graphql Rest Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/backend/graphql-rest-specialist.md` | Graphql Rest Specialist specialist for Stream Heaven's backend domain, ensuring alignment with platform governance and the four-app ecosystem |
| Middleware Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/backend/middleware-specialist.md` | Middleware Specialist specialist for Stream Heaven's backend domain, ensuring alignment with platform governance and the four-app ecosystem |
| Service Mesh Coordinator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/backend/service-mesh-coordinator.md` | Service Mesh Coordinator specialist for Stream Heaven's backend domain, ensuring alignment with platform governance and the four-app ecosystem |

### Database

| Agent | Path | Purpose |
|-------|------|--------|
| Postgres Architect | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/database/postgres-architect.md` | Postgres Architect specialist for Stream Heaven's database domain, ensuring alignment with platform governance and the four-app ecosystem |
| Redis Cache Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/database/redis-cache-specialist.md` | Redis Cache Specialist specialist for Stream Heaven's database domain, ensuring alignment with platform governance and the four-app ecosystem |
| Migration Manager | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/database/migration-manager.md` | Migration Manager specialist for Stream Heaven's database domain, ensuring alignment with platform governance and the four-app ecosystem |
| Query Optimizer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/database/query-optimizer.md` | Query Optimizer specialist for Stream Heaven's database domain, ensuring alignment with platform governance and the four-app ecosystem |
| Data Modeling Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/database/data-modeling-specialist.md` | Data Modeling Specialist specialist for Stream Heaven's database domain, ensuring alignment with platform governance and the four-app ecosystem |

### Frontend

| Agent | Path | Purpose |
|-------|------|--------|
| Flutter Architect | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/frontend/flutter-architect.md` | Flutter Architect specialist for Stream Heaven's frontend domain, ensuring alignment with platform governance and the four-app ecosystem |
| Riverpod Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/frontend/riverpod-specialist.md` | Riverpod Specialist specialist for Stream Heaven's frontend domain, ensuring alignment with platform governance and the four-app ecosystem |
| Routing Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/frontend/routing-specialist.md` | Routing Specialist specialist for Stream Heaven's frontend domain, ensuring alignment with platform governance and the four-app ecosystem |
| Performance Optimizer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/frontend/performance-optimizer.md` | Performance Optimizer specialist for Stream Heaven's frontend domain, ensuring alignment with platform governance and the four-app ecosystem |
| Widget Library Curator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/frontend/widget-library-curator.md` | Widget Library Curator specialist for Stream Heaven's frontend domain, ensuring alignment with platform governance and the four-app ecosystem |
| Platform Channel Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/frontend/platform-channel-specialist.md` | Platform Channel Specialist specialist for Stream Heaven's frontend domain, ensuring alignment with platform governance and the four-app ecosystem |

### Infrastructure

| Agent | Path | Purpose |
|-------|------|--------|
| Aws Architect | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/infrastructure/aws-architect.md` | Aws Architect specialist for Stream Heaven's infrastructure domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cloudflare Cdn Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/infrastructure/cloudflare-cdn-specialist.md` | Cloudflare Cdn Specialist specialist for Stream Heaven's infrastructure domain, ensuring alignment with platform governance and the four-app ecosystem |
| K8s Operator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/infrastructure/k8s-operator.md` | K8s Operator specialist for Stream Heaven's infrastructure domain, ensuring alignment with platform governance and the four-app ecosystem |
| Terraform Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/infrastructure/terraform-specialist.md` | Terraform Specialist specialist for Stream Heaven's infrastructure domain, ensuring alignment with platform governance and the four-app ecosystem |
| Observability Engineer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/infrastructure/observability-engineer.md` | Observability Engineer specialist for Stream Heaven's infrastructure domain, ensuring alignment with platform governance and the four-app ecosystem |

### Realtime

| Agent | Path | Purpose |
|-------|------|--------|
| Socketio Architect | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/realtime/socketio-architect.md` | Socketio Architect specialist for Stream Heaven's realtime domain, ensuring alignment with platform governance and the four-app ecosystem |
| Presence Manager | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/realtime/presence-manager.md` | Presence Manager specialist for Stream Heaven's realtime domain, ensuring alignment with platform governance and the four-app ecosystem |
| Room Coordinator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/realtime/room-coordinator.md` | Room Coordinator specialist for Stream Heaven's realtime domain, ensuring alignment with platform governance and the four-app ecosystem |
| Websocket Scaler | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/realtime/websocket-scaler.md` | Websocket Scaler specialist for Stream Heaven's realtime domain, ensuring alignment with platform governance and the four-app ecosystem |
| Event Broadcaster | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/realtime/event-broadcaster.md` | Event Broadcaster specialist for Stream Heaven's realtime domain, ensuring alignment with platform governance and the four-app ecosystem |

### Reliability

| Agent | Path | Purpose |
|-------|------|--------|
| Sre Lead | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/reliability/sre-lead.md` | Sre Lead specialist for Stream Heaven's reliability domain, ensuring alignment with platform governance and the four-app ecosystem |
| Chaos Engineer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/reliability/chaos-engineer.md` | Chaos Engineer specialist for Stream Heaven's reliability domain, ensuring alignment with platform governance and the four-app ecosystem |
| Incident Responder | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/reliability/incident-responder.md` | Incident Responder specialist for Stream Heaven's reliability domain, ensuring alignment with platform governance and the four-app ecosystem |
| Sla Monitor | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/reliability/sla-monitor.md` | Sla Monitor specialist for Stream Heaven's reliability domain, ensuring alignment with platform governance and the four-app ecosystem |
| Capacity Planner | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/core-engineering/reliability/capacity-planner.md` | Capacity Planner specialist for Stream Heaven's reliability domain, ensuring alignment with platform governance and the four-app ecosystem |

## Phase 6

### Design System

| Agent | Path | Purpose |
|-------|------|--------|
| Design Tokens Architect | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/design-system/design-tokens-architect.md` | Design Tokens Architect specialist for Stream Heaven's design system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Component Library Lead | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/design-system/component-library-lead.md` | Component Library Lead specialist for Stream Heaven's design system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Typography Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/design-system/typography-specialist.md` | Typography Specialist specialist for Stream Heaven's design system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Color System Curator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/design-system/color-system-curator.md` | Color System Curator specialist for Stream Heaven's design system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Iconography Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/design-system/iconography-specialist.md` | Iconography Specialist specialist for Stream Heaven's design system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Motion Design Lead | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/design-system/motion-design-lead.md` | Motion Design Lead specialist for Stream Heaven's design system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Accessibility Auditor | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/design-system/accessibility-auditor.md` | Accessibility Auditor specialist for Stream Heaven's design system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Dark Mode Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/design-system/dark-mode-specialist.md` | Dark Mode Specialist specialist for Stream Heaven's design system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Localization Ui Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/design-system/localization-ui-specialist.md` | Localization Ui Specialist specialist for Stream Heaven's design system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Responsive Layout Architect | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/design-system/responsive-layout-architect.md` | Responsive Layout Architect specialist for Stream Heaven's design system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Brand Consistency Guardian | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/design-system/brand-consistency-guardian.md` | Brand Consistency Guardian specialist for Stream Heaven's design system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Figma Sync Coordinator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/design-system/figma-sync-coordinator.md` | Figma Sync Coordinator specialist for Stream Heaven's design system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Design Qa Reviewer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/design-system/design-qa-reviewer.md` | Design Qa Reviewer specialist for Stream Heaven's design system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Flutter Theme Engineer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/design-system/flutter-theme-engineer.md` | Flutter Theme Engineer specialist for Stream Heaven's design system domain, ensuring alignment with platform governance and the four-app ecosystem |

## Phase 7

### User Experience Intelligence

| Agent | Path | Purpose |
|-------|------|--------|
| Ux Research Lead | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/user-experience-intelligence/ux-research-lead.md` | Ux Research Lead specialist for Stream Heaven's user experience intelligence domain, ensuring alignment with platform governance and the four-app ecosystem |
| Behavioral Analyst | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/user-experience-intelligence/behavioral-analyst.md` | Behavioral Analyst specialist for Stream Heaven's user experience intelligence domain, ensuring alignment with platform governance and the four-app ecosystem |
| Funnel Optimizer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/user-experience-intelligence/funnel-optimizer.md` | Funnel Optimizer specialist for Stream Heaven's user experience intelligence domain, ensuring alignment with platform governance and the four-app ecosystem |
| Onboarding Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/user-experience-intelligence/onboarding-specialist.md` | Onboarding Specialist specialist for Stream Heaven's user experience intelligence domain, ensuring alignment with platform governance and the four-app ecosystem |
| Retention Strategist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/user-experience-intelligence/retention-strategist.md` | Retention Strategist specialist for Stream Heaven's user experience intelligence domain, ensuring alignment with platform governance and the four-app ecosystem |
| Personalization Engine | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/user-experience-intelligence/personalization-engine.md` | Personalization Engine specialist for Stream Heaven's user experience intelligence domain, ensuring alignment with platform governance and the four-app ecosystem |
| Journey Mapper | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/user-experience-intelligence/journey-mapper.md` | Journey Mapper specialist for Stream Heaven's user experience intelligence domain, ensuring alignment with platform governance and the four-app ecosystem |
| Heatmap Analyst | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/user-experience-intelligence/heatmap-analyst.md` | Heatmap Analyst specialist for Stream Heaven's user experience intelligence domain, ensuring alignment with platform governance and the four-app ecosystem |
| Nudge Designer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/user-experience-intelligence/nudge-designer.md` | Nudge Designer specialist for Stream Heaven's user experience intelligence domain, ensuring alignment with platform governance and the four-app ecosystem |
| Accessibility Ux Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/user-experience-intelligence/accessibility-ux-specialist.md` | Accessibility Ux Specialist specialist for Stream Heaven's user experience intelligence domain, ensuring alignment with platform governance and the four-app ecosystem |
| Low Bandwidth Ux Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/user-experience-intelligence/low-bandwidth-ux-specialist.md` | Low Bandwidth Ux Specialist specialist for Stream Heaven's user experience intelligence domain, ensuring alignment with platform governance and the four-app ecosystem |
| Regional Ux Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/user-experience-intelligence/regional-ux-specialist.md` | Regional Ux Specialist specialist for Stream Heaven's user experience intelligence domain, ensuring alignment with platform governance and the four-app ecosystem |
| Ux Experiment Designer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/user-experience-intelligence/ux-experiment-designer.md` | Ux Experiment Designer specialist for Stream Heaven's user experience intelligence domain, ensuring alignment with platform governance and the four-app ecosystem |

## Phase 8

### Social App

| Agent | Path | Purpose |
|-------|------|--------|
| Feed Architect | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/feed-architect.md` | Feed Architect specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Story System Designer | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/story-system-designer.md` | Story System Designer specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Reels Short Video Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/reels-short-video-agent.md` | Reels Short Video Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Comment Thread Specialist | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/comment-thread-specialist.md` | Comment Thread Specialist specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Reaction System Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/reaction-system-agent.md` | Reaction System Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Follow Graph Manager | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/follow-graph-manager.md` | Follow Graph Manager specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Profile Page Designer | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/profile-page-designer.md` | Profile Page Designer specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Dm Messaging Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/dm-messaging-agent.md` | Dm Messaging Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Group Chat Coordinator | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/group-chat-coordinator.md` | Group Chat Coordinator specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Community Moderator Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/community-moderator-agent.md` | Community Moderator Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Hashtag Trending Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/hashtag-trending-agent.md` | Hashtag Trending Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Mention Notification Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/mention-notification-agent.md` | Mention Notification Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Content Discovery Engine | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/content-discovery-engine.md` | Content Discovery Engine specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Social Graph Analyst | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/social-graph-analyst.md` | Social Graph Analyst specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Privacy Controls Specialist | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/privacy-controls-specialist.md` | Privacy Controls Specialist specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Block Report Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/block-report-agent.md` | Block Report Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Social Search Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/social-search-agent.md` | Social Search Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Share Deeplink Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/share-deeplink-agent.md` | Share Deeplink Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Social Notification Orchestrator | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/social-notification-orchestrator.md` | Social Notification Orchestrator specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Feed Ranking Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/feed-ranking-agent.md` | Feed Ranking Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Content Moderation Pipeline | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/content-moderation-pipeline.md` | Content Moderation Pipeline specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Social Analytics Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/social-analytics-agent.md` | Social Analytics Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Creator Profile Enhancer | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/creator-profile-enhancer.md` | Creator Profile Enhancer specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Social Onboarding Flow | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/social-onboarding-flow.md` | Social Onboarding Flow specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Social Settings Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/social-settings-agent.md` | Social Settings Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Social Api Integration | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/social-api-integration.md` | Social Api Integration specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Social Offline Sync Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/social-offline-sync-agent.md` | Social Offline Sync Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Social Accessibility Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/social-app/agents/social-accessibility-agent.md` | Social Accessibility Agent specialist for Stream Heaven's social app domain, ensuring alignment with platform governance and the four-app ecosystem |

## Phase 9

### Core

| Agent | Path | Purpose |
|-------|------|--------|
| Livestream Architect | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/core/livestream-architect.md` | Livestream Architect specialist for Stream Heaven's core domain, ensuring alignment with platform governance and the four-app ecosystem |
| Room Lifecycle Manager | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/core/room-lifecycle-manager.md` | Room Lifecycle Manager specialist for Stream Heaven's core domain, ensuring alignment with platform governance and the four-app ecosystem |
| Viewer Session Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/core/viewer-session-agent.md` | Viewer Session Agent specialist for Stream Heaven's core domain, ensuring alignment with platform governance and the four-app ecosystem |
| Stream Quality Adaptor | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/core/stream-quality-adaptor.md` | Stream Quality Adaptor specialist for Stream Heaven's core domain, ensuring alignment with platform governance and the four-app ecosystem |
| Livestream Navigation Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/core/livestream-navigation-agent.md` | Livestream Navigation Agent specialist for Stream Heaven's core domain, ensuring alignment with platform governance and the four-app ecosystem |
| Livestream Auth Guard | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/core/livestream-auth-guard.md` | Livestream Auth Guard specialist for Stream Heaven's core domain, ensuring alignment with platform governance and the four-app ecosystem |

### Economy Psychology

| Agent | Path | Purpose |
|-------|------|--------|
| Gift Trigger Psychology | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/economy-psychology/gift-trigger-psychology.md` | Gift Trigger Psychology specialist for Stream Heaven's economy psychology domain, ensuring alignment with platform governance and the four-app ecosystem |
| Whale Retention Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/economy-psychology/whale-retention-agent.md` | Whale Retention Agent specialist for Stream Heaven's economy psychology domain, ensuring alignment with platform governance and the four-app ecosystem |
| Fomo Mechanics Designer | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/economy-psychology/fomo-mechanics-designer.md` | Fomo Mechanics Designer specialist for Stream Heaven's economy psychology domain, ensuring alignment with platform governance and the four-app ecosystem |
| Tip Goal Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/economy-psychology/tip-goal-agent.md` | Tip Goal Agent specialist for Stream Heaven's economy psychology domain, ensuring alignment with platform governance and the four-app ecosystem |

### Multi Guest

| Agent | Path | Purpose |
|-------|------|--------|
| Co Host Manager | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/multi-guest/co-host-manager.md` | Co Host Manager specialist for Stream Heaven's multi guest domain, ensuring alignment with platform governance and the four-app ecosystem |
| Guest Invite Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/multi-guest/guest-invite-agent.md` | Guest Invite Agent specialist for Stream Heaven's multi guest domain, ensuring alignment with platform governance and the four-app ecosystem |
| Layout Compositor | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/multi-guest/layout-compositor.md` | Layout Compositor specialist for Stream Heaven's multi guest domain, ensuring alignment with platform governance and the four-app ecosystem |
| Audio Mix Coordinator | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/multi-guest/audio-mix-coordinator.md` | Audio Mix Coordinator specialist for Stream Heaven's multi guest domain, ensuring alignment with platform governance and the four-app ecosystem |
| Pk Battle Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/multi-guest/pk-battle-agent.md` | Pk Battle Agent specialist for Stream Heaven's multi guest domain, ensuring alignment with platform governance and the four-app ecosystem |

### Operations

| Agent | Path | Purpose |
|-------|------|--------|
| Stream Health Monitor | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/operations/stream-health-monitor.md` | Stream Health Monitor specialist for Stream Heaven's operations domain, ensuring alignment with platform governance and the four-app ecosystem |
| Live Ops Dashboard Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/operations/live-ops-dashboard-agent.md` | Live Ops Dashboard Agent specialist for Stream Heaven's operations domain, ensuring alignment with platform governance and the four-app ecosystem |
| Ban Kick Moderator | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/operations/ban-kick-moderator.md` | Ban Kick Moderator specialist for Stream Heaven's operations domain, ensuring alignment with platform governance and the four-app ecosystem |
| Stream Scheduling Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/operations/stream-scheduling-agent.md` | Stream Scheduling Agent specialist for Stream Heaven's operations domain, ensuring alignment with platform governance and the four-app ecosystem |

### Video Systems

| Agent | Path | Purpose |
|-------|------|--------|
| Agora Integration Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/video-systems/agora-integration-agent.md` | Agora Integration Agent specialist for Stream Heaven's video systems domain, ensuring alignment with platform governance and the four-app ecosystem |
| Zego Fallback Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/video-systems/zego-fallback-agent.md` | Zego Fallback Agent specialist for Stream Heaven's video systems domain, ensuring alignment with platform governance and the four-app ecosystem |
| Bitrate Adaptation Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/video-systems/bitrate-adaptation-agent.md` | Bitrate Adaptation Agent specialist for Stream Heaven's video systems domain, ensuring alignment with platform governance and the four-app ecosystem |
| Encoder Config Specialist | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/video-systems/encoder-config-specialist.md` | Encoder Config Specialist specialist for Stream Heaven's video systems domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cdn Stream Distributor | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/video-systems/cdn-stream-distributor.md` | Cdn Stream Distributor specialist for Stream Heaven's video systems domain, ensuring alignment with platform governance and the four-app ecosystem |
| Recording Playback Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/livestream-app/agents/video-systems/recording-playback-agent.md` | Recording Playback Agent specialist for Stream Heaven's video systems domain, ensuring alignment with platform governance and the four-app ecosystem |

### Games Platform (Add-on)

| Agent | Path | Purpose |
|-------|------|--------|
| Games Platform Architect | `ai-agents/games/games-platform-architect.md` | End-to-end games-service architecture, contracts, and Flutter embedding for BIGO-style casual games |
| Teen Patti Agent | `ai-agents/games/teen-patti-agent.md` | Indian Teen Patti rules engine, betting rounds, and livestream room integration |
| Ludo Agent | `ai-agents/games/ludo-agent.md` | Family-friendly Ludo board game with quick-match and private rooms |
| Rummy Agent | `ai-agents/games/rummy-agent.md` | 13-card Indian Rummy with server-side meld validation and tournaments |
| Carrom Agent | `ai-agents/games/carrom-agent.md` | Mobile Carrom with simplified server physics and touch aiming UI |
| Games Matchmaking Agent | `ai-agents/games/games-matchmaking-agent.md` | Redis-backed queues, skill buckets, and stake-tier table assignment |
| Games Economy Agent | `ai-agents/games/games-economy-agent.md` | Table stakes, rake, wallet settlements, and anti double-spend |
| Games Fair Play Agent | `ai-agents/games/games-fair-play-agent.md` | CSPRNG integrity, audit logs, collusion detection, and disputes |
| Games Socket Sync Agent | `ai-agents/games/games-socket-sync-agent.md` | Socket.IO game state sync, reconnect snapshots, and scaling |
| Games UI Agent | `ai-agents/games/games-ui-agent.md` | Game lobbies, in-game HUD, and livestream mini-player overlays |
| Games Leaderboard Agent | `ai-agents/games/games-leaderboard-agent.md` | Daily/weekly rankings, anti-farming, and share cards |
| Games Tournament Agent | `ai-agents/games/games-tournament-agent.md` | Scheduled brackets, prize pool escrow, and featured finals broadcast |

### Game Titles (12)

| Game | Agent | Path |
|------|-------|------|
| Teen Patti | Teen Patti Agent | `ai-agents/games/teen-patti-agent.md` |
| Luck77 | Luck77 Agent | `ai-agents/games/luck77-agent.md` |
| Greedy King | Greedy King Agent | `ai-agents/games/greedy-king-agent.md` |
| Roulette Pro | Roulette Pro Agent | `ai-agents/games/roulette-pro-agent.md` |
| Greedy Lion 2 | Greedy Lion2 Agent | `ai-agents/games/greedy-lion2-agent.md` |
| Slot777 | Slot777 Agent | `ai-agents/games/slot777-agent.md` |
| Lucky Stairs | Lucky Stairs Agent | `ai-agents/games/lucky-stairs-agent.md` |
| Royal Fishing | Royal Fishing Agent | `ai-agents/games/royal-fishing-agent.md` |
| Chicken Run | Chicken Run Agent | `ai-agents/games/chicken-run-agent.md` |
| Ludo | Ludo Agent | `ai-agents/games/ludo-agent.md` |
| Carrom2 | Carrom2 Agent | `ai-agents/games/carrom2-agent.md` |
| Crazy Fruit | Crazy Fruit Agent | `ai-agents/games/crazy-fruit-agent.md` |

*Also available:* `carrom-agent.md`, `rummy-agent.md` (extended catalog)

## Phase 10

### Audio

| Agent | Path | Purpose |
|-------|------|--------|
| Gift Sound Designer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/gift-effects/audio/gift-sound-designer.md` | Gift Sound Designer specialist for Stream Heaven's audio domain, ensuring alignment with platform governance and the four-app ecosystem |
| Audio Mix Priority Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/gift-effects/audio/audio-mix-priority-agent.md` | Audio Mix Priority Agent specialist for Stream Heaven's audio domain, ensuring alignment with platform governance and the four-app ecosystem |
| Haptic Feedback Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/gift-effects/audio/haptic-feedback-agent.md` | Haptic Feedback Agent specialist for Stream Heaven's audio domain, ensuring alignment with platform governance and the four-app ecosystem |

### Fx

| Agent | Path | Purpose |
|-------|------|--------|
| Combo Effect Chainer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/gift-effects/fx/combo-effect-chainer.md` | Combo Effect Chainer specialist for Stream Heaven's fx domain, ensuring alignment with platform governance and the four-app ecosystem |
| Fullscreen Overlay Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/gift-effects/fx/fullscreen-overlay-agent.md` | Fullscreen Overlay Agent specialist for Stream Heaven's fx domain, ensuring alignment with platform governance and the four-app ecosystem |
| Gift Queue Manager | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/gift-effects/fx/gift-queue-manager.md` | Gift Queue Manager specialist for Stream Heaven's fx domain, ensuring alignment with platform governance and the four-app ecosystem |
| Effect Budget Optimizer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/gift-effects/fx/effect-budget-optimizer.md` | Effect Budget Optimizer specialist for Stream Heaven's fx domain, ensuring alignment with platform governance and the four-app ecosystem |

### Rendering

| Agent | Path | Purpose |
|-------|------|--------|
| Gift Animation Renderer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/gift-effects/rendering/gift-animation-renderer.md` | Gift Animation Renderer specialist for Stream Heaven's rendering domain, ensuring alignment with platform governance and the four-app ecosystem |
| Particle System Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/gift-effects/rendering/particle-system-agent.md` | Particle System Agent specialist for Stream Heaven's rendering domain, ensuring alignment with platform governance and the four-app ecosystem |
| Lottie Gift Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/gift-effects/rendering/lottie-gift-agent.md` | Lottie Gift Agent specialist for Stream Heaven's rendering domain, ensuring alignment with platform governance and the four-app ecosystem |
| Gpu Shader Specialist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/gift-effects/rendering/gpu-shader-specialist.md` | Gpu Shader Specialist specialist for Stream Heaven's rendering domain, ensuring alignment with platform governance and the four-app ecosystem |

## Phase 11

### Cosmetics

| Agent | Path | Purpose |
|-------|------|--------|
| Avatar Frame Designer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/avatar-frame-designer.md` | Avatar Frame Designer specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Profile Badge Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/profile-badge-agent.md` | Profile Badge Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Chat Bubble Themer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/chat-bubble-themer.md` | Chat Bubble Themer specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Entrance Effect Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/entrance-effect-agent.md` | Entrance Effect Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Profile Skin Designer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/profile-skin-designer.md` | Profile Skin Designer specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Vip Tier Visual Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/vip-tier-visual-agent.md` | Vip Tier Visual Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Seasonal Cosmetic Curator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/seasonal-cosmetic-curator.md` | Seasonal Cosmetic Curator specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Rarity System | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-rarity-system.md` | Cosmetic Rarity System specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Preview Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-preview-agent.md` | Cosmetic Preview Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Shop Ui Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-shop-ui-agent.md` | Cosmetic Shop Ui Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Inventory Manager | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-inventory-manager.md` | Cosmetic Inventory Manager specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Gift Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-gift-agent.md` | Cosmetic Gift Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Animation Lead | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-animation-lead.md` | Cosmetic Animation Lead specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Asset Pipeline | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-asset-pipeline.md` | Cosmetic Asset Pipeline specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Pricing Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-pricing-agent.md` | Cosmetic Pricing Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Limited Drop Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-limited-drop-agent.md` | Cosmetic Limited Drop Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Collection Set Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-collection-set-agent.md` | Cosmetic Collection Set Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Trade Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-trade-agent.md` | Cosmetic Trade Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Audit Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-audit-agent.md` | Cosmetic Audit Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Localization Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-localization-agent.md` | Cosmetic Localization Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Performance Optimizer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-performance-optimizer.md` | Cosmetic Performance Optimizer specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Ab Test Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-ab-test-agent.md` | Cosmetic Ab Test Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Analytics Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-analytics-agent.md` | Cosmetic Analytics Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Api Designer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-api-designer.md` | Cosmetic Api Designer specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Moderation Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-moderation-agent.md` | Cosmetic Moderation Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Cross App Sync | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-cross-app-sync.md` | Cosmetic Cross App Sync specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Nft Bridge Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-nft-bridge-agent.md` | Cosmetic Nft Bridge Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cosmetic Accessibility Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cosmetics/cosmetic-accessibility-agent.md` | Cosmetic Accessibility Agent specialist for Stream Heaven's cosmetics domain, ensuring alignment with platform governance and the four-app ecosystem |

## Phase 12

### Creator Economy

| Agent | Path | Purpose |
|-------|------|--------|
| Creator Monetization Architect | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/creator-monetization-architect.md` | Creator Monetization Architect specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Subscription Tier Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/subscription-tier-agent.md` | Subscription Tier Agent specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Tip Jar Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/tip-jar-agent.md` | Tip Jar Agent specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Revenue Share Calculator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/revenue-share-calculator.md` | Revenue Share Calculator specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Creator Dashboard Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/creator-dashboard-agent.md` | Creator Dashboard Agent specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Payout Scheduler | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/payout-scheduler.md` | Payout Scheduler specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Tax Compliance Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/tax-compliance-agent.md` | Tax Compliance Agent specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Creator Verification Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/creator-verification-agent.md` | Creator Verification Agent specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Brand Deal Marketplace | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/brand-deal-marketplace.md` | Brand Deal Marketplace specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Sponsor Matching Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/sponsor-matching-agent.md` | Sponsor Matching Agent specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Creator Analytics Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/creator-analytics-agent.md` | Creator Analytics Agent specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Creator Support Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/creator-support-agent.md` | Creator Support Agent specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Creator Onboarding Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/creator-onboarding-agent.md` | Creator Onboarding Agent specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Creator Tier Progression | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/creator-tier-progression.md` | Creator Tier Progression specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Creator Contract Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/creator-contract-agent.md` | Creator Contract Agent specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Creator Dispute Resolver | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/creator-dispute-resolver.md` | Creator Dispute Resolver specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Creator Content Licensing | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/creator-content-licensing.md` | Creator Content Licensing specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Creator Collab Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/creator-collab-agent.md` | Creator Collab Agent specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Creator Retention Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/creator-economy/creator-retention-agent.md` | Creator Retention Agent specialist for Stream Heaven's creator economy domain, ensuring alignment with platform governance and the four-app ecosystem |

## Phase 13

### Economy

| Agent | Path | Purpose |
|-------|------|--------|
| Virtual Currency Architect | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/economy/virtual-currency-architect.md` | Virtual Currency Architect specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Wallet Ledger Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/economy/wallet-ledger-agent.md` | Wallet Ledger Agent specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Coin Pack Pricing Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/economy/coin-pack-pricing-agent.md` | Coin Pack Pricing Agent specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Iap Integration Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/economy/iap-integration-agent.md` | Iap Integration Agent specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Refund Policy Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/economy/refund-policy-agent.md` | Refund Policy Agent specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Fraud Detection Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/economy/fraud-detection-agent.md` | Fraud Detection Agent specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Economy Balance Simulator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/economy/economy-balance-simulator.md` | Economy Balance Simulator specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Inflation Control Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/economy/inflation-control-agent.md` | Inflation Control Agent specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Reward Distribution Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/economy/reward-distribution-agent.md` | Reward Distribution Agent specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Daily Bonus Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/economy/daily-bonus-agent.md` | Daily Bonus Agent specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Economy Audit Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/economy/economy-audit-agent.md` | Economy Audit Agent specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cross App Wallet Sync | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/economy/cross-app-wallet-sync.md` | Cross App Wallet Sync specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Economy Reporting Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/economy/economy-reporting-agent.md` | Economy Reporting Agent specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Promo Code Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/economy/promo-code-agent.md` | Promo Code Agent specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Economy Ab Test Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/economy/economy-ab-test-agent.md` | Economy Ab Test Agent specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem |
| Economy Compliance Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/economy/economy-compliance-agent.md` | Economy Compliance Agent specialist for Stream Heaven's economy domain, ensuring alignment with platform governance and the four-app ecosystem |

## Phase 14

### Data Science

| Agent | Path | Purpose |
|-------|------|--------|
| Recommendation Engine Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/data-science/recommendation-engine-agent.md` | Recommendation Engine Agent specialist for Stream Heaven's data science domain, ensuring alignment with platform governance and the four-app ecosystem |
| Churn Prediction Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/data-science/churn-prediction-agent.md` | Churn Prediction Agent specialist for Stream Heaven's data science domain, ensuring alignment with platform governance and the four-app ecosystem |
| Ltv Modeling Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/data-science/ltv-modeling-agent.md` | Ltv Modeling Agent specialist for Stream Heaven's data science domain, ensuring alignment with platform governance and the four-app ecosystem |
| Segmentation Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/data-science/segmentation-agent.md` | Segmentation Agent specialist for Stream Heaven's data science domain, ensuring alignment with platform governance and the four-app ecosystem |
| Anomaly Detection Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/data-science/anomaly-detection-agent.md` | Anomaly Detection Agent specialist for Stream Heaven's data science domain, ensuring alignment with platform governance and the four-app ecosystem |
| Ab Test Analyst | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/data-science/ab-test-analyst.md` | Ab Test Analyst specialist for Stream Heaven's data science domain, ensuring alignment with platform governance and the four-app ecosystem |
| Funnel Analytics Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/data-science/funnel-analytics-agent.md` | Funnel Analytics Agent specialist for Stream Heaven's data science domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cohort Analysis Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/data-science/cohort-analysis-agent.md` | Cohort Analysis Agent specialist for Stream Heaven's data science domain, ensuring alignment with platform governance and the four-app ecosystem |
| Feature Store Manager | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/data-science/feature-store-manager.md` | Feature Store Manager specialist for Stream Heaven's data science domain, ensuring alignment with platform governance and the four-app ecosystem |
| Ml Pipeline Architect | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/data-science/ml-pipeline-architect.md` | Ml Pipeline Architect specialist for Stream Heaven's data science domain, ensuring alignment with platform governance and the four-app ecosystem |
| Embedding Search Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/data-science/embedding-search-agent.md` | Embedding Search Agent specialist for Stream Heaven's data science domain, ensuring alignment with platform governance and the four-app ecosystem |
| Ranking Model Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/data-science/ranking-model-agent.md` | Ranking Model Agent specialist for Stream Heaven's data science domain, ensuring alignment with platform governance and the four-app ecosystem |
| Data Quality Guardian | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/data-science/data-quality-guardian.md` | Data Quality Guardian specialist for Stream Heaven's data science domain, ensuring alignment with platform governance and the four-app ecosystem |
| Experiment Platform Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/data-science/experiment-platform-agent.md` | Experiment Platform Agent specialist for Stream Heaven's data science domain, ensuring alignment with platform governance and the four-app ecosystem |

## Phase 15

### Growth Ai

| Agent | Path | Purpose |
|-------|------|--------|
| Acquisition Strategist | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/acquisition-strategist.md` | Acquisition Strategist specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Referral Program Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/referral-program-agent.md` | Referral Program Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Viral Loop Designer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/viral-loop-designer.md` | Viral Loop Designer specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Push Notification Optimizer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/push-notification-optimizer.md` | Push Notification Optimizer specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Email Campaign Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/email-campaign-agent.md` | Email Campaign Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Sms Otp Growth Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/sms-otp-growth-agent.md` | Sms Otp Growth Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Deep Link Attribution Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/deep-link-attribution-agent.md` | Deep Link Attribution Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Aso Keywords Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/aso-keywords-agent.md` | Aso Keywords Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Social Share Incentive Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/social-share-incentive-agent.md` | Social Share Incentive Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Influencer Outreach Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/influencer-outreach-agent.md` | Influencer Outreach Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Regional Campaign Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/regional-campaign-agent.md` | Regional Campaign Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Festive Campaign Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/festive-campaign-agent.md` | Festive Campaign Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Retargeting Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/retargeting-agent.md` | Retargeting Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Winback Campaign Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/winback-campaign-agent.md` | Winback Campaign Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Onboarding Experiment Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/onboarding-experiment-agent.md` | Onboarding Experiment Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Paywall Optimizer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/paywall-optimizer.md` | Paywall Optimizer specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Pricing Experiment Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/pricing-experiment-agent.md` | Pricing Experiment Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Content Seeding Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/content-seeding-agent.md` | Content Seeding Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Community Growth Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/community-growth-agent.md` | Community Growth Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Creator Recruitment Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/creator-recruitment-agent.md` | Creator Recruitment Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cross App Promotion Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/cross-app-promotion-agent.md` | Cross App Promotion Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Gamification Growth Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/gamification-growth-agent.md` | Gamification Growth Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Streak Mechanics Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/streak-mechanics-agent.md` | Streak Mechanics Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Leaderboard Growth Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/leaderboard-growth-agent.md` | Leaderboard Growth Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Notification Fatigue Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/notification-fatigue-agent.md` | Notification Fatigue Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Growth Dashboard Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/growth-dashboard-agent.md` | Growth Dashboard Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Channel Mix Optimizer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/channel-mix-optimizer.md` | Channel Mix Optimizer specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Budget Allocation Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/budget-allocation-agent.md` | Budget Allocation Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Growth Forecast Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/growth-forecast-agent.md` | Growth Forecast Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Competitive Intel Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/competitive-intel-agent.md` | Competitive Intel Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Partnership Growth Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/partnership-growth-agent.md` | Partnership Growth Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Offline Growth Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/offline-growth-agent.md` | Offline Growth Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Whatsapp Share Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/whatsapp-share-agent.md` | Whatsapp Share Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Regional Language Growth | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/regional-language-growth.md` | Regional Language Growth specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |
| Growth Compliance Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/growth-ai/growth-compliance-agent.md` | Growth Compliance Agent specialist for Stream Heaven's growth ai domain, ensuring alignment with platform governance and the four-app ecosystem |

## Phase 16

### Astro App

| Agent | Path | Purpose |
|-------|------|--------|
| Kundli Chart Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/astro-app/agents/kundli-chart-agent.md` | Kundli Chart Agent specialist for Stream Heaven's astro app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Horoscope Daily Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/astro-app/agents/horoscope-daily-agent.md` | Horoscope Daily Agent specialist for Stream Heaven's astro app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Panchang Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/astro-app/agents/panchang-agent.md` | Panchang Agent specialist for Stream Heaven's astro app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Matchmaking Compatibility Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/astro-app/agents/matchmaking-compatibility-agent.md` | Matchmaking Compatibility Agent specialist for Stream Heaven's astro app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Live Consultation Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/astro-app/agents/live-consultation-agent.md` | Live Consultation Agent specialist for Stream Heaven's astro app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Astro Chat Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/astro-app/agents/astro-chat-agent.md` | Astro Chat Agent specialist for Stream Heaven's astro app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Remedy Recommendation Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/astro-app/agents/remedy-recommendation-agent.md` | Remedy Recommendation Agent specialist for Stream Heaven's astro app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Astro Payment Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/astro-app/agents/astro-payment-agent.md` | Astro Payment Agent specialist for Stream Heaven's astro app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Astro Creator Onboarding | `c:/Users/admin/Desktop/Stream Heaven/apps/astro-app/agents/astro-creator-onboarding.md` | Astro Creator Onboarding specialist for Stream Heaven's astro app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Astro Content Moderator | `c:/Users/admin/Desktop/Stream Heaven/apps/astro-app/agents/astro-content-moderator.md` | Astro Content Moderator specialist for Stream Heaven's astro app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Astro Notification Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/astro-app/agents/astro-notification-agent.md` | Astro Notification Agent specialist for Stream Heaven's astro app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Astro Offline Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/astro-app/agents/astro-offline-agent.md` | Astro Offline Agent specialist for Stream Heaven's astro app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Astro Regional Calendar | `c:/Users/admin/Desktop/Stream Heaven/apps/astro-app/agents/astro-regional-calendar.md` | Astro Regional Calendar specialist for Stream Heaven's astro app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Astro Disclaimer Compliance | `c:/Users/admin/Desktop/Stream Heaven/apps/astro-app/agents/astro-disclaimer-compliance.md` | Astro Disclaimer Compliance specialist for Stream Heaven's astro app domain, ensuring alignment with platform governance and the four-app ecosystem |

## Phase 17

### Media App

| Agent | Path | Purpose |
|-------|------|--------|
| Ott Catalog Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/ott-catalog-agent.md` | Ott Catalog Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Video Player Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/video-player-agent.md` | Video Player Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Drm Protection Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/drm-protection-agent.md` | Drm Protection Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Subtitle Cdn Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/subtitle-cdn-agent.md` | Subtitle Cdn Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Continue Watching Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/continue-watching-agent.md` | Continue Watching Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Recommendation Row Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/recommendation-row-agent.md` | Recommendation Row Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Media Search Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/media-search-agent.md` | Media Search Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Download Offline Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/download-offline-agent.md` | Download Offline Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Parental Controls Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/parental-controls-agent.md` | Parental Controls Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Media Billing Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/media-billing-agent.md` | Media Billing Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Series Episode Manager | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/series-episode-manager.md` | Series Episode Manager specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Live Tv Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/live-tv-agent.md` | Live Tv Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Media Analytics Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/media-analytics-agent.md` | Media Analytics Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Content Ingestion Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/content-ingestion-agent.md` | Content Ingestion Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Transcoding Pipeline Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/transcoding-pipeline-agent.md` | Transcoding Pipeline Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Media Cdn Optimizer | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/media-cdn-optimizer.md` | Media Cdn Optimizer specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Media Accessibility Agent | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/media-accessibility-agent.md` | Media Accessibility Agent specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Media Regional Content | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/media-regional-content.md` | Media Regional Content specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |
| Media Rights Manager | `c:/Users/admin/Desktop/Stream Heaven/apps/media-app/agents/media-rights-manager.md` | Media Rights Manager specialist for Stream Heaven's media app domain, ensuring alignment with platform governance and the four-app ecosystem |

## Phase 18

### Agent Memory

| Agent | Path | Purpose |
|-------|------|--------|
| Context Store Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/agent-memory/context-store-agent.md` | Context Store Agent specialist for Stream Heaven's agent memory domain, ensuring alignment with platform governance and the four-app ecosystem |
| Memory Retrieval Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/agent-memory/memory-retrieval-agent.md` | Memory Retrieval Agent specialist for Stream Heaven's agent memory domain, ensuring alignment with platform governance and the four-app ecosystem |
| Memory Pruning Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/agent-memory/memory-pruning-agent.md` | Memory Pruning Agent specialist for Stream Heaven's agent memory domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cross Chat Sync Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/agent-memory/cross-chat-sync-agent.md` | Cross Chat Sync Agent specialist for Stream Heaven's agent memory domain, ensuring alignment with platform governance and the four-app ecosystem |

### Event System

| Agent | Path | Purpose |
|-------|------|--------|
| Event Bus Architect | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/event-system/event-bus-architect.md` | Event Bus Architect specialist for Stream Heaven's event system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Event Schema Guardian | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/event-system/event-schema-guardian.md` | Event Schema Guardian specialist for Stream Heaven's event system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Event Replay Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/event-system/event-replay-agent.md` | Event Replay Agent specialist for Stream Heaven's event system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Dead Letter Handler | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/event-system/dead-letter-handler.md` | Dead Letter Handler specialist for Stream Heaven's event system domain, ensuring alignment with platform governance and the four-app ecosystem |
| Event Audit Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/event-system/event-audit-agent.md` | Event Audit Agent specialist for Stream Heaven's event system domain, ensuring alignment with platform governance and the four-app ecosystem |

### Identity Platform

| Agent | Path | Purpose |
|-------|------|--------|
| Unified Auth Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/identity-platform/unified-auth-agent.md` | Unified Auth Agent specialist for Stream Heaven's identity platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Sso Federation Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/identity-platform/sso-federation-agent.md` | Sso Federation Agent specialist for Stream Heaven's identity platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Device Trust Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/identity-platform/device-trust-agent.md` | Device Trust Agent specialist for Stream Heaven's identity platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Session Manager Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/identity-platform/session-manager-agent.md` | Session Manager Agent specialist for Stream Heaven's identity platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Identity Graph Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/identity-platform/identity-graph-agent.md` | Identity Graph Agent specialist for Stream Heaven's identity platform domain, ensuring alignment with platform governance and the four-app ecosystem |

## Phase 19

### Analytics Platform

| Agent | Path | Purpose |
|-------|------|--------|
| Event Tracking Agent | `c:/Users/admin/Desktop/Stream Heaven/analytics-platform/agents/event-tracking-agent.md` | Event Tracking Agent specialist for Stream Heaven's analytics platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Dashboard Builder Agent | `c:/Users/admin/Desktop/Stream Heaven/analytics-platform/agents/dashboard-builder-agent.md` | Dashboard Builder Agent specialist for Stream Heaven's analytics platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Realtime Metrics Agent | `c:/Users/admin/Desktop/Stream Heaven/analytics-platform/agents/realtime-metrics-agent.md` | Realtime Metrics Agent specialist for Stream Heaven's analytics platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Data Warehouse Agent | `c:/Users/admin/Desktop/Stream Heaven/analytics-platform/agents/data-warehouse-agent.md` | Data Warehouse Agent specialist for Stream Heaven's analytics platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Privacy Analytics Agent | `c:/Users/admin/Desktop/Stream Heaven/analytics-platform/agents/privacy-analytics-agent.md` | Privacy Analytics Agent specialist for Stream Heaven's analytics platform domain, ensuring alignment with platform governance and the four-app ecosystem |

### Api Platform

| Agent | Path | Purpose |
|-------|------|--------|
| Public Api Gateway Agent | `c:/Users/admin/Desktop/Stream Heaven/api-platform/agents/public-api-gateway-agent.md` | Public Api Gateway Agent specialist for Stream Heaven's api platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Api Versioning Agent | `c:/Users/admin/Desktop/Stream Heaven/api-platform/agents/api-versioning-agent.md` | Api Versioning Agent specialist for Stream Heaven's api platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Rate Limit Agent | `c:/Users/admin/Desktop/Stream Heaven/api-platform/agents/rate-limit-agent.md` | Rate Limit Agent specialist for Stream Heaven's api platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Developer Portal Agent | `c:/Users/admin/Desktop/Stream Heaven/api-platform/agents/developer-portal-agent.md` | Developer Portal Agent specialist for Stream Heaven's api platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Webhook Manager Agent | `c:/Users/admin/Desktop/Stream Heaven/api-platform/agents/webhook-manager-agent.md` | Webhook Manager Agent specialist for Stream Heaven's api platform domain, ensuring alignment with platform governance and the four-app ecosystem |

### Store Growth

| Agent | Path | Purpose |
|-------|------|--------|
| App Store Optimization Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/store-growth/app-store-optimization-agent.md` | App Store Optimization Agent specialist for Stream Heaven's store growth domain, ensuring alignment with platform governance and the four-app ecosystem |
| Play Store Listing Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/store-growth/play-store-listing-agent.md` | Play Store Listing Agent specialist for Stream Heaven's store growth domain, ensuring alignment with platform governance and the four-app ecosystem |
| Review Response Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/store-growth/review-response-agent.md` | Review Response Agent specialist for Stream Heaven's store growth domain, ensuring alignment with platform governance and the four-app ecosystem |
| Store Experiment Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/store-growth/store-experiment-agent.md` | Store Experiment Agent specialist for Stream Heaven's store growth domain, ensuring alignment with platform governance and the four-app ecosystem |

## Phase 20

### Ad Network

| Agent | Path | Purpose |
|-------|------|--------|
| Ad Serving Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/ad-network/ad-serving-agent.md` | Ad Serving Agent specialist for Stream Heaven's ad network domain, ensuring alignment with platform governance and the four-app ecosystem |
| Ad Targeting Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/ad-network/ad-targeting-agent.md` | Ad Targeting Agent specialist for Stream Heaven's ad network domain, ensuring alignment with platform governance and the four-app ecosystem |
| Ad Fraud Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/ad-network/ad-fraud-agent.md` | Ad Fraud Agent specialist for Stream Heaven's ad network domain, ensuring alignment with platform governance and the four-app ecosystem |
| Ad Revenue Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/ad-network/ad-revenue-agent.md` | Ad Revenue Agent specialist for Stream Heaven's ad network domain, ensuring alignment with platform governance and the four-app ecosystem |

### Community Governance

| Agent | Path | Purpose |
|-------|------|--------|
| Community Guidelines Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/community-governance/community-guidelines-agent.md` | Community Guidelines Agent specialist for Stream Heaven's community governance domain, ensuring alignment with platform governance and the four-app ecosystem |
| Appeal Review Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/community-governance/appeal-review-agent.md` | Appeal Review Agent specialist for Stream Heaven's community governance domain, ensuring alignment with platform governance and the four-app ecosystem |
| Shadow Ban Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/community-governance/shadow-ban-agent.md` | Shadow Ban Agent specialist for Stream Heaven's community governance domain, ensuring alignment with platform governance and the four-app ecosystem |
| Community Leader Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/community-governance/community-leader-agent.md` | Community Leader Agent specialist for Stream Heaven's community governance domain, ensuring alignment with platform governance and the four-app ecosystem |

### Cross Platform

| Agent | Path | Purpose |
|-------|------|--------|
| Ios Parity Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cross-platform/ios-parity-agent.md` | Ios Parity Agent specialist for Stream Heaven's cross platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Android Parity Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cross-platform/android-parity-agent.md` | Android Parity Agent specialist for Stream Heaven's cross platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Web Flutter Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cross-platform/web-flutter-agent.md` | Web Flutter Agent specialist for Stream Heaven's cross platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Desktop Strategy Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/cross-platform/desktop-strategy-agent.md` | Desktop Strategy Agent specialist for Stream Heaven's cross platform domain, ensuring alignment with platform governance and the four-app ecosystem |

### Enterprise Security

| Agent | Path | Purpose |
|-------|------|--------|
| Pen Test Coordinator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/enterprise-security/pen-test-coordinator.md` | Pen Test Coordinator specialist for Stream Heaven's enterprise security domain, ensuring alignment with platform governance and the four-app ecosystem |
| Soc2 Compliance Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/enterprise-security/soc2-compliance-agent.md` | Soc2 Compliance Agent specialist for Stream Heaven's enterprise security domain, ensuring alignment with platform governance and the four-app ecosystem |
| Secrets Rotation Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/enterprise-security/secrets-rotation-agent.md` | Secrets Rotation Agent specialist for Stream Heaven's enterprise security domain, ensuring alignment with platform governance and the four-app ecosystem |
| Vulnerability Scanner Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/enterprise-security/vulnerability-scanner-agent.md` | Vulnerability Scanner Agent specialist for Stream Heaven's enterprise security domain, ensuring alignment with platform governance and the four-app ecosystem |

### Founder War Room

| Agent | Path | Purpose |
|-------|------|--------|
| Metrics Pulse Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/founder-war-room/metrics-pulse-agent.md` | Metrics Pulse Agent specialist for Stream Heaven's founder war room domain, ensuring alignment with platform governance and the four-app ecosystem |
| Runway Calculator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/founder-war-room/runway-calculator.md` | Runway Calculator specialist for Stream Heaven's founder war room domain, ensuring alignment with platform governance and the four-app ecosystem |
| Fundraise Deck Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/founder-war-room/fundraise-deck-agent.md` | Fundraise Deck Agent specialist for Stream Heaven's founder war room domain, ensuring alignment with platform governance and the four-app ecosystem |
| Competitive Landscape Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/founder-war-room/competitive-landscape-agent.md` | Competitive Landscape Agent specialist for Stream Heaven's founder war room domain, ensuring alignment with platform governance and the four-app ecosystem |

### Future Systems

| Agent | Path | Purpose |
|-------|------|--------|
| Ar Filter Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/future-systems/ar-filter-agent.md` | Ar Filter Agent specialist for Stream Heaven's future systems domain, ensuring alignment with platform governance and the four-app ecosystem |
| Vr Experience Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/future-systems/vr-experience-agent.md` | Vr Experience Agent specialist for Stream Heaven's future systems domain, ensuring alignment with platform governance and the four-app ecosystem |
| Ai Companion Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/future-systems/ai-companion-agent.md` | Ai Companion Agent specialist for Stream Heaven's future systems domain, ensuring alignment with platform governance and the four-app ecosystem |
| Metaverse Bridge Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/future-systems/metaverse-bridge-agent.md` | Metaverse Bridge Agent specialist for Stream Heaven's future systems domain, ensuring alignment with platform governance and the four-app ecosystem |

### Incident Command

| Agent | Path | Purpose |
|-------|------|--------|
| Incident Commander Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/incident-command/incident-commander-agent.md` | Incident Commander Agent specialist for Stream Heaven's incident command domain, ensuring alignment with platform governance and the four-app ecosystem |
| Status Page Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/incident-command/status-page-agent.md` | Status Page Agent specialist for Stream Heaven's incident command domain, ensuring alignment with platform governance and the four-app ecosystem |
| Postmortem Writer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/incident-command/postmortem-writer.md` | Postmortem Writer specialist for Stream Heaven's incident command domain, ensuring alignment with platform governance and the four-app ecosystem |
| Escalation Router | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/incident-command/escalation-router.md` | Escalation Router specialist for Stream Heaven's incident command domain, ensuring alignment with platform governance and the four-app ecosystem |

### Internationalization

| Agent | Path | Purpose |
|-------|------|--------|
| Translation Pipeline Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/internationalization/translation-pipeline-agent.md` | Translation Pipeline Agent specialist for Stream Heaven's internationalization domain, ensuring alignment with platform governance and the four-app ecosystem |
| Rtl Layout Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/internationalization/rtl-layout-agent.md` | Rtl Layout Agent specialist for Stream Heaven's internationalization domain, ensuring alignment with platform governance and the four-app ecosystem |
| Locale Format Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/internationalization/locale-format-agent.md` | Locale Format Agent specialist for Stream Heaven's internationalization domain, ensuring alignment with platform governance and the four-app ecosystem |
| Regional Payment Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/internationalization/regional-payment-agent.md` | Regional Payment Agent specialist for Stream Heaven's internationalization domain, ensuring alignment with platform governance and the four-app ecosystem |

### Media Pipeline

| Agent | Path | Purpose |
|-------|------|--------|
| Upload Ingest Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/media-pipeline/upload-ingest-agent.md` | Upload Ingest Agent specialist for Stream Heaven's media pipeline domain, ensuring alignment with platform governance and the four-app ecosystem |
| Transcode Scheduler | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/media-pipeline/transcode-scheduler.md` | Transcode Scheduler specialist for Stream Heaven's media pipeline domain, ensuring alignment with platform governance and the four-app ecosystem |
| Thumbnail Generator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/media-pipeline/thumbnail-generator.md` | Thumbnail Generator specialist for Stream Heaven's media pipeline domain, ensuring alignment with platform governance and the four-app ecosystem |
| Media Qc Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/media-pipeline/media-qc-agent.md` | Media Qc Agent specialist for Stream Heaven's media pipeline domain, ensuring alignment with platform governance and the four-app ecosystem |

### Ml Platform

| Agent | Path | Purpose |
|-------|------|--------|
| Model Registry Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/ml-platform/model-registry-agent.md` | Model Registry Agent specialist for Stream Heaven's ml platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Feature Serving Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/ml-platform/feature-serving-agent.md` | Feature Serving Agent specialist for Stream Heaven's ml platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Model Monitoring Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/ml-platform/model-monitoring-agent.md` | Model Monitoring Agent specialist for Stream Heaven's ml platform domain, ensuring alignment with platform governance and the four-app ecosystem |
| Gpu Scheduler Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/ml-platform/gpu-scheduler-agent.md` | Gpu Scheduler Agent specialist for Stream Heaven's ml platform domain, ensuring alignment with platform governance and the four-app ecosystem |

### Platform Finance

| Agent | Path | Purpose |
|-------|------|--------|
| Billing Reconciliation Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/platform-finance/billing-reconciliation-agent.md` | Billing Reconciliation Agent specialist for Stream Heaven's platform finance domain, ensuring alignment with platform governance and the four-app ecosystem |
| Invoice Generator | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/platform-finance/invoice-generator.md` | Invoice Generator specialist for Stream Heaven's platform finance domain, ensuring alignment with platform governance and the four-app ecosystem |
| Cost Attribution Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/platform-finance/cost-attribution-agent.md` | Cost Attribution Agent specialist for Stream Heaven's platform finance domain, ensuring alignment with platform governance and the four-app ecosystem |
| Vendor Invoice Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/platform-finance/vendor-invoice-agent.md` | Vendor Invoice Agent specialist for Stream Heaven's platform finance domain, ensuring alignment with platform governance and the four-app ecosystem |

### Platform Knowledge

| Agent | Path | Purpose |
|-------|------|--------|
| Doc Generator Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/platform-knowledge/doc-generator-agent.md` | Doc Generator Agent specialist for Stream Heaven's platform knowledge domain, ensuring alignment with platform governance and the four-app ecosystem |
| Adr Writer Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/platform-knowledge/adr-writer-agent.md` | Adr Writer Agent specialist for Stream Heaven's platform knowledge domain, ensuring alignment with platform governance and the four-app ecosystem |
| Onboarding Doc Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/platform-knowledge/onboarding-doc-agent.md` | Onboarding Doc Agent specialist for Stream Heaven's platform knowledge domain, ensuring alignment with platform governance and the four-app ecosystem |
| Api Doc Sync Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/platform-knowledge/api-doc-sync-agent.md` | Api Doc Sync Agent specialist for Stream Heaven's platform knowledge domain, ensuring alignment with platform governance and the four-app ecosystem |

### Product Labs

| Agent | Path | Purpose |
|-------|------|--------|
| Prototype Spike Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/product-labs/prototype-spike-agent.md` | Prototype Spike Agent specialist for Stream Heaven's product labs domain, ensuring alignment with platform governance and the four-app ecosystem |
| Feature Flag Experimenter | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/product-labs/feature-flag-experimenter.md` | Feature Flag Experimenter specialist for Stream Heaven's product labs domain, ensuring alignment with platform governance and the four-app ecosystem |
| User Interview Synthesizer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/product-labs/user-interview-synthesizer.md` | User Interview Synthesizer specialist for Stream Heaven's product labs domain, ensuring alignment with platform governance and the four-app ecosystem |
| Competitive Feature Analyst | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/product-labs/competitive-feature-analyst.md` | Competitive Feature Analyst specialist for Stream Heaven's product labs domain, ensuring alignment with platform governance and the four-app ecosystem |

### Safety

| Agent | Path | Purpose |
|-------|------|--------|
| Content Safety Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/safety/content-safety-agent.md` | Content Safety Agent specialist for Stream Heaven's safety domain, ensuring alignment with platform governance and the four-app ecosystem |
| Csam Detection Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/safety/csam-detection-agent.md` | Csam Detection Agent specialist for Stream Heaven's safety domain, ensuring alignment with platform governance and the four-app ecosystem |
| Harassment Detection Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/safety/harassment-detection-agent.md` | Harassment Detection Agent specialist for Stream Heaven's safety domain, ensuring alignment with platform governance and the four-app ecosystem |
| Age Gate Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/safety/age-gate-agent.md` | Age Gate Agent specialist for Stream Heaven's safety domain, ensuring alignment with platform governance and the four-app ecosystem |
| Trust Safety Reviewer | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/safety/trust-safety-reviewer.md` | Trust Safety Reviewer specialist for Stream Heaven's safety domain, ensuring alignment with platform governance and the four-app ecosystem |

### Search Infrastructure

| Agent | Path | Purpose |
|-------|------|--------|
| Elasticsearch Admin Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/search-infrastructure/elasticsearch-admin-agent.md` | Elasticsearch Admin Agent specialist for Stream Heaven's search infrastructure domain, ensuring alignment with platform governance and the four-app ecosystem |
| Search Ranking Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/search-infrastructure/search-ranking-agent.md` | Search Ranking Agent specialist for Stream Heaven's search infrastructure domain, ensuring alignment with platform governance and the four-app ecosystem |
| Autocomplete Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/search-infrastructure/autocomplete-agent.md` | Autocomplete Agent specialist for Stream Heaven's search infrastructure domain, ensuring alignment with platform governance and the four-app ecosystem |
| Search Analytics Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/search-infrastructure/search-analytics-agent.md` | Search Analytics Agent specialist for Stream Heaven's search infrastructure domain, ensuring alignment with platform governance and the four-app ecosystem |

### Support Ecosystem

| Agent | Path | Purpose |
|-------|------|--------|
| Ticket Triage Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/support-ecosystem/ticket-triage-agent.md` | Ticket Triage Agent specialist for Stream Heaven's support ecosystem domain, ensuring alignment with platform governance and the four-app ecosystem |
| Faq Generator Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/support-ecosystem/faq-generator-agent.md` | Faq Generator Agent specialist for Stream Heaven's support ecosystem domain, ensuring alignment with platform governance and the four-app ecosystem |
| Chatbot Support Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/support-ecosystem/chatbot-support-agent.md` | Chatbot Support Agent specialist for Stream Heaven's support ecosystem domain, ensuring alignment with platform governance and the four-app ecosystem |
| Creator Support Escalation | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/support-ecosystem/creator-support-escalation.md` | Creator Support Escalation specialist for Stream Heaven's support ecosystem domain, ensuring alignment with platform governance and the four-app ecosystem |

### Testing

| Agent | Path | Purpose |
|-------|------|--------|
| E2e Test Architect | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/testing/e2e-test-architect.md` | E2e Test Architect specialist for Stream Heaven's testing domain, ensuring alignment with platform governance and the four-app ecosystem |
| Load Test Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/testing/load-test-agent.md` | Load Test Agent specialist for Stream Heaven's testing domain, ensuring alignment with platform governance and the four-app ecosystem |
| Flutter Widget Test Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/testing/flutter-widget-test-agent.md` | Flutter Widget Test Agent specialist for Stream Heaven's testing domain, ensuring alignment with platform governance and the four-app ecosystem |
| Api Contract Test Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/testing/api-contract-test-agent.md` | Api Contract Test Agent specialist for Stream Heaven's testing domain, ensuring alignment with platform governance and the four-app ecosystem |
| Chaos Test Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/testing/chaos-test-agent.md` | Chaos Test Agent specialist for Stream Heaven's testing domain, ensuring alignment with platform governance and the four-app ecosystem |

### Web3

| Agent | Path | Purpose |
|-------|------|--------|
| Wallet Connect Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/web3/wallet-connect-agent.md` | Wallet Connect Agent specialist for Stream Heaven's web3 domain, ensuring alignment with platform governance and the four-app ecosystem |
| Nft Minting Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/web3/nft-minting-agent.md` | Nft Minting Agent specialist for Stream Heaven's web3 domain, ensuring alignment with platform governance and the four-app ecosystem |
| Token Economy Agent | `c:/Users/admin/Desktop/Stream Heaven/ai-agents/web3/token-economy-agent.md` | Token Economy Agent specialist for Stream Heaven's web3 domain, ensuring alignment with platform governance and the four-app ecosystem |
## Gap-Fill Agents (2026-05-29)

> Spec-named agents added under **dual naming**. Generator/legacy files retained. See alias table at top.

### Phase 10 — gift-effects

| Agent | Path | Purpose |
|-------|------|--------|
| Gift Trigger Agent | `ai-agents/gift-effects/rendering/gift-trigger-agent.md` | Gift triggers — validation and dispatch |
| Gift Sync Agent | `ai-agents/gift-effects/rendering/gift-sync-agent.md` | Cross-client gift sync and ordering |
| Gift Economy Agent | `ai-agents/gift-effects/rendering/gift-economy-agent.md` | Catalog pricing and wallet debits |
| Gift Animation Agent | `ai-agents/gift-effects/rendering/gift-animation-agent.md` | Lottie/Rive pipelines and assets |
| Gift Rendering Agent | `ai-agents/gift-effects/rendering/gift-rendering-agent.md` | GPU/CPU render path per device |
| Gift Priority Agent | `ai-agents/gift-effects/rendering/gift-priority-agent.md` | Priority when FX budget saturated |
| Spatial Audio Agent | `ai-agents/gift-effects/audio/spatial-audio-agent.md` | Spatial audio for multi-guest stages |
| Voice Enhancement Agent | `ai-agents/gift-effects/audio/voice-enhancement-agent.md` | Voice clarity and noise suppression |
| Background Audio Agent | `ai-agents/gift-effects/audio/background-audio-agent.md` | Background music licensing and ducking |
| Live Audio Mixer Agent | `ai-agents/gift-effects/audio/live-audio-mixer-agent.md` | Live bus mixing host/guest/music |
| Audio Reaction Agent | `ai-agents/gift-effects/audio/audio-reaction-agent.md` | Audio stingers for reactions |
| Sound Effects Agent | `ai-agents/gift-effects/audio/sound-effects-agent.md` | SFX library and CDN prefetch |
| Gift Sound Agent | `ai-agents/gift-effects/audio/gift-sound-agent.md` | Per-gift sounds and play limits |
| Reaction Sound Agent | `ai-agents/gift-effects/audio/reaction-sound-agent.md` | Reaction packs with normalization |
| Particle Effects Agent | `ai-agents/gift-effects/fx/particle-effects-agent.md` | Particle gifts with GPU caps |
| Heart Rain Agent | `ai-agents/gift-effects/fx/heart-rain-agent.md` | Heart-rain with client aggregation |
| Shader Effects Agent | `ai-agents/gift-effects/fx/shader-effects-agent.md` | Shader gifts and fallbacks |
| 3d Animation Agent | `ai-agents/gift-effects/fx/3d-animation-agent.md` | 3D gift LOD per device |
| Screen Overlay Agent | `ai-agents/gift-effects/fx/screen-overlay-agent.md` | Overlays without blocking touches |
| Emoji Burst Agent | `ai-agents/gift-effects/fx/emoji-burst-agent.md` | Emoji bursts on reactions |
| Dynamic Lighting Agent | `ai-agents/gift-effects/fx/dynamic-lighting-agent.md` | Lighting accents on host video |
| Motion Graphics Agent | `ai-agents/gift-effects/fx/motion-graphics-agent.md` | Campaign motion templates |
| Gpu Effects Agent | `ai-agents/gift-effects/fx/gpu-effects-agent.md` | GPU scheduling and crash guards |
| Floating Comment Agent | `ai-agents/gift-effects/fx/floating-comment-agent.md` | Premium floating comments |
| Animated Chat Agent | `ai-agents/gift-effects/fx/animated-chat-agent.md` | Animated subscriber chat |
| Sticker Effects Agent | `ai-agents/gift-effects/fx/sticker-effects-agent.md` | Sticker overlays live/replay |
| Reaction Animation Agent | `ai-agents/gift-effects/fx/reaction-animation-agent.md` | Reaction choreography |

### Phase 18 — agent-memory

| Agent | Path | Purpose |
|-------|------|--------|
| Memory Coordination Agent | `ai-agents/agent-memory/memory-coordination-agent.md` | Coordinate agent memory writes |
| Context Memory Agent | `ai-agents/agent-memory/context-memory-agent.md` | Short-term session context |
| Long Term Memory Agent | `ai-agents/agent-memory/long-term-memory-agent.md` | Durable memory retention |
| Conversation Memory Agent | `ai-agents/agent-memory/conversation-memory-agent.md` | Thread memory for support |
| Agent State Agent | `ai-agents/agent-memory/agent-state-agent.md` | Resumable agent state snapshots |
| Semantic Memory Agent | `ai-agents/agent-memory/semantic-memory-agent.md` | Semantic embeddings store |
| Vector Memory Agent | `ai-agents/agent-memory/vector-memory-agent.md` | Vector index sharding |
| Memory Indexing Agent | `ai-agents/agent-memory/memory-indexing-agent.md` | Memory search indexing |
| Cross Agent Memory Agent | `ai-agents/agent-memory/cross-agent-memory-agent.md` | Shared memory across agents |
| Memory Retrieval Agent | `ai-agents/agent-memory/memory-retrieval-agent.md` | Retrieval ranking for prompts |

### Phase 18 — event-system

| Agent | Path | Purpose |
|-------|------|--------|
| Event Stream Agent | `ai-agents/event-system/event-stream-agent.md` | Event streaming backbone |
| Kafka Agent | `ai-agents/event-system/kafka-agent.md` | Kafka topics and retention |
| Queue Orchestration Agent | `ai-agents/event-system/queue-orchestration-agent.md` | Queue topology and retries |
| Event Routing Agent | `ai-agents/event-system/event-routing-agent.md` | Consumer routing by type/region |
| Async Processing Agent | `ai-agents/event-system/async-processing-agent.md` | Async workers and idempotency |
| Realtime Event Agent | `ai-agents/event-system/realtime-event-agent.md` | Bridge to Socket.IO fanout |
| Message Broker Agent | `ai-agents/event-system/message-broker-agent.md` | Broker health and abstraction |
| Pubsub Agent | `ai-agents/event-system/pubsub-agent.md` | Pub/sub cross-service notify |
| Stream Processing Agent | `ai-agents/event-system/stream-processing-agent.md` | Windowed stream aggregates |
| Event Replay Agent | `ai-agents/event-system/event-replay-agent.md` | Controlled replay and backfill |
| Dead Letter Queue Agent | `ai-agents/event-system/dead-letter-queue-agent.md` | DLQ inspect, replay, alert |

### Phase 18 — identity-platform

| Agent | Path | Purpose |
|-------|------|--------|
| Universal User Agent | `ai-agents/identity-platform/universal-user-agent.md` | Canonical user across all four apps |
| Identity Resolution Agent | `ai-agents/identity-platform/identity-resolution-agent.md` | Duplicate identity resolution |
| Cross App Profile Agent | `ai-agents/identity-platform/cross-app-profile-agent.md` | Cross-app profile sync |
| Single Sign On Agent | `ai-agents/identity-platform/single-sign-on-agent.md` | SSO across apps |
| Device Identity Agent | `ai-agents/identity-platform/device-identity-agent.md` | Trusted device registry |
| Session Identity Agent | `ai-agents/identity-platform/session-identity-agent.md` | Session tokens and revocation |
| Multi Device Sync Agent | `ai-agents/identity-platform/multi-device-sync-agent.md` | Multi-device login sync |
| Identity Merge Agent | `ai-agents/identity-platform/identity-merge-agent.md` | Account merge with consent |
| Account Recovery Agent | `ai-agents/identity-platform/account-recovery-agent.md` | Recovery via OTP and backups |
| Account Linking Agent | `ai-agents/identity-platform/account-linking-agent.md` | Link phone, email, OAuth |

### Phase 20 — enterprise-security

| Agent | Path | Purpose |
|-------|------|--------|
| Zero Trust Network Agent | `ai-agents/enterprise-security/zero-trust-network-agent.md` | Zero-trust network policies |
| Iam Policy Agent | `ai-agents/enterprise-security/iam-policy-agent.md` | IAM least-privilege policies |
| Data Loss Prevention Agent | `ai-agents/enterprise-security/data-loss-prevention-agent.md` | DLP for exports and logs |
| Breach Response Agent | `ai-agents/enterprise-security/breach-response-agent.md` | Breach playbooks and forensics |
| Security Audit Agent | `ai-agents/enterprise-security/security-audit-agent.md` | Continuous security audits |

### Phase 20 — incident-command

| Agent | Path | Purpose |
|-------|------|--------|
| On Call Rotation Agent | `ai-agents/incident-command/on-call-rotation-agent.md` | On-call schedules and escalation policies |
| Runbook Automation Agent | `ai-agents/incident-command/runbook-automation-agent.md` | Automated runbooks for known failures |
| Customer Comms Agent | `ai-agents/incident-command/customer-comms-agent.md` | Customer comms during incidents |

### Phase 20 — safety

| Agent | Path | Purpose |
|-------|------|--------|
| Trust Safety Agent | `ai-agents/safety/trust-safety-agent.md` | Trust & safety program enforcement |
| Ai Moderation Agent | `ai-agents/safety/ai-moderation-agent.md` | AI classifiers for UGC and live |
| Anti Spam Agent | `ai-agents/safety/anti-spam-agent.md` | Spam in DM, comments, live chat |
| Content Policy Agent | `ai-agents/safety/content-policy-agent.md` | Policy matrices per app/locale |
| Fraud Detection Agent | `ai-agents/safety/fraud-detection-agent.md` | Payments and gift fraud scoring |
| Security Agent | `ai-agents/safety/security-agent.md` | AppSec standards and threat models |
| Compliance Agent | `ai-agents/safety/compliance-agent.md` | Regulatory and store compliance |
| Trust Score Agent | `ai-agents/safety/trust-score-agent.md` | Trust scores for feature gating |
| Host Reputation Agent | `ai-agents/safety/host-reputation-agent.md` | Host strikes and reputation |
| Creator Verification Agent | `ai-agents/safety/creator-verification-agent.md` | Creator KYC and badges |
| Identity Verification Agent | `ai-agents/safety/identity-verification-agent.md` | ID and liveness verification |
| Community Reputation Agent | `ai-agents/safety/community-reputation-agent.md` | Community karma weights |
| Review Rating Agent | `ai-agents/safety/review-rating-agent.md` | Review fraud and integrity |
| Anti Fake Profile Agent | `ai-agents/safety/anti-fake-profile-agent.md` | Fake profiles and bot nets |
| Deepfake Detection Agent | `ai-agents/safety/deepfake-detection-agent.md` | Deepfake on upload/live |

### Phase 20 — store-growth

| Agent | Path | Purpose |
|-------|------|--------|
| Aso Agent | `ai-agents/store-growth/aso-agent.md` | App store optimization strategy |
| Conversion Rate Agent | `ai-agents/store-growth/conversion-rate-agent.md` | Store listing conversion experiments |
| Store Screenshot Agent | `ai-agents/store-growth/store-screenshot-agent.md` | Screenshot/localized creative pipeline |
| Keyword Ranking Agent | `ai-agents/store-growth/keyword-ranking-agent.md` | Keyword tracking and ASO iterations |
| App Preview Video Agent | `ai-agents/store-growth/app-preview-video-agent.md` | Preview video storyboards and specs |

### Phase 20 — testing

| Agent | Path | Purpose |
|-------|------|--------|
| Qa Automation Agent | `ai-agents/testing/qa-automation-agent.md` | QA automation frameworks and CI gates |
| Integration Testing Agent | `ai-agents/testing/integration-testing-agent.md` | Service integration test suites |
| Regression Testing Agent | `ai-agents/testing/regression-testing-agent.md` | Regression suites on release branches |
| End To End Testing Agent | `ai-agents/testing/end-to-end-testing-agent.md` | E2E flows across four apps |
| Bug Reproduction Agent | `ai-agents/testing/bug-reproduction-agent.md` | Minimal repro scripts from tickets |
| Crash Monitoring Agent | `ai-agents/testing/crash-monitoring-agent.md` | Crashlytics/Sentry triage |
| App Performance Agent | `ai-agents/testing/app-performance-agent.md` | Mobile app performance budgets |
| Flutter Performance Agent | `ai-agents/testing/flutter-performance-agent.md` | Flutter frame timing and jank |
| Memory Leak Detection Agent | `ai-agents/testing/memory-leak-detection-agent.md` | Leak detection in long sessions |
| Network Resilience Agent | `ai-agents/testing/network-resilience-agent.md` | Network chaos on 2G/3G profiles |
| Load Testing Agent | `ai-agents/testing/load-testing-agent.md` | Load tests for live and API peaks |
| Device Compatibility Agent | `ai-agents/testing/device-compatibility-agent.md` | Device matrix compatibility |
| Accessibility Testing Agent | `ai-agents/testing/accessibility-testing-agent.md` | a11y audits WCAG mobile |
| Chaos Engineering Agent | `ai-agents/testing/chaos-engineering-agent.md` | Chaos experiments in staging |
| Low End Device Agent | `ai-agents/testing/low-end-device-agent.md` | Low-end Android soak tests |
| Battery Optimization Agent | `ai-agents/testing/battery-optimization-agent.md` | Battery drain profiling |
| Network Optimization Agent | `ai-agents/testing/network-optimization-agent.md` | Payload and retry optimization |
| Offline Sync Agent | `ai-agents/testing/offline-sync-agent.md` | Offline queue sync validation |
| Memory Optimization Agent | `ai-agents/testing/memory-optimization-agent.md` | Heap/GPU memory optimization |
| Startup Time Agent | `ai-agents/testing/startup-time-agent.md` | Cold start and TTI budgets |

### Phase 5 — core-engineering-backend

| Agent | Path | Purpose |
|-------|------|--------|
| Queue Processing Agent | `ai-agents/core-engineering/backend/queue-processing-agent.md` | Queue workers for NestJS background jobs |
| Background Jobs Agent | `ai-agents/core-engineering/backend/background-jobs-agent.md` | Scheduled jobs, cron, and job dashboards |

### Phase 5 — core-engineering-database

| Agent | Path | Purpose |
|-------|------|--------|
| Replication Agent | `ai-agents/core-engineering/database/replication-agent.md` | Postgres replication, lag monitoring, failover |
| Sharding Agent | `ai-agents/core-engineering/database/sharding-agent.md` | Sharding strategy for hot social/live tables |

### Phase 5 — core-engineering-frontend

| Agent | Path | Purpose |
|-------|------|--------|
| Design Token Sync Agent | `ai-agents/core-engineering/frontend/design-token-sync-agent.md` | Design token sync Figma → Flutter theme extensions |

### Phase 5 — core-engineering-infrastructure

| Agent | Path | Purpose |
|-------|------|--------|
| Autoscaling Agent | `ai-agents/core-engineering/infrastructure/autoscaling-agent.md` | HPA/cluster autoscaling policies |
| Serverless Agent | `ai-agents/core-engineering/infrastructure/serverless-agent.md` | Lambda/serverless for burst workloads |
| Geo Routing Agent | `ai-agents/core-engineering/infrastructure/geo-routing-agent.md` | Geo DNS and traffic routing |

### Phase 5 — core-engineering-realtime

| Agent | Path | Purpose |
|-------|------|--------|
| Rtc Quality Agent | `ai-agents/core-engineering/realtime/rtc-quality-agent.md` | RTC quality scoring and provider failover |
| Latency Monitor Agent | `ai-agents/core-engineering/realtime/latency-monitor-agent.md` | Latency SLO monitors for Socket.IO and RTC |
| Voice Sync Agent | `ai-agents/core-engineering/realtime/voice-sync-agent.md` | Voice sync lip-alignment for co-hosts |
| Ultra Low Latency Agent | `ai-agents/core-engineering/realtime/ultra-low-latency-agent.md` | Ultra-low-latency RTC tuning guides |

### Phase 5 — core-engineering-reliability

| Agent | Path | Purpose |
|-------|------|--------|
| Uptime Agent | `ai-agents/core-engineering/reliability/uptime-agent.md` | Uptime SLOs, error budgets, status comms |
| Chaos Engineering Agent | `ai-agents/core-engineering/reliability/chaos-engineering-agent.md` | Platform chaos experiments (infra plane) |

### Phase 8 — social-app

| Agent | Path | Purpose |
|-------|------|--------|
| Social Feed Agent | `apps/social-app/agents/social-feed-agent.md` | Home feed composition — following, For You, and ads insertion |
| Follow System Agent | `apps/social-app/agents/follow-system-agent.md` | Follow graph — requests, mutual follows, blocks, and counts |

### Phase 9 — livestream-app

| Agent | Path | Purpose |
|-------|------|--------|
| Livestream Agent | `apps/livestream-app/agents/core/livestream-agent.md` | Owns end-to-end live room lifecycle — go-live, viewer join, graceful end, and cross-app handoff |
| Audio Room Agent | `apps/livestream-app/agents/core/audio-room-agent.md` | Audio-only live rooms with seat maps, mute policies, and low-bandwidth profiles |
| Creator Monetization Agent | `apps/livestream-app/agents/core/creator-monetization-agent.md` | Creator earnings — gifts, tips, subscriptions, and payout reconciliation |
| Livestream Scaling Agent | `apps/livestream-app/agents/core/livestream-scaling-agent.md` | Horizontal scale for viewers, chat fanout, and regional CDN/RTC capacity |
| Live Comment Agent | `apps/livestream-app/agents/video-systems/live-comment-agent.md` | Realtime live comment pipeline with moderation and translations |
| Live Reaction Agent | `apps/livestream-app/agents/video-systems/live-reaction-agent.md` | Mass live reactions without choking RTC or socket throughput |
| Low Latency Stream Agent | `apps/livestream-app/agents/video-systems/low-latency-stream-agent.md` | Ultra-low-latency paths for PK and host-viewer sync |
| Seat Management Agent | `apps/livestream-app/agents/multi-guest/seat-management-agent.md` | Speaker seats, locks, promotions, and layout slots |
| Guest Request Agent | `apps/livestream-app/agents/multi-guest/guest-request-agent.md` | Viewer requests to join stage — apply, approve, deny, timeout |
| Live Stage Agent | `apps/livestream-app/agents/multi-guest/live-stage-agent.md` | Multi-guest stage modes — grid, spotlight, PK split |
| Pk Tournament Agent | `apps/livestream-app/agents/operations/pk-tournament-agent.md` | PK tournament brackets, scoring, and prizes |
| Festival Event Agent | `apps/livestream-app/agents/operations/festival-event-agent.md` | Multi-day festival schedules and sponsor zones |
| Fan Engagement Agent | `apps/livestream-app/agents/operations/fan-engagement-agent.md` | Fan quests, streaks, and engagement loops |
| Live Event Agent | `apps/livestream-app/agents/operations/live-event-agent.md` | One-off live events — reminders and go-live |
| Host Ranking Agent | `apps/livestream-app/agents/operations/host-ranking-agent.md` | Host leaderboards with fair-play anti-cheat |
| Community Event Agent | `apps/livestream-app/agents/operations/community-event-agent.md` | Community watch parties and shared rooms |
| Live Campaign Agent | `apps/livestream-app/agents/operations/live-campaign-agent.md` | Live campaigns tied to marketing calendar |
| Seasonal Campaign Agent | `apps/livestream-app/agents/operations/seasonal-campaign-agent.md` | Seasonal skins and gift themes |
| Global Ranking Event Agent | `apps/livestream-app/agents/operations/global-ranking-event-agent.md` | Cross-region rankings with timezone fairness |
| Host Competition Agent | `apps/livestream-app/agents/operations/host-competition-agent.md` | Host competitions with judging and appeals |
| Livestream Battle Agent | `apps/livestream-app/agents/operations/livestream-battle-agent.md` | Battle timers, win rules, and rematches |
| High Spender Agent | `apps/livestream-app/agents/economy-psychology/high-spender-agent.md` | Whale detection and VIP treatment |
| Gift Conversion Agent | `apps/livestream-app/agents/economy-psychology/gift-conversion-agent.md` | Gift funnel analytics and nudges |
| Vip Retention Agent | `apps/livestream-app/agents/economy-psychology/vip-retention-agent.md` | VIP tiers, churn, and win-back |
| Creator Battle Agent | `apps/livestream-app/agents/economy-psychology/creator-battle-agent.md` | Creator battle psychology and pacing |
| Live Economy Balancer Agent | `apps/livestream-app/agents/economy-psychology/live-economy-balancer-agent.md` | Virtual economy sinks/sources balance |
| Emotional Engagement Agent | `apps/livestream-app/agents/economy-psychology/emotional-engagement-agent.md` | Emotional hooks in live UX timing |
| Spender Segmentation Agent | `apps/livestream-app/agents/economy-psychology/spender-segmentation-agent.md` | RFM segmentation for live spenders |
| Fan Loyalty Agent | `apps/livestream-app/agents/economy-psychology/fan-loyalty-agent.md` | Loyalty points, badges, retention |

