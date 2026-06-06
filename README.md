# Stream Heaven

**AI-native entertainment super ecosystem** — Social, Livestream, Astrology, and OTT media united under one platform.

## Vision

Stream Heaven is a multi-app entertainment platform built for Indian and global audiences, optimized for low-end Android devices and poor connectivity. Four Flutter apps share a NestJS microservices backend, unified identity, wallet, and realtime infrastructure.

| App | Domain | Primary Users |
|-----|--------|---------------|
| **Social App** | Feed, stories, DMs, communities | Creators, everyday users |
| **Livestream App** | Live video, gifts, multi-guest | Streamers, viewers |
| **Astro App** | Astrology consultations, charts | Seekers, astrologers |
| **Media App (OTT)** | Movies, series, short-form | Binge watchers |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Flutter (Riverpod, GoRouter) |
| Backend | Node.js, NestJS microservices |
| Database | PostgreSQL, Redis |
| Realtime | Socket.IO |
| Streaming | Agora SDK / Zego SDK |
| Storage | AWS S3 |
| CDN | Cloudflare |
| Auth | Firebase Auth, OTP |
| Hosting | AWS |
| Languages | English, Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, Marathi, Punjabi |

## Repository Structure

```
stream-heaven/
├── platform-governance/     # Engineering rules, standards, checklists
├── ai-agents/                 # AI agent definitions (Cursor multi-chat workflow)
├── apps/                      # Flutter apps (social, livestream, astro, media, mobile)
├── services/                  # NestJS microservices
├── packages/                  # Shared contracts, types, utils, design system
├── infrastructure/            # DevOps, K8s, Terraform
├── api-platform/              # Public API layer
├── analytics-platform/        # Analytics layer
└── docs/                      # Architecture docs and ADRs
```

## Multi-Chat Execution Workflow

Stream Heaven is designed to be built by **multiple Cursor chats working in parallel**, each invoking specialized AI agents. Follow this workflow:

### 1. Start Every Chat with Governance

Open [`platform-governance/MASTER-AI-OPERATING-SYSTEM.md`](platform-governance/MASTER-AI-OPERATING-SYSTEM.md) (canonical) or [`MASTER-GOVERNANCE-PROMPT.md`](platform-governance/MASTER-GOVERNANCE-PROMPT.md) (short) and paste at the top of every Cursor chat. See [`docs/MULTI-CHAT-EXECUTION-GUIDE.md`](docs/MULTI-CHAT-EXECUTION-GUIDE.md) for the 10-chat parallel workflow.

### 2. Pick an Agent

Browse `ai-agents/AGENT-REGISTRY.md` to find the agent for your task. Each agent file contains:

- Role and responsibilities
- Inputs, outputs, dependencies
- Governance references
- A ready-to-use **Prompt Template** for Cursor

### 3. Execute by Phase

| Phase | Focus | Location |
|-------|-------|----------|
| 0–1 | Foundation & governance | Root, `platform-governance/` |
| 2–4 | Executive, brain, orchestration | `ai-agents/executive/`, `master-brain/`, `orchestration/` |
| 5 | Core engineering | `ai-agents/core-engineering/` |
| 6–7 | Design system & UX | `ai-agents/design-system/`, `user-experience-intelligence/` |
| 8–9 | Social & Livestream apps | `apps/social-app/`, `apps/livestream-app/` |
| 10–13 | Gifts, cosmetics, economy | `ai-agents/gift-effects/`, `cosmetics/`, `creator-economy/`, `economy/` |
| 14–15 | Data science & growth | `ai-agents/data-science/`, `growth-ai/` |
| 16–17 | Astro & Media apps | `apps/astro-app/`, `apps/media-app/` |
| 18–20 | Platform services & ops | `ai-agents/identity-platform/`, `safety/`, etc. |

### 4. Respect Boundaries

- **Do not** implement Flutter/NestJS code outside the assigned agent scope
- **Do** reference shared packages in `packages/` for contracts and types
- **Do** follow `platform-governance/` rules for every change
- **Do** update ADRs in `docs/adr/` for architectural decisions

### 5. Handoff Between Chats

When one chat completes work:

1. Document outputs in the agent's expected format
2. Note any blockers or dependencies for downstream agents
3. Reference the next agent in `AGENT-REGISTRY.md` for the follow-up chat

## Getting Started (Development)

```bash
# Install dependencies (when packages exist)
pnpm install

# Run all dev servers (when configured)
pnpm dev

# Build all packages
pnpm build
```

## Recommended First Development Steps

After scaffolding (Phases 0–1), begin Phase 1 development:

1. **Auth foundation** — Firebase Auth + OTP via `auth-service`
2. **Shared core** — `packages/shared-contracts`, `shared-types`, `shared-utils`
3. **Realtime foundation** — Socket.IO gateway + Redis presence

See `platform-governance/platform-roadmap.md` for the full timeline. Readiness audit: [`docs/FINAL-READINESS-REPORT.md`](docs/FINAL-READINESS-REPORT.md).

## Governance

All engineering work is governed by documents in `platform-governance/`. Key references:

- `architecture-principles.md` — System design tenets
- `engineering-rules.md` — Day-to-day coding standards
- `api-standards.md` — REST, events, versioning
- `security-rules.md` — Auth, data protection, compliance
- `ai-usage-rules.md` — AI agent and LLM usage policies

## License

Proprietary — Stream Heaven Platform. All rights reserved.
