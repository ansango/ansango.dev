/**
 * 📊 Core Data Fetching Module
 *
 * @description
 * Handles user data retrieval, scrobble counting, threshold calculation,
 * and year validation for the wrapped system.
 *
 * @module wrapped/data
 */


import { client, USERNAME } from "../lastfm";
import {
  getYearStart,
  getYearEnd,
  getCurrentYear,
  isYearCompleted,
  withRateLimit,
} from "./utils";

/**
 * 👤 Fetch Last.fm user information
 *
 * @returns User object with registration date, total playcount, etc.
 *
 * @description
 * Retrieves complete user profile from Last.fm API.
 * Uses automatic rate limiting via withRateLimit wrapper.
 *
 * @example
 * ```ts
 * const user = await getUserInfo();
 * console.log(user.name);                    // 'ansango'
 * console.log(user.playcount);                // '85063'
 * console.log(user.registered.unixtime);      // 1523318400
 * ```
 */
export async function getUserInfo() {
  return withRateLimit(async () => {
    const response = await client.user.getInfo({ user: USERNAME });
    return response.user;
  }, "getUserInfo");
}

/**
 * 📅 Count scrobbles within a specific date range
 *
 * @param from - Unix timestamp for range start
 * @param to - Unix timestamp for range end
 * @returns Total number of scrobbles in the range
 *
 * @description
 * Efficiently counts scrobbles by requesting only 1 track but reading
 * the total count from response metadata. Uses rate limiting.
 *
 * @example
 * ```ts
 * const start2023 = getYearStart(2023);      // 1672531200
 * const end2023 = getYearEnd(2023);          // 1704067199
 * const scrobbles = await getScrobblesInRange(start2023, end2023);
 * console.log(scrobbles);                     // 31679
 * ```
 */
export async function getScrobblesInRange(
  from: number,
  to: number,
): Promise<number> {
  return withRateLimit(async () => {
    const response = await client.user.getRecentTracks({
      user: USERNAME,
      from: from.toString(),
      to: to.toString(),
      limit: 1,
    });
    return parseInt(String(response.recenttracks["@attr"].total), 10);
  }, "getScrobblesInRange");
}

/**
 * 📊 Calculate scrobbles per year from registration to last completed year
 *
 * @param registeredYear - Year when user registered on Last.fm
 * @returns Object mapping year to scrobble count
 *
 * @description
 * Iterates through all years from registration to current year (exclusive)
 * and counts scrobbles for each. Skips the current year as it's incomplete.
 * Logs progress to console.
 *
 * @example
 * ```ts
 * const scrobblesByYear = await getScrobblesByYear(2018);
 * console.log(scrobblesByYear);
 * // {
 * //   2018: 7112,
 * //   2019: 0,
 * //   2020: 0,
 * //   2021: 0,
 * //   2022: 11288,
 * //   2023: 31679,
 * //   2024: 28492
 * // }
 * ```
 */
export async function getScrobblesByYear(
  registeredYear: number,
): Promise<Record<number, number>> {
  const currentYear = getCurrentYear();
  const scrobblesByYear: Record<number, number> = {};

  console.log("📊 Calculando scrobbles por año...");

  for (let year = registeredYear; year < currentYear; year++) {
    const from = getYearStart(year);
    const to = getYearEnd(year);
    const scrobbles = await getScrobblesInRange(from, to);
    scrobblesByYear[year] = scrobbles;

    console.log(`   ${year}: ${scrobbles.toLocaleString()} scrobbles`);
  }

  return scrobblesByYear;
}

/**
 * 📏 Calculate automatic threshold based on average of non-zero years
 *
 * @param scrobblesByYear - Object mapping year to scrobble count
 * @returns Threshold value (average of all non-zero years)
 *
 * @description
 * Computes the mean of all years with scrobbles > 0, excluding current year.
 * Used to filter out years with insufficient listening activity.
 * Returns 0 if no valid years exist.
 *
 * @example
 * ```ts
 * const scrobblesByYear = {
 *   2018: 7112,
 *   2022: 11288,
 *   2023: 31679,
 *   2024: 28492
 * };
 * const threshold = calculateThreshold(scrobblesByYear);
 * console.log(threshold);                     // 19642 (avg of all 4 years)
 * ```
 */
