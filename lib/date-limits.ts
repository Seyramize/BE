// Helpers for constraining booking-related dates
// - No past dates
// - Only within the current calendar year
// - Timezone-safe by using the browser's local date parts

function padTwo(value: number): string {
  return value.toString().padStart(2, "0");
}

/**
 * Returns ISO-like (YYYY-MM-DD) min/max dates for inputs:
 * - minDate: today in the user's local timezone
 * - maxDate: December 31 of the current year (local year)
 */
export function getBookingDateLimits() {
  const now = new Date();
  const year = now.getFullYear();

  const minDate = `${year}-${padTwo(now.getMonth() + 1)}-${padTwo(
    now.getDate(),
  )}`;
  const maxDate = `${year}-12-31`;

  return { minDate, maxDate, year };
}

/**
 * Checks that a YYYY-MM-DD string:
 * - is not before today
 * - is not after Dec 31 of the current year
 *
 * Uses string comparison which is safe for YYYY-MM-DD.
 */
export function isDateWithinCurrentYearAndNotPast(value: string): boolean {
  if (!value) return false;
  const { minDate, maxDate } = getBookingDateLimits();
  return value >= minDate && value <= maxDate;
}

