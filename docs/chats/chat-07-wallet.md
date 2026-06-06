# Chat 7 — Wallet + Creator Economy

## Scope

Wallet ledger, gifts, coins, VIP, payouts, agency systems, creator monetization, fraud protection.

## Attach Folders

- `services/wallet-service/`
- `ai-agents/economy/`
- `ai-agents/creator-economy/`
- `ai-agents/gift-effects/`

## Primary Agents

| Agent | Path |
|-------|------|
| Wallet Ledger Agent | `ai-agents/economy/` (domain agents) |
| Gift Architecture | `ai-agents/gift-effects/` (domain agents) |
| Creator Payout | `ai-agents/creator-economy/` (domain agents) |
| Games Economy | `ai-agents/games/games-economy-agent.md` |

## Deliverables

- [ ] `services/wallet-service/` with double-entry ledger
- [ ] Gift send/receive APIs (idempotent)
- [ ] IAP receipt validation
- [ ] VIP tier system
- [ ] Creator payout pipeline
- [ ] Fraud detection hooks

## Phase Alignment

**Phase 3** — wallet and gifts. Requires Phase 1 auth + Phase 2 livestream rooms.

## Multi-Chat Ready

**Yes** (agents/docs) — **No** (implementation). Do not start before Phase 1 complete.
