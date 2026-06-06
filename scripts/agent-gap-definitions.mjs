import { LIVESTREAM_CORE, LIVESTREAM_VIDEO } from './agent-gap-definitions-part1.mjs';
import { LIVESTREAM_MULTI_GUEST, LIVESTREAM_OPS } from './agent-gap-definitions-part2.mjs';
import { LIVESTREAM_ECONOMY, GIFT_RENDERING } from './agent-gap-definitions-part3.mjs';
import { GIFT_AUDIO, GIFT_FX } from './agent-gap-definitions-part4.mjs';
import { IDENTITY, EVENT_SYSTEM, AGENT_MEMORY } from './agent-gap-definitions-part5.mjs';
import { SAFETY, TESTING } from './agent-gap-definitions-part6.mjs';
import { CORE_ENGINEERING, STORE_GROWTH } from './agent-gap-definitions-part7.mjs';

export const AGENT_DEFINITIONS = [
  ...LIVESTREAM_CORE,
  ...LIVESTREAM_VIDEO,
  ...LIVESTREAM_MULTI_GUEST,
  ...LIVESTREAM_OPS,
  ...LIVESTREAM_ECONOMY,
  ...GIFT_RENDERING,
  ...GIFT_AUDIO,
  ...GIFT_FX,
  ...IDENTITY,
  ...EVENT_SYSTEM,
  ...AGENT_MEMORY,
  ...SAFETY,
  ...TESTING,
  ...CORE_ENGINEERING,
  ...STORE_GROWTH,
];
