/**
 * BostonHomeGuide.com lead relay (Google Apps Script, in Will's business Google account)
 *
 * The website's forms send each new lead here instead of straight to Follow Up Boss, so the
 * Follow Up Boss API key never appears in the website's code. This script adds the key and
 * passes the lead on. It can only create leads (POST /v1/events); it never reads anything.
 *
 * Setup (once): Project Settings → Script Properties → add FUB_API_KEY = your Follow Up Boss API key
 * (the plain key from Follow Up Boss → Admin → API, not base64). Then Deploy → New deployment →
 * Web app, Execute as: Me, Who has access: Anyone. The /exec URL goes in client/src/lib/fub.ts.
 *
 * To rotate the key: paste the new one into Script Properties. No redeploy or site change needed.
 * A copy of this file lives in the website repo at scripts/lead-relay/Code.gs.
 */

const FUB_EVENTS_URL = 'https://api.followupboss.com/v1/events';

function doPost(e) {
  try {
    const key = PropertiesService.getScriptProperties().getProperty('FUB_API_KEY');
    if (!key) return reply_(500, 'Lead relay is not set up yet');

    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const p = data.person || {};
    const email = text_(p.emails && p.emails[0] && p.emails[0].value, 200).trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return reply_(400, 'A valid email is required');

    // Only pass along the fields the website's forms send, with sensible length limits
    const event = {
      source: text_(data.source, 200) || 'BostonHomeGuide.com',
      person: {
        firstName: text_(p.firstName, 100),
        lastName: text_(p.lastName, 100),
        emails: [{ value: email }],
        phones: (p.phones || []).slice(0, 2).map(function (ph) { return { value: text_(ph && ph.value, 40) }; })
          .filter(function (ph) { return ph.value; }),
        tags: (p.tags || []).slice(0, 10).map(function (t) { return text_(t, 60); }).filter(String),
      },
    };
    if (data.message) event.message = text_(data.message, 5000);
    if (data.assignedTo) event.assignedTo = text_(data.assignedTo, 200);

    const res = UrlFetchApp.fetch(FUB_EVENTS_URL, {
      method: 'post',
      contentType: 'application/json',
      headers: { Authorization: 'Basic ' + Utilities.base64Encode(key.trim() + ':') },
      payload: JSON.stringify(event),
      muteHttpExceptions: true,
    });
    const status = res.getResponseCode();
    if (status >= 200 && status < 300) return reply_(200, 'ok');
    console.error('Follow Up Boss responded ' + status + ': ' + res.getContentText().slice(0, 500));
    return reply_(502, 'Follow Up Boss responded with status ' + status);
  } catch (err) {
    console.error(err);
    return reply_(500, 'Could not send the lead');
  }
}

// Visiting the URL in a browser just confirms the relay is running
function doGet() {
  const ready = !!PropertiesService.getScriptProperties().getProperty('FUB_API_KEY');
  return reply_(200, ready ? 'Lead relay is running' : 'Lead relay is running, but FUB_API_KEY is not set');
}

function text_(v, max) {
  return v == null ? '' : String(v).slice(0, max);
}

function reply_(status, message) {
  return ContentService.createTextOutput(JSON.stringify({ ok: status === 200, status: status, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
}
