// Checks prompts.js and index.html for common mistakes.
// Run locally with:  node scripts/validate-prompts.mjs
// Runs automatically on every push and pull request (see .github/workflows/validate.yml).

import { readFileSync } from "node:fs";
import vm from "node:vm";

const errors = [];
const warnings = [];
const err = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

// ---- Load prompts.js the same way the browser does ----
const source = readFileSync("prompts.js", "utf8");
const sandbox = { window: {} };
try {
  vm.runInNewContext(source, sandbox, { filename: "prompts.js" });
} catch (e) {
  console.error(`❌ prompts.js has a syntax error:\n   ${e.message}`);
  process.exit(1);
}
const prompts = sandbox.window.PROMPTS;
if (!Array.isArray(prompts) || prompts.length === 0) {
  console.error("❌ prompts.js must set window.PROMPTS to a non-empty array.");
  process.exit(1);
}

// ---- Sectors must have a matching tab in index.html ----
const html = readFileSync("index.html", "utf8");
const tabSectors = new Set(
  [...html.matchAll(/class="tab[^"]*"\s+data-sector="([^"]+)"/g)].map((m) => m[1])
);
tabSectors.delete("all");

// ---- Check each prompt ----
const REQUIRED = ["sector", "category", "title", "use", "prompt"];
const titles = new Map();

prompts.forEach((p, i) => {
  const where = `Prompt #${i + 1}${p && p.title ? ` ("${p.title}")` : ""}`;

  for (const field of REQUIRED) {
    if (typeof p[field] !== "string" || !p[field].trim()) {
      err(`${where}: missing or empty "${field}".`);
    }
  }
  const extra = Object.keys(p).filter((k) => !REQUIRED.includes(k));
  if (extra.length) warn(`${where}: unknown field(s) ${extra.join(", ")} (typo?).`);
  if (typeof p.prompt !== "string") return;

  if (p.sector && !tabSectors.has(p.sector)) {
    err(`${where}: sector "${p.sector}" has no tab in index.html. Add a <button class="tab" data-sector="${p.sector}">.`);
  }

  const key = (p.title || "").trim().toLowerCase();
  if (titles.has(key)) err(`${where}: duplicate title (also prompt #${titles.get(key)}). Titles must be unique.`);
  else titles.set(key, i + 1);

  // Brackets: balanced, not nested, not empty
  let depth = 0;
  let bracketError = false;
  for (const ch of p.prompt) {
    if (ch === "[") depth++;
    if (ch === "]") depth--;
    if (depth > 1) { err(`${where}: nested [brackets] aren't supported.`); bracketError = true; break; }
    if (depth < 0) { err(`${where}: a "]" has no matching "[".`); bracketError = true; break; }
  }
  if (!bracketError && depth > 0) err(`${where}: a "[" is never closed.`);
  if (/\[\s*\]/.test(p.prompt)) err(`${where}: empty placeholder "[]".`);

  const placeholders = p.prompt.match(/\[[^\]]+\]/g) || [];
  if (placeholders.length === 0) warn(`${where}: has no [PLACEHOLDERS], so the builder will show no fields.`);
  for (const ph of placeholders) {
    if (/^\[(ASSUMPTION|CONFIRM|NOTE|TODO)\b/i.test(ph)) {
      warn(`${where}: ${ph} looks like a marker for the AI to write. Use (PARENTHESES) so it doesn't become a form field.`);
    }
  }

  // Privacy: catch real-looking personal data pasted by accident
  const pii = [
    [/\b\d{3}-\d{2}-\d{4}\b/, "something that looks like a Social Security number"],
    [/[\w.+-]+@[\w-]+\.[\w.]+/, "an email address"],
    [/\b(?:\d[ -]?){13,16}\b/, "a long number that could be a card or account number"]
  ];
  for (const [re, what] of pii) {
    if (re.test(p.prompt) || re.test(p.use)) err(`${where}: contains ${what}. Remove real personal data.`);
  }
});

// ---- Cache-busting versions in index.html should match ----
const versions = [...html.matchAll(/(styles\.css|prompts\.js|app\.js)\?v=(\d+)/g)];
const distinct = new Set(versions.map((m) => m[2]));
if (versions.length < 3) warn('index.html: expected ?v= on styles.css, prompts.js and app.js.');
if (distinct.size > 1) {
  err(`index.html: cache-busting versions don't match (${versions.map((m) => `${m[1]}?v=${m[2]}`).join(", ")}).`);
}

// ---- Report ----
const bySector = {};
for (const p of prompts) bySector[p.sector] = (bySector[p.sector] || 0) + 1;

console.log(`Checked ${prompts.length} prompts: ${Object.entries(bySector).map(([s, n]) => `${s} ${n}`).join(", ")}`);
for (const w of warnings) console.log(`⚠️  ${w}`);
for (const e of errors) console.log(`❌ ${e}`);

if (errors.length) {
  console.log(`\n${errors.length} error(s) found.`);
  process.exit(1);
}
console.log(`✅ All checks passed${warnings.length ? ` (${warnings.length} warning(s))` : ""}.`);
