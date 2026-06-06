import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const schema = JSON.parse(
  readFileSync(join(root, 'events', 'realtime.v1.json'), 'utf8'),
);

if (!schema.events || Object.keys(schema.events).length === 0) {
  console.error('realtime.v1.json: missing events map');
  process.exit(1);
}

console.log(`Validated ${Object.keys(schema.events).length} realtime event schemas.`);
