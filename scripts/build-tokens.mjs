/**
 * build-tokens.mjs
 * Reads specs/tokens/*.json and regenerates the :root block in src/app/globals.css.
 *
 * Run:  node scripts/build-tokens.mjs
 * Auto: wired to `prebuild` in package.json so it runs before every `next build`.
 *
 * Idempotent — running twice produces no diff.
 * Preserves all non-token CSS (@media, @theme, keyframes, utilities, base styles).
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath }               from 'node:url';
import { dirname, join }               from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');

const TOKEN_DIR = join(ROOT, 'specs', 'tokens');
const CSS_PATH  = join(ROOT, 'src', 'app', 'globals.css');

/** Ordered list of token files — controls output order in :root. */
const FILE_ORDER = ['color', 'spacing', 'typography', 'motion', 'shadow', 'z-index'];

const BEGIN_MARKER = '/* BEGIN GENERATED TOKENS */';
const END_MARKER   = '/* END GENERATED TOKENS */';

// ── Token walker ──────────────────────────────────────────────────────────────
/**
 * Recursive generator. Yields { cssVar, cssValue } for every node that carries
 * a `cssVar` property. Stops recursion at those nodes (never descends into
 * a token's own metadata fields). Skips `comment` keys and non-object values.
 *
 * cssValue priority: `value` field → `resolves` field (matching JSON schema).
 */
function* walkTokens(node) {
  if (node === null || typeof node !== 'object' || Array.isArray(node)) return;

  if ('cssVar' in node) {
    // This is a leaf token node.
    const cssValue = node.value ?? node.resolves;
    if (cssValue !== undefined) {
      yield { cssVar: node.cssVar, cssValue: String(cssValue) };
    }
    return; // do not recurse into metadata fields (comment, engine, duration, etc.)
  }

  for (const [key, child] of Object.entries(node)) {
    if (key === 'comment') continue;
    yield* walkTokens(child);
  }
}

// ── :root block generator ─────────────────────────────────────────────────────
function generateRootBlock() {
  const files = FILE_ORDER.map(name => ({
    name,
    data: JSON.parse(readFileSync(join(TOKEN_DIR, `${name}.json`), 'utf8')),
  }));

  const lines = [':root {'];

  // ── Pass 1: primitives ───────────────────────────────────────────────────
  lines.push('');
  lines.push('  /* ─── Primitives ─────────────────────────────────────────── */');

  for (const { name, data } of files) {
    if (!data.primitive) continue;
    const tokens = [...walkTokens(data.primitive)];
    if (tokens.length === 0) continue;
    lines.push('');
    lines.push(`  /* ${name} */`);
    for (const { cssVar, cssValue } of tokens) {
      lines.push(`  ${cssVar}: ${cssValue};`);
    }
  }

  // ── Pass 2: semantics ────────────────────────────────────────────────────
  lines.push('');
  lines.push('  /* ─── Semantic ──────────────────────────────────────────── */');

  for (const { name, data } of files) {
    if (!data.semantic) continue;
    const tokens = [...walkTokens(data.semantic)];
    if (tokens.length === 0) continue;
    lines.push('');
    lines.push(`  /* ${name} */`);
    for (const { cssVar, cssValue } of tokens) {
      lines.push(`  ${cssVar}: ${cssValue};`);
    }
  }

  lines.push('}');
  return lines.join('\n');
}

// ── CSS patcher ───────────────────────────────────────────────────────────────
/**
 * Replaces the generated token block inside globals.css.
 *
 * Idempotent case  — markers already present: splice between them.
 * First-run case   — no markers: find the region between @import and the first
 *                    top-level @media / @theme block, then replace it.
 *                    Scans backwards from the @media line to include any
 *                    leading comment and blank lines in the preserved `after`
 *                    section so they aren't lost.
 */
function patchCss(css, block) {
  const beginIdx = css.indexOf(BEGIN_MARKER);
  const endIdx   = css.indexOf(END_MARKER);

  if (beginIdx !== -1 && endIdx !== -1) {
    // Idempotent: replace only the content between the markers.
    return (
      css.slice(0, beginIdx) +
      BEGIN_MARKER + '\n' + block + '\n' + END_MARKER +
      css.slice(endIdx + END_MARKER.length)
    );
  }

  // ── First run ─────────────────────────────────────────────────────────────
  const cssLines = css.split('\n');

  // Find the @import line.
  let importLineIdx = -1;
  for (let i = 0; i < cssLines.length; i++) {
    if (cssLines[i].startsWith('@import ')) { importLineIdx = i; break; }
  }
  if (importLineIdx === -1) throw new Error('globals.css: could not find @import line');

  // Find the first top-level @media or @theme (brace depth 0).
  let braceDepth = 0;
  let mediaLineIdx = -1;
  for (let i = importLineIdx + 1; i < cssLines.length; i++) {
    const line = cssLines[i];
    if (braceDepth === 0 && (line.startsWith('@media ') || line.startsWith('@theme '))) {
      mediaLineIdx = i;
      break;
    }
    for (const ch of line) {
      if (ch === '{') braceDepth++;
      else if (ch === '}') braceDepth--;
    }
  }
  if (mediaLineIdx === -1) throw new Error('globals.css: could not find @media / @theme boundary');

  // Scan back from the @media line to include preceding comments and blanks
  // in the preserved `after` section (so they are not silently dropped).
  let insertBeforeLine = mediaLineIdx;
  while (insertBeforeLine > importLineIdx + 1) {
    const prev = cssLines[insertBeforeLine - 1].trim();
    if (prev === '' || prev.startsWith('/*') || prev.startsWith('*') || prev.endsWith('*/')) {
      insertBeforeLine--;
    } else {
      break;
    }
  }

  const before = cssLines.slice(0, importLineIdx + 1).join('\n');
  const after  = cssLines.slice(insertBeforeLine).join('\n');

  return (
    before +
    '\n\n' + BEGIN_MARKER + '\n' + block + '\n' + END_MARKER + '\n\n' +
    after
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
const block    = generateRootBlock();
const original = readFileSync(CSS_PATH, 'utf8');
const patched  = patchCss(original, block);

if (patched === original) {
  console.log('build:tokens — no changes (already up to date)');
} else {
  writeFileSync(CSS_PATH, patched, 'utf8');
  console.log('build:tokens — globals.css updated');
}
