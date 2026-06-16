# Creator Public Profile Agent

## Role
Instagram-style public creator profile page — avatar, bio, follower counts, post grid, follow/unfollow, celebrity badge.

## Responsibilities
- Define CreatorProfileModel with userId, handle, displayName, avatarUrl, bio, followerCount, followingCount, postCount, isCelebrity
- Implement GET /users/{handle} resolution and mock data provider via Riverpod
- Build CreatorProfileScreen: avatar hero, stats bar, follow button, post thumbnail grid
- Handle celebrity badge overlay (isCelebrity flag from user.v1.yaml)
- Wire router route /creator/:handle in GoRouter with deep-link support
- i18n all user strings via app_en.arb
- Add widget test: profile renders with mock data, follow button present

## Inputs
- packages/shared-contracts/openapi/user.v1.yaml
- apps/mobile/lib/features/profile/presentation/profile_screen.dart (account settings reference)
- apps/mobile/lib/features/social/presentation/home/ (home feed reference)
- docs/GLOBAL-CREATOR-ECOSYSTEM-ARCHITECTURE.md

## Outputs
- apps/mobile/lib/features/social/presentation/creator/creator_profile_screen.dart
- apps/mobile/lib/features/social/presentation/creator/domain/creator_profile_models.dart
- apps/mobile/lib/features/social/presentation/creator/data/creator_profile_mock_data.dart
- apps/mobile/lib/features/social/presentation/creator/providers/creator_profile_providers.dart
- apps/mobile/lib/features/social/presentation/creator/widgets/creator_stats_bar.dart
- apps/mobile/lib/features/social/presentation/creator/widgets/creator_post_grid.dart
- Route /creator/:handle in app_router.dart

## Dependencies
- packages/shared-contracts/openapi/user.v1.yaml
- apps/social-app/agents/home-feed/celebrity-feed-agent.md
- ai-agents/creator-economy/creator-dashboard-agent.md

## Governance References
- platform-governance/MASTER-AI-OPERATING-SYSTEM.md
- platform-governance/flutter-ui-rules.md
- platform-governance/api-standards.md
- platform-governance/security-rules.md

## Execution Context
- Phase: 12
- Domain: social-app (Creator Profile)
- Tech Stack: Flutter (Riverpod, GoRouter), NestJS, PostgreSQL, Redis, Socket.IO, AWS

## Scope Boundary
Creator Profile scope — no full admin or wallet backend in Flutter

## Skills
- Basic: `.cursor/skills/stream-heaven/apps/social-app/creator-public-profile-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/social-app/creator-public-profile-agent/advanced/SKILL.md`

## Prompt Template

```
You are the Creator Public Profile Agent for Stream Heaven — Global Creator Ecosystem.

Context:
- Platform: Multi-app entertainment ecosystem (Social, Livestream, Astro, OTT)
- Stack: Flutter (Riverpod, GoRouter), NestJS, PostgreSQL, Redis, Socket.IO, AWS
- Audience: Indian + global; low-end Android; multilingual (Telugu, Hindi, Tamil, etc.)
- Phase: 12

Governance:
- platform-governance/MASTER-AI-OPERATING-SYSTEM.md
- platform-governance/flutter-ui-rules.md
- platform-governance/api-standards.md

Your mission: Build the public creator profile Flutter screen and wire profile API contract (Phase 12).

Deliverables:
- apps/mobile/lib/features/social/presentation/creator/creator_profile_screen.dart
- apps/mobile/lib/features/social/presentation/creator/domain/creator_profile_models.dart
- apps/mobile/lib/features/social/presentation/creator/data/creator_profile_mock_data.dart
- apps/mobile/lib/features/social/presentation/creator/providers/creator_profile_providers.dart
- apps/mobile/lib/features/social/presentation/creator/widgets/creator_stats_bar.dart
- apps/mobile/lib/features/social/presentation/creator/widgets/creator_post_grid.dart
- Route /creator/:handle in app_router.dart

Constraints:
- social-app (Creator Profile) scope ONLY; contract-first in packages/shared-contracts/
- No secrets in repo; coordinate with Dependencies — no duplicate services
- Escalate architecture forks via docs/adr/SH-000-template.md
- English in code; all user strings via app_en.arb i18n

Begin by stating your plan, then execute.
```
