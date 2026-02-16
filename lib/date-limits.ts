// Helpers for constraining booking-related dates
// - No past dates
// - Only within one year from today
// - Timezone-safe by using the browser's local date parts

function padTwo(value: number): string {
  return value.toString().padStart(2, "0");
}

/**
 * Returns ISO-like (YYYY-MM-DD) min/max dates for inputs:
 * - minDate: today in the user's local timezone
 * - maxDate: exactly one year from today (same local day/month where possible)
 */
export function getBookingDateLimits() {
  const now = new Date();

  // Normalise to local "today" (midnight) to avoid time-of-day issues
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // One year from today – Date handles month/day overflow (e.g. leap years)
  const oneYearFromToday = new Date(today);
  oneYearFromToday.setFullYear(today.getFullYear() + 1);

  const minDate = `${today.getFullYear()}-${padTwo(today.getMonth() + 1)}-${padTwo(
    today.getDate(),
  )}`;

  const maxDate = `${oneYearFromToday.getFullYear()}-${padTwo(
    oneYearFromToday.getMonth() + 1,
  )}-${padTwo(oneYearFromToday.getDate())}`;

  return { minDate, maxDate };
}

/**
 * Checks that a YYYY-MM-DD string:
 * - is not before today
 * - is not after one year from today
 *
 * Uses string comparison which is safe for YYYY-MM-DD.
 */
export function isDateWithinBookingRange(value: string): boolean {
  if (!value) return false;
  const { minDate, maxDate } = getBookingDateLimits();
  return value >= minDate && value <= maxDate;
}