export function calculateThreshold(
  scrobblesByYear: Record<number, number>,
): number {
  const values = Object.values(scrobblesByYear).filter((v) => v > 0);

  if (values.length === 0) return 0;

  const sum = values.reduce((acc, val) => acc + val, 0);
  const avg = sum / values.length;

  return Math.floor(avg);
}

/**
 * ✅ Filter years that meet wrapped generation criteria
 *
 * @param scrobblesByYear - Object mapping year to scrobble count
 * @param threshold - Minimum scrobbles required
 * @returns Array of valid years sorted chronologically
 *
 * @description
 * A year is valid if it meets ALL criteria:
 * - Year is completed (not current year)
 * - Has at least 1 scrobble
 * - Meets or exceeds the threshold
 *
 * Logs reasons for exclusion to console for debugging.
 *
 * @example
 * ```ts
 * const scrobblesByYear = {
 *   2018: 7112,     // Below threshold
 *   2022: 11288,    // Below threshold
 *   2023: 31679,    // ✓ Valid
 *   2024: 28492     // ✓ Valid
 * };
 * const validYears = getValidYears(scrobblesByYear, 22427);
 * console.log(validYears);                    // [2023, 2024]
 * ```
 */
export function getValidYears(
  scrobblesByYear: Record<number, number>,
  threshold: number,
): number[] {
  const validYears: number[] = [];

  for (const [yearStr, scrobbles] of Object.entries(scrobblesByYear)) {
    const year = parseInt(yearStr, 10);

    // Verificar si el año está completado
    if (!isYearCompleted(year)) {
      console.log(
        `   ${year}: Año no completado (actual: ${getCurrentYear()})`,
      );
      continue;
    }

    // Verificar si tiene scrobbles
    if (scrobbles === 0) {
      console.log(`   ${year}: Sin scrobbles`);
      continue;
    }

    // Verificar si cumple el umbral
    if (scrobbles < threshold) {
      console.log(
        `   ${year}: Por debajo del umbral (${scrobbles} < ${threshold})`,
      );
      continue;
    }

    validYears.push(year);
  }

  return validYears;
}

/**
 * 📦 Complete wrapped data structure
 *
 * @interface WrappedData
 * @property scrobblesByYear - Map of year to scrobble count
 * @property threshold - Calculated minimum scrobbles for valid years
 * @property validYears - Years that meet all wrapped criteria
 * @property registeredYear - Year user registered on Last.fm
 */
export interface WrappedData {
  scrobblesByYear: Record<number, number>;
  threshold: number;
  validYears: number[];
  registeredYear: number;
}

/**
 * 🎯 Main orchestrator: fetch all data needed for wrapped generation
 *
 * @returns Complete wrapped data object
 *
 * @description
 * Executes the full data pipeline:
 * 1. Fetch user info from Last.fm
 * 2. Calculate scrobbles per year since registration
 * 3. Compute automatic threshold
 * 4. Filter valid years
 *
 * Logs progress to console throughout execution.
 * This is the entry point for wrapped data collection.
 *
 * @example
 * ```ts
 * const data = await getWrappedData();
 * console.log(data);
 * // {
 * //   scrobblesByYear: { 2018: 7112, 2023: 31679, 2024: 28492 },
 * //   threshold: 22427,
 * //   validYears: [2023, 2024],
 * //   registeredYear: 2018
 * // }
 * ```
 */
export async function getWrappedData(): Promise<WrappedData> {
  console.log("🎧 Obteniendo datos para Wrapped...");

  // 1. Obtener información del usuario
  const userInfo = await getUserInfo();
  const registeredYear = new Date(
    userInfo.registered.unixtime * 1000,
  ).getFullYear();

  console.log(`👤 Usuario: ${userInfo.name}`);
  console.log(`📅 Registrado desde: ${registeredYear}`);
  console.log(
    `🎵 Total scrobbles: ${parseInt(userInfo.playcount).toLocaleString()}`,
  );

  // 2. Calcular scrobbles por año
  const scrobblesByYear = await getScrobblesByYear(registeredYear);

  // 3. Calcular umbral
  const threshold = calculateThreshold(scrobblesByYear);
  console.log(`📏 Umbral calculado: ${threshold.toLocaleString()} scrobbles`);

  // 4. Filtrar años válidos
  console.log("🔍 Filtrando años válidos...");
  const validYears = getValidYears(scrobblesByYear, threshold);
  console.log(`✅ Años válidos: ${validYears.length}`);

  return {
    scrobblesByYear,
    threshold,
    validYears,
    registeredYear,
  };
}
