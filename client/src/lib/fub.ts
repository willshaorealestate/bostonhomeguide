// fub.ts — Follow Up Boss lead submission utility
// Leads go to a small Google Apps Script relay (scripts/lead-relay/Code.gs, in Will's
// business Google account) that holds the Follow Up Boss API key and forwards the lead.
// The key must never be in the website: everything in this bundle is public.
// Other settings come from FUB_CONFIG on window (/js/fub-config.js) or Vite env vars.

declare global {
  interface Window {
    FUB_CONFIG?: {
      pixelId?: string;
      leadRelayUrl?: string;
      felloUrl?: string;
      realscoutAgentId?: string;
      calendarUrl?: string;
      assignedTo?: string;
    };
  }
}

/** The Apps Script web app URL (not a secret: it can only create leads) */
const LEAD_RELAY_URL = 'https://script.google.com/macros/s/AKfycbw6nuYqt7h_0RUvf3C94gUNhDz76WbDwJpcOjkVBOcxMIADJxuCklrS_aR0UoxtayXi/exec';

function getRelayUrl(): string {
  return window.FUB_CONFIG?.leadRelayUrl || import.meta.env.VITE_LEAD_RELAY_URL || LEAD_RELAY_URL;
}

import { pageTrail, visitStart } from './pageTrail';

export function getFelloUrl(): string {
  return window.FUB_CONFIG?.felloUrl || import.meta.env.VITE_FELLO_URL || 'https://consumer.hifello.com/lp/69a0591ae983dff8dafd6b6f';
}

const FAKE_PHONES = new Set(['1234567890','0987654321','1111111111','2222222222','3333333333','4444444444','5555555555','6666666666','7777777777','8888888888','9999999999','0000000000']);

export function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 11) return false;
  const ten = digits.length === 11 ? digits.slice(1) : digits;
  if (FAKE_PHONES.has(ten)) return false;
  // area code and exchange can't start with 0 or 1
  if (ten[0] === '0' || ten[0] === '1') return false;
  if (ten[3] === '0' || ten[3] === '1') return false;
  return true;
}

export interface FubLeadPayload {
  source: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  interest?: string;
  language?: string;
  message?: string;
  /** Extra fields merged into the note */
  extraNote?: string;
  /** Tags added alongside the interest tag, e.g. the town a listing-alert signup came from */
  extraTags?: string[];
}

export async function submitToFub(payload: FubLeadPayload): Promise<void> {
  const relayUrl = getRelayUrl();
  if (!relayUrl.startsWith('https://')) {
    throw new Error('Lead relay URL not configured (LEAD_RELAY_URL in client/src/lib/fub.ts).');
  }

  const noteParts: string[] = [];
  if (payload.interest) noteParts.push('Interest: ' + payload.interest);
  if (payload.language)  noteParts.push('Language: ' + payload.language);
  if (payload.message)   noteParts.push('Message: ' + payload.message);
  if (payload.extraNote) noteParts.push(payload.extraNote);

  // How the visitor got to this form (every form on the site)
  const start = visitStart();
  const trail = pageTrail();
  if (start) noteParts.push('Visit started from: ' + start.label);
  if (trail.landing && trail.landing !== trail.current && trail.landing !== trail.previous) noteParts.push('First page this visit: ' + trail.landing);
  if (trail.previous) noteParts.push('Page before the form: ' + trail.previous);
  if (trail.current) noteParts.push('Form submitted on: ' + trail.current);

  const note = noteParts.join(' | ');

  const body: Record<string, unknown> = {
    source: payload.source,
    person: {
      firstName: payload.firstName,
      lastName:  payload.lastName || '',
      emails:    [{ value: payload.email }],
      phones:    payload.phone ? [{ value: payload.phone }] : [],
      tags:      [payload.interest || 'website-lead', ...(payload.extraTags ?? []), ...(start?.isAI ? ['AI referral'] : [])],
    },
  };

  if (note) {
    body.message = note;
  }

  const assignedTo = window.FUB_CONFIG?.assignedTo || import.meta.env.VITE_FUB_ASSIGNED_TO;
  if (assignedTo) {
    body.assignedTo = assignedTo;
  }

  // text/plain keeps this a "simple" request, which Apps Script accepts from another site
  const res = await fetch(relayUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body),
  });
  const result = (await res.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
  if (!res.ok || !result?.ok) {
    throw new Error('Lead relay: ' + (result?.message || 'status ' + res.status));
  }

  // Fire FUB data layer event if pixel is loaded
  if (typeof window !== 'undefined' && (window as any).fubDataLayer) {
    (window as any).fubDataLayer.push({ event: 'Lead' });
  }
}
