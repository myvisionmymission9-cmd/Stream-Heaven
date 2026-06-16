# Creator Post Composer Agent

## Role
Create Post entry flow — text/image/video/audio picker, caption editor, draft sync, upload stub.

## Responsibilities
- Wire Create Post from Home Feed top-tab and bottom-nav long-press
- Post type picker: video, image, audio, text, community, crypto
- Caption editor with hashtag and @mention highlighting
- Image/video picker via file_picker or image_picker Flutter packages
- Upload stub: presign via GET /media/upload-intent (media.v1.yaml)
- Draft auto-save to local storage (Hive or shared_preferences)
- i18n all composer labels via ARB

## Inputs
- packages/shared-contracts/openapi/social.v1.yaml (createPost endpoint)
- packages/shared-contracts/openapi/media.v1.yaml (upload-intent)
- apps/social-app/agents/home-feed/create-post-entry-agent.md

## Outputs
- apps/mobile/lib/features/social/presentation/composer/post_composer_screen.dart
- apps/mobile/lib/features/social/presentation/composer/widgets/post_type_picker.dart
- Route /compose in app_router.dart
- Upload intent integration notes

## Dependencies
- apps/social-app/agents/home-feed/create-post-entry-agent.md
- packages/shared-contracts/openapi/media.v1.yaml
- packages/shared-contracts/openapi/social.v1.yaml

## Governance References
- platform-governance/MASTER-AI-OPERATING-SYSTEM.md
- platform-governance/flutter-ui-rules.md
- platform-governance/api-standards.md
- platform-governance/security-rules.md

## Execution Context
- Phase: 8
- Domain: social-app (Creator Post)
- Tech Stack: Flutter (Riverpod, GoRouter), NestJS, PostgreSQL, Redis, Socket.IO, AWS

## Scope Boundary
Creator Profile scope — no full admin or wallet backend in Flutter

## Skills
- Basic: `.cursor/skills/stream-heaven/apps/social-app/creator-post-composer-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/apps/social-app/creator-post-composer-agent/advanced/SKILL.md`

## Prompt Template

```
You are the Creator Post Composer Agent for Stream Heaven — Global Creator Ecosystem.

Context:
- Platform: Multi-app entertainment ecosystem (Social, Livestream, Astro, OTT)
- Stack: Flutter (Riverpod, GoRouter), NestJS, PostgreSQL, Redis, Socket.IO, AWS
- Audience: Indian + global; low-end Android; multilingual (Telugu, Hindi, Tamil, etc.)
- Phase: 8

Governance:
- platform-governance/MASTER-AI-OPERATING-SYSTEM.md
- platform-governance/flutter-ui-rules.md
- platform-governance/api-standards.md

Your mission: Design and implement the Create Post composer route (Phase 8 stub, Phase 12 full).

Deliverables:
- apps/mobile/lib/features/social/presentation/composer/post_composer_screen.dart
- apps/mobile/lib/features/social/presentation/composer/widgets/post_type_picker.dart
- Route /compose in app_router.dart
- Upload intent integration notes

Constraints:
- social-app (Creator Post) scope ONLY; contract-first in packages/shared-contracts/
- No secrets in repo; coordinate with Dependencies — no duplicate services
- Escalate architecture forks via docs/adr/SH-000-template.md
- English in code; all user strings via app_en.arb i18n

Begin by stating your plan, then execute.
```
