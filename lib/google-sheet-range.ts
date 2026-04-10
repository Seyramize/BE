/**
 * Builds A1 range for spreadsheets.values.append.
 * Set GOOGLE_SHEET_RANGE to the full range (e.g. 'My Tab'!A:H) if the tab name has spaces.
 * Or set GOOGLE_SHEET_TAB to the tab name only (default Sheet1).
 */
export function buildSheetAppendRange(): string {
  const full = process.env.GOOGLE_SHEET_RANGE?.trim();
  if (full) return full;

  const tab = process.env.GOOGLE_SHEET_TAB?.trim() || "Sheet1";
  const escaped = tab.replace(/'/g, "''");
  // For appending, just return the tab name (quoted if needed)
  return /^[A-Za-z0-9_]+$/.test(tab) ? tab : `'${escaped}'`;
}
