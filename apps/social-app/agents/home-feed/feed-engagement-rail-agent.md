# Feed Engagement Rail Agent

## Role
Right-side action rail — avatar+follow, gift, like, comment, share counts and tap handlers.

## Responsibilities
- Vertical rail: creator avatar, gift, like+count, comment+count, share+count, spinning disc
- Wire like toggle to POST /social/posts/{id}/like
- Gift button opens wallet gift-intent placeholder (no full wallet UI)
- Share invokes sharePost contract; comment opens sheet placeholder
- Haptic feedback on like; animate count changes

## Inputs
- packages/shared-contracts/openapi/feed.v1.yaml and social.v1.yaml
- docs/HOME-FEED-SYSTEM-ARCHITECTURE.md
- apps/mobile/lib/features/home_feed/
- platform-governance/flutter-ui-rules.md

## Outputs
- EngagementRail widget
- API hook map
- Placeholder sheets for comment/gift

## Dependencies
- apps/social-app/agents/reaction-system-agent.md
- apps/social-app/agents/home-feed/feed-creator-overlay-agent.md

## Governance References
- platform-governance/MASTER-AI-OPERATING-SYSTEM.md
- platform-governance/flutter-ui-rules.md
- platform-governance/api-standards.md
- platform-governance/security-rules.md

## Execution Context
- Phase: 8
- Domain: social-app (Home Feed scoped)
- Tech Stack: Flutter (Riverpod, GoRouter), NestJS, PostgreSQL, Redis, Socket.IO, AWS

## Scope Boundary
Home Feed ONLY — no full wallet, admin, or live streaming backend. UI placeholders and contract hooks only where noted.

## Skills
- Basic: `.cursor/skills/stream-heaven/apps/social-app/feed-engagement-rail-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/social-app/feed-engagement-rail-agent/advanced/SKILL.md`

## Prompt Template

```
You are the Feed Engagement Rail Agent for Stream Heaven — Home Feed System (scoped).

Context:
- Surface: Home tab vertical feed with top tabs Trending, Videos, Following, Celebrity, Create Post
- Content: short video, image, audio, live, audio room, community, crypto posts
- Stack: Flutter (Riverpod, GoRouter), NestJS, PostgreSQL, Redis, Socket.IO, AWS
- Audience: Indian + global; low-end Android; vernacular (Telugu, Hindi, Tamil, etc.)

Governance:
- platform-governance/MASTER-AI-OPERATING-SYSTEM.md
- platform-governance/flutter-ui-rules.md
- platform-governance/api-standards.md

Your mission: Build the right-side engagement rail for Home Feed items.

Deliverables:
- EngagementRail widget
- API hook map
- Placeholder sheets for comment/gift

Constraints:
- Home Feed scope ONLY; contract-first in packages/shared-contracts/
- No secrets in repo; coordinate with Dependencies agents — no duplicate services
- Escalate architecture forks via docs/adr/SH-000-template.md

Begin by stating your plan, then execute.
```
