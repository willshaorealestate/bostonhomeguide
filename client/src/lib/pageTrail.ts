/*
 * pageTrail.ts — remembers how a visitor got to a form, so every lead in Follow Up Boss says
 * where it came from: what started the visit (Google, Zillow, ChatGPT and other AI assistants),
 * the first page they landed on, the page before the form, and the page the form is on.
 *
 * Kept in sessionStorage (this browser tab only, cleared when it closes), with an in-memory
 * fallback when storage is blocked. Only page paths, the referring site's domain and the
 * link's utm_source tag are kept.
 */
const KEY = "bhg-page-trail";

type Trail = {
  /** Referring site's domain when the visit started, e.g. "chatgpt.com" ("" when none) */
  entryFrom: string;
  /** utm_source on the first page's link, e.g. "chatgpt.com" ("" when none) */
  entrySource: string;
  landing: string;
  previous: string;
  current: string;
};

let memory: Trail | null = null;

function read(): Trail | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Trail;
  } catch {
    /* storage blocked: fall back to memory */
  }
  return memory;
}

function write(t: Trail) {
  memory = t;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(t));
  } catch {
    /* storage blocked: memory copy is enough for this page view */
  }
}

/** The outside site that sent the visitor, as a bare domain ("" when typed in, stripped or unknown). */
function externalReferrer(): string {
  try {
    if (!document.referrer) return "";
    const ref = new URL(document.referrer);
    return ref.host === window.location.host ? "" : ref.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function utmSource(): string {
  try {
    return (new URLSearchParams(window.location.search).get("utm_source") ?? "").trim().toLowerCase().slice(0, 60);
  } catch {
    return "";
  }
}

/** Call on every route change with the new path. */
export function recordPage(path: string) {
  const t = read();
  if (!t) {
    write({ entryFrom: externalReferrer(), entrySource: utmSource(), landing: path, previous: "", current: path });
    return;
  }
  if (t.current === path) return;
  write({ ...t, previous: t.current, current: path });
}

// AI assistants, matched against the referring domain or the utm_source tag
const AI_SOURCES: Array<[RegExp, string]> = [
  [/(^|\.)chatgpt\.com$|(^|\.)openai\.com$|^chatgpt$/, "ChatGPT"],
  [/^gemini\.google\.com$|^bard\.google\.com$|^gemini$/, "Gemini"],
  [/(^|\.)perplexity\.ai$|^perplexity$/, "Perplexity"],
  [/(^|\.)claude\.ai$|^claude$/, "Claude"],
  [/^copilot\.microsoft\.com$|(^|\.)copilot\.com$|^copilot$/, "Microsoft Copilot"],
  [/(^|\.)deepseek\.com$/, "DeepSeek"],
  [/(^|\.)meta\.ai$/, "Meta AI"],
  [/(^|\.)grok\.com$/, "Grok"],
];

export type VisitStart = { label: string; isAI: boolean };

/** What started the visit, in plain words ("ChatGPT (AI assistant)", "google.com"), or null when unknown. */
export function visitStart(): VisitStart | null {
  const t = read();
  if (!t) return null;
  for (const candidate of [t.entrySource, t.entryFrom]) {
    if (!candidate) continue;
    const hit = AI_SOURCES.find(([re]) => re.test(candidate));
    if (hit) return { label: `${hit[1]} (AI assistant)`, isAI: true };
  }
  const plain = t.entryFrom || t.entrySource;
  return plain ? { label: plain, isAI: false } : null;
}

/** How the visitor reached the current page. Empty strings when unknown. */
export function pageTrail(): { landing: string; previous: string; current: string } {
  const t = read();
  return { landing: t?.landing ?? "", previous: t?.previous ?? "", current: t?.current ?? "" };
}
