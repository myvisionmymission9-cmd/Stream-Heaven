#!/usr/bin/env node
/**
 * OpenAPI → TypeScript codegen placeholder.
 * Full codegen (openapi-typescript or @hey-api/openapi-ts) deferred to Phase 2.
 * Run: pnpm run contracts:generate
 */
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, '..', 'shared-types', 'src', 'generated', 'contracts.stub.ts');

const stub = `/**
 * AUTO-GENERATED STUB — replace with openapi-typescript output in Phase 2.
 * Source: packages/shared-contracts/openapi/*.yaml
 * Run: pnpm run contracts:generate
 */
export type ContractsCodegenPending = true;
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, stub, 'utf8');
console.log('Wrote contracts codegen stub:', OUT);
console.log('TODO Phase 2: wire openapi-typescript from bundled OpenAPI specs.');
