/**
 * 🛠️ Utility Functions for Wrapped System
 *
 * @module wrapped/utils
 * @description General-purpose utilities for date handling, rate limiting, and API request management
 */

/**
 * 📅 Converts a date to Unix timestamp
 *
 * @param year - The year (e.g., 2023)
 * @param month - The month (1-12, defaults to 1)
 * @param day - The day (1-31, defaults to 1)
 * @param hour - The hour (0-23, defaults to 0)
 * @param minute - The minute (0-59, defaults to 0)
 * @param second - The second (0-59, defaults to 0)
 * @returns Unix timestamp in seconds
 *
 * @example
 * ```ts
 * const timestamp = dateToUnix(2023, 12, 25, 15, 30, 0);
 * // Returns: 1703516400
 * ```
 */
export function dateToUnix(
  year: number,
  month = 1,
  day = 1,
  hour = 0,
  minute = 0,
  second = 0,
): number {
  return Math.floor(
    new Date(year, month - 1, day, hour, minute, second).getTime() / 1000,
  );
}

/**
 * 🎯 Gets the Unix timestamp for the start of a year
 *
 * @param year - The year
 * @returns Unix timestamp for January 1st at 00:00:00
 *
 * @example
 * ```ts
 * const start = getYearStart(2023);
 * // Returns: 1672531200 (2023-01-01 00:00:00)
 * ```
 */
export function getYearStart(year: number): number {
  return dateToUnix(year, 1, 1);
}

/**
 * 🏁 Gets the Unix timestamp for the end of a year
 *
 * @param year - The year
 * @returns Unix timestamp for December 31st at 23:59:59
 *
 * @example
 * ```ts
 * const end = getYearEnd(2023);
 * // Returns: 1704067199 (2023-12-31 23:59:59)
 * ```
 */
export function getYearEnd(year: number): number {
  return dateToUnix(year, 12, 31, 23, 59, 59);
}

/**
 * 📆 Gets the current year
 *
 * @returns Current year number
 *
 * @example
 * ```ts
 * const year = getCurrentYear();
 * // Returns: 2025
 * ```
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * ✅ Checks if a year is completed (past December 31st)
 *
 * @param year - The year to check
 * @returns True if the year is complete, false otherwise
 *
 * @example
 * ```ts
 * isYearCompleted(2023); // Returns: true (in 2025)
 * isYearCompleted(2025); // Returns: false (in 2025)
 * ```
 */
export function isYearCompleted(year: number): boolean {
  const currentYear = getCurrentYear();
  return year < currentYear;
}

/**
 * 📅 Spanish month names array
 *
 * @constant
 * @type {string[]}
 */
export const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

/**
 * ⏱️ Rate limiting configuration for Last.fm API
 *
 * @constant
 * @description Last.fm enforces max 5 requests/second averaged over 5 minutes
 */
const RATE_LIMIT_DELAY = 250; // 250ms between requests = 4 req/s (safety margin)
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 10000; // 10 seconds initial
const MAX_RETRY_DELAY = 1800000; // 30 minutes maximum

/**
 * 💤 Pauses execution for a specified duration
 *
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after the delay
 *
 * @example
 * ```ts
 * await sleep(1000); // Wait 1 second
 * ```
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 🛡️ Wrapper for API calls with automatic rate limiting and retry logic
 *
 * @template T - The return type of the API call
 * @param apiCall - Async function that performs the API request
 * @param context - Optional context string for logging purposes
 * @returns The result of the API call
 * @throws Error if all retry attempts fail
 *
 * @description
 * - Enforces 250ms delay between requests (4 req/s)
 * - Implements exponential backoff for retries (10s, 20s, 30min max)
 * - Handles HTTP 429 (Rate Limit Exceeded) errors
 * - Maximum 3 retry attempts per call
 *
 * @example
 * ```ts
 * const data = await withRateLimit(
 *   async () => await userApiMethods.getInfo({ user: 'username' }),
 *   'getUserInfo'
 * );
 * // Returns: User data with automatic rate limiting
 * ```
 */
export async function withRateLimit<T>(
  apiCall: () => Promise<T>,
  context?: string,
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      // Wait before making the call (except on first attempt)
      if (attempt > 0) {
        const delay = Math.min(
          INITIAL_RETRY_DELAY * Math.pow(2, attempt - 1),
          MAX_RETRY_DELAY,
        );
        console.log(
          `   ⏳ Retry ${attempt + 1}/${MAX_RETRIES} after ${delay}ms...`,
        );
        await sleep(delay);
      }

      // Make the call
      const result = await apiCall();

      // Rate limiting: wait before next call
      await sleep(RATE_LIMIT_DELAY);

      return result;
    } catch (error: any) {
      lastError = error;

      // If 429 error (rate limit), retry
      if (
        error?.message?.includes("429") ||
        error?.message?.includes("Rate limit")
      ) {
        console.log(
          `   ⚠️  Rate limit exceeded${context ? ` in ${context}` : ""}, retrying...`,
        );
        continue;
      }

      // For other errors, retry only if attempts remain
      if (attempt < MAX_RETRIES - 1) {
        console.log(
          `   ⚠️  Error${context ? ` in ${context}` : ""}: ${error?.message}, retrying...`,
        );
        continue;
      }

      // If no attempts left, throw error
      throw error;
    }
  }

  // If we get here, retries exhausted
  throw lastError || new Error("Rate limit exceeded after max retries");
}
