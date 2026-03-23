// fub.ts — Follow Up Boss lead submission utility
// Reads FUB_CONFIG from window (set by /js/fub-config.js loaded in index.html)
// Falls back to Vite env vars if window.FUB_CONFIG is not present.

declare global {
  interface Window {
    FUB_CONFIG?: {
      pixelId?: string;
      apiKey?: string;
      felloUrl?: string;
      realscoutAgentId?: string;
      calendarUrl?: string;
      assignedTo?: string;
    };
  }
}

function getApiKey(): string {
  return window.FUB_CONFIG?.apiKey || import.meta.env.VITE_FUB_API_KEY || '';
}

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
}

export async function submitToFub(payload: FubLeadPayload): Promise<void> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('FUB API key not configured. Copy js/fub-config.EXAMPLE.js to js/fub-config.js and fill in your values.');
  }

  const noteParts: string[] = [];
  if (payload.interest) noteParts.push('Interest: ' + payload.interest);
  if (payload.language)  noteParts.push('Language: ' + payload.language);
  if (payload.message)   noteParts.push('Message: ' + payload.message);
  if (payload.extraNote) noteParts.push(payload.extraNote);

  const note = noteParts.join(' | ');

  const body: Record<string, unknown> = {
    source: payload.source,
    person: {
      firstName: payload.firstName,
      lastName:  payload.lastName || '',
      emails:    [{ value: payload.email }],
      phones:    payload.phone ? [{ value: payload.phone }] : [],
      tags:      [payload.interest || 'website-lead'],
    },
  };

  if (note) {
    body.message = note;
  }

  const assignedTo = window.FUB_CONFIG?.assignedTo || import.meta.env.VITE_FUB_ASSIGNED_TO;
  if (assignedTo) {
    body.assignedTo = assignedTo;
  }

  const res = await fetch('https://api.followupboss.com/v1/events', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('FUB API responded with status ' + res.status);
  }

  // Fire FUB data layer event if pixel is loaded
  if (typeof window !== 'undefined' && (window as any).fubDataLayer) {
    (window as any).fubDataLayer.push({ event: 'Lead' });
  }
}
