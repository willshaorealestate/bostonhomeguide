/**
 * parse.mjs — Extract market data from MLSPIN Area Market Survey page text.
 * Works on innerText() output from Playwright, which preserves tab whitespace.
 */

/**
 * Parse the area-wide report.
 * Returns: { activeListings, medianPrice, soldCount, dom, spLp }
 */
export function parseAreaReport(text) {
  const activeSection = extractSection(text, 'Active Listings', ['Price Changed Listings', 'Pending']);
  const activeMatch = activeSection.match(/Total Properties\s+([\d,]+)/);
  const activeListings = activeMatch ? toInt(activeMatch[1]) : 0;

  const soldSection = extractSection(text, 'Sold Listings', ['Expired Listings']);

  const medianMatch = soldSection.match(/Median Price:\s*\$([\d,]+)/);
  const medianPrice = medianMatch ? toInt(medianMatch[1]) : die('area sold median price');

  // Total row: Total Properties  N  Avg. DOM  Avg. DTO  $AvgSale   $AvgList  SPLP  ...
  const totalMatch = soldSection.match(
    /Total Properties\s+([\d,]+)\s+Avg\.\s+(\d+)\s+Avg\.\s+\d+\s+\$[\d,]+\s+\$[\d,]+\s+(\d+)/
  );
  const soldCount = totalMatch ? toInt(totalMatch[1]) : die('area sold count');
  const dom       = totalMatch ? Number(totalMatch[2]) : die('area DOM');
  const spLp      = totalMatch ? Number(totalMatch[3]) : die('area SP:LP');

  return { activeListings, medianPrice, soldCount, dom, spLp };
}

/**
 * Parse a single-town report.
 * Returns: { medianPrice, dom, spLp, inventory }
 */
export function parseTownReport(text) {
  const activeSection = extractSection(text, 'Active Listings', ['Price Changed Listings', 'Pending']);
  const activeMatch = activeSection.match(/Total Properties\s+([\d,]+)/);
  const inventory = activeMatch ? toInt(activeMatch[1]) : 0;

  const soldSection = extractSection(text, 'Sold Listings', ['Expired Listings']);

  const medianMatch = soldSection.match(/Median Price:\s*\$([\d,]+)/);
  const medianPrice = medianMatch ? toInt(medianMatch[1]) : die('town sold median price');

  const totalMatch = soldSection.match(
    /Total Properties\s+([\d,]+)\s+Avg\.\s+(\d+)\s+Avg\.\s+\d+\s+\$[\d,]+\s+\$[\d,]+\s+(\d+)/
  );
  const dom  = totalMatch ? Number(totalMatch[2]) : die('town DOM');
  const spLp = totalMatch ? Number(totalMatch[3]) : die('town SP:LP');

  return { medianPrice, dom, spLp, inventory };
}

function extractSection(text, start, endings) {
  const si = text.indexOf(start);
  if (si === -1) throw new Error(`Section not found: "${start}"`);
  let ei = text.length;
  for (const end of endings) {
    const pos = text.indexOf(end, si + start.length);
    if (pos !== -1 && pos < ei) ei = pos;
  }
  return text.slice(si, ei);
}

function toInt(s) { return parseInt(s.replace(/,/g, ''), 10); }
function die(field) { throw new Error(`Could not parse: ${field}`); }
