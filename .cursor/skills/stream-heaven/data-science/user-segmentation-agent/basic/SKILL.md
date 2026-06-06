---
name: stream-heaven-data-science-user-segmentation-agent-basic
description: >-
  Basic Cursor skill for Stream Heaven User Segmentation (phase 14).
  Single-agent execution with governance prefix and structural validation.
---

# User Segmentation — Basic

## When to use

- User invokes **User Segmentation** or work in **data-science** (phase 14)
- Focused task within this agent's scope

## Agent

- **Path:** `ai-agents/data-science/user-segmentation-agent.md`
- **Role:** User Segmentation Agent specialist for Stream Heaven's data-science domain, ensuring alignment with platform governance and the four-app ecosystem.

## Scope (basic)

- Load `platform-governance/MASTER-AI-OPERATING-SYSTEM.md` (or `MASTER-GOVERNANCE-PROMPT.md` for lighter sessions)
- Open agent: `ai-agents/data-science/user-segmentation-agent.md` and copy its `## Prompt Template` block
- Work within assigned path boundaries; contract-first in `packages/shared-contracts/`
- Run `node scripts/validate-agents.mjs` after editing agent markdown

## Role-specific skills

### ML Pipeline Fundamentals
Design:
- Design and implement data science capabilities for Stream Heaven. (User Segmentation scope)
- training data collection and labeling workflows
- feature store schema for reusable ML features
- model training pipeline with experiment tracking
- model versioning and artifact storage in S3
- offline evaluation metrics before deployment

### Feature Engineering
Build:
- user engagement feature extraction from event streams
- content embedding generation for similarity search
- temporal features for session and retention prediction
- feature freshness SLAs and backfill procedures
- PII-safe feature design with anonymization
- Follow platform-governance standards for all outputs.

### Model Serving
Deploy:
- inference API with p99 latency targets
- model A/B testing with traffic splitting
- fallback to heuristic ranking when model unavailable
- batch inference for nightly recommendation updates
- GPU vs CPU inference cost trade-off analysis
- Coordinate with dependent agents and shared packages.

### Vector Search Integration
Wire:
- embedding storage in vector database (pgvector/Pinecone)
- similarity search API for content discovery
- hybrid search combining text and vector scores
- index rebuild and incremental update strategies
- embedding dimension and model selection rationale

### ML Governance & Cost
Control:
- AI usage rules from platform-governance/ai-usage-rules.md
- GPU cluster budget caps and utilization monitoring
- model bias auditing for recommendation fairness
- data retention policies for training datasets
- model rollback procedures for quality regressions

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
```

## Related skills

- Basic: `.cursor/skills/stream-heaven/data-science/user-segmentation-agent/basic/SKILL.md`
- Advanced: `.cursor/skills/stream-heaven/data-science/user-segmentation-agent/advanced/SKILL.md`
- Index: `.cursor/skills/stream-heaven/README.md`
