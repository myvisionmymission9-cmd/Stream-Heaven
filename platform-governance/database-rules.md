# Stream Heaven Database Rules

## Purpose


PostgreSQL 15+ is the system of record per microservice (database-per-service). Redis 7+ for cache, rate limits, Socket.IO adapter, and ephemeral locks.

## Ownership


| Table / domain | Service | Notes |
| --- | --- | --- |
| users | user-service | id UUID PK | PII — encrypt phone at rest |
| profiles | user-service | user_id FK | display_name, locale, avatar_s3_key |
| posts | social-service | id, author_id | soft delete, moderation_state |
| live_rooms | livestream-service | id, host_id | status enum: scheduled,live,ended |
| gifts_ledger | wallet-service | idempotency_key UNIQUE | append-only |
| coin_balances | wallet-service | user_id PK | optimistic locking version |
| media_titles | media-service | id | geo_rights JSONB |
| entitlements | media-service | user_id, title_id | expires_at |
| notifications_inbox | notification-service | id | read_at nullable |
| otp_attempts | auth-service | phone_hash | rate limit index |



## Global Rules


1. **No cross-service FK** — use `user_id` UUID reference only
2. **UUID v7** preferred for time-sortable IDs (or ULID in events)
3. **Timestamps** — `created_at`, `updated_at` TIMESTAMPTZ UTC; `deleted_at` for soft delete
4. **Migrations** — TypeORM migrations only; never hand-edit prod
5. **Naming** — snake_case plural tables; `idx_{table}_{cols}`

## Migration Workflow


- [ ] Create migration in service repo: pnpm --filter auth-service migration:generate
- [ ] Review SQL in PR — no full table scan without CONCURRENTLY
- [ ] Backup snapshot tag recorded in deploy ticket
- [ ] Apply staging → smoke tests → prod during low-traffic window (IST 03:00–05:00)
- [ ] Rollback script prepared for destructive changes



## Indexing Standards


| Query pattern | Index type | Example |
| --- | --- | --- |
| Feed by following | B-tree composite | idx_posts_author_created ON posts(author_id, created_at DESC) |
| Live rooms live now | Partial | WHERE status = 'live' |
| Wallet history | BRIN or partition | Monthly partition on gifts_ledger |
| OTP lookup | Hash unique | phone_hash |



## Query Rules


- **N+1 forbidden** in hot paths — use JOIN or DataLoader pattern
- **Pagination** — cursor-based (`created_at, id`) not OFFSET for feeds
- **Statement timeout** — 5s default; 30s for reporting role only
- **Read replicas** — social feed reads only; wallet writes to primary always

## Redis Key Conventions


```text
sh:{service}:{entity}:{id}           # e.g. sh:live:room:abc-uuid
sh:ratelimit:{endpoint}:{userId}   # TTL 60s
sh:otp:{phone_hash}                # TTL 300s, max 3 attempts
sh:socket:session:{sessionId}      # TTL 24h
```



## Transactions


- **wallet-service:** SERIALIZABLE for debit+credit pairs; idempotency_key dedupe
- **livestream-service:** READ COMMITTED for room state; distributed lock Redis for PK battles
- **Outbox table** `domain_events` in each service — polled to Redis stream

## PII & Retention


| Data | Retention | Deletion |
| --- | --- | --- |
| Phone number | Life of account + 90d | Crypto-shred on account delete |
| OTP logs | 24 hours | Auto-expire |
| DM content | Until user deletes | social-service purge job |
| Astro consultation notes | 7 years legal | Anonymize astrologer_id optional |
| OTT watch history | 2 years | User export then delete |



## Sample Entity — live_rooms


```typescript
@Entity('live_rooms')
export class LiveRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  hostId: string;

  @Column({ type: 'enum', enum: LiveRoomStatus })
  status: LiveRoomStatus;

  @Column({ nullable: true })
  agoraChannelName: string;

  @Column('int', { default: 0 })
  viewerCountCached: number;

  @CreateDateColumn()
  createdAt: Date;
}
```



## Sample Query — cursor feed


```sql
SELECT id, author_id, body, created_at
FROM posts
WHERE author_id = ANY($1::uuid[])
  AND (created_at, id) < ($2::timestamptz, $3::uuid)
  AND deleted_at IS NULL
ORDER BY created_at DESC, id DESC
LIMIT 20;
```



## Backup & DR


- RDS automated backups 35 days; PITR enabled
- Redis cluster AOF + snapshot every 6h
- Cross-region read replica (ap-south-1 → ap-southeast-1) for media catalog read-only

## Forbidden


- `SELECT *` in production hot paths without column list
- Storing Agora/Zego secrets in PostgreSQL
- JSON blobs > 1MB without offload to S3
- Triggers that call external HTTP

### api-gateway — DB checklist

- [ ] Dedicated RDS schema or database for api-gateway
- [ ] Connection pool max 20 per pod
- [ ] health check includes migration version
- [ ] No shared DB user across services

### auth-service — DB checklist

- [ ] Dedicated RDS schema or database for auth-service
- [ ] Connection pool max 20 per pod
- [ ] health check includes migration version
- [ ] No shared DB user across services

### user-service — DB checklist

- [ ] Dedicated RDS schema or database for user-service
- [ ] Connection pool max 20 per pod
- [ ] health check includes migration version
- [ ] No shared DB user across services

### social-service — DB checklist

- [ ] Dedicated RDS schema or database for social-service
- [ ] Connection pool max 20 per pod
- [ ] health check includes migration version
- [ ] No shared DB user across services

### livestream-service — DB checklist

- [ ] Dedicated RDS schema or database for livestream-service
- [ ] Connection pool max 20 per pod
- [ ] health check includes migration version
- [ ] No shared DB user across services

### wallet-service — DB checklist

- [ ] Dedicated RDS schema or database for wallet-service
- [ ] Connection pool max 20 per pod
- [ ] health check includes migration version
- [ ] No shared DB user across services

### media-service — DB checklist

- [ ] Dedicated RDS schema or database for media-service
- [ ] Connection pool max 20 per pod
- [ ] health check includes migration version
- [ ] No shared DB user across services

### notification-service — DB checklist

- [ ] Dedicated RDS schema or database for notification-service
- [ ] Connection pool max 20 per pod
- [ ] health check includes migration version
- [ ] No shared DB user across services

---
*Stream Heaven Platform Governance — database-rules.md v1.0 — Generated 2026-05-29*
