/*
 * pageTrail.ts — remembers how a visitor got to a form, so leads in Follow Up Boss say
 * where they came from: the outside site that sent them (e.g. google.com), the first page
 * they landed on, and the page they were on right before the current one.
 *
 * Kept in sessionStorage (this browser tab only, cleared when it closes), with an in-memory
 * fallback when storage is blocked. Only paths and the referring site's domain are kept.
 */
const KEY = "bhg-page-trail";

type Trail = { entryFrom: string; landing: string; previous: string; current: string };

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

/** The outside site that sent the visitor, as a bare domain ("" when typed in or unknown). */
function externalReferrer(): string {
  try {
    if (!document.referrer) return "";
    const ref = new URL(document.referrer);
    return ref.host === window.location.host ? "" : ref.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/** Call on every route change with the new path. */
export function recordPage(path: string) {
  const t = read();
  if (!t) {
    write({ entryFrom: externalReferrer(), landing: path, previous: "", current: path });
    return;
  }
  if (t.current === path) return;
  write({ ...t, previous: t.current, current: path });
}

/** How the visitor reached the current page, for a lead note. Empty strings when unknown. */
export function pageTrail(): { entryFrom: string; landing: string; previous: string } {
  const t = read();
  return { entryFrom: t?.entryFrom ?? "", landing: t?.landing ?? "", previous: t?.previous ?? "" };
}
