/**
 * towns.mjs — The towns the monthly MLSPIN job pulls, in one place.
 *
 * Every town with a page in client/src/data/neighborhoods.ts, plus a few extra
 * towns that only appear in the Market page comparison. Names must match the
 * MLSPIN town list exactly ("Lexington" -> "Lexington, MA").
 *
 * Allston/Brighton is skipped: MLSPIN files it under Boston, and the mShare
 * report form can't filter by Boston neighborhood.
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';

const NEIGHBORHOODS_TS = resolve(import.meta.dirname, '../../client/src/data/neighborhoods.ts');

const SKIP = new Set(['Allston/Brighton']);
const EXTRA = ['Watertown', 'Burlington'];

const siteTowns = [...readFileSync(NEIGHBORHOODS_TS, 'utf8').matchAll(/\n    name: "([^"]+)",/g)]
  .map((m) => m[1])
  .filter((name) => !SKIP.has(name));

export const TOWNS = [...new Set([...siteTowns, ...EXTRA])];
