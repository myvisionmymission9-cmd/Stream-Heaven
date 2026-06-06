# Chat 4 — Realtime + Livestream

## Scope

Socket.IO scaling, livestream rooms, PK battles, audio rooms, realtime gifts, presence, Redis pub/sub, Agora/Zego integration.

## Attach Folders

- `services/livestream-service/`
- `apps/livestream-app/`
- `ai-agents/core-engineering/realtime/`
- `apps/livestream-app/agents/`

## Primary Agents

| Agent | Path |
|-------|------|
| Socket.IO Architect | `ai-agents/core-engineering/realtime/socketio-architect.md` |
| Livestream Architect | `apps/livestream-app/agents/core/livestream-architect.md` |
| PK Battle Agent | `apps/livestream-app/agents/multi-guest/pk-battle-agent.md` |
| Agora Integration | `apps/livestream-app/agents/video-systems/agora-integration-agent.md` |
| Presence Manager | `ai-agents/core-engineering/realtime/presence-manager.md` |

## Deliverables

- [ ] Socket.IO gateway with Redis adapter
- [ ] Realtime event contracts (AsyncAPI)
- [ ] Room lifecycle (create, join, leave, destroy)
- [ ] PK battle synchronization
- [ ] Reconnect strategy and state snapshots
- [ ] Agora/Zego token generation

## Phase Alignment

**Phase 1** — Socket.IO foundation + presence. **Phase 2** — full livestream + PK.

## Multi-Chat Ready

**Yes** (agents/docs) — **No** (implementation). Depends on Chat 3 auth/gateway.
