/**
 * Funciones para calcular patrones de escucha
 */

import { dateToUnix, MONTH_NAMES } from './utils';
import { getScrobblesInRange } from './data';

/**
 * Calcula patrones de escucha del año (versión simplificada)
 */
export async function calculateListeningPatterns(
  year: number,
  totalScrobbles: number,
  topTracks: any[],
  topArtists: any[]
) {
  console.log(`   📊 Calculando patrones de escucha de ${year}...`);

  // Obtener scrobbles por mes
  const monthlyScrobbles: Record<number, number> = {};

  for (let month = 1; month <= 12; month++) {
    const monthStart = dateToUnix(year, month, 1);
    const monthEnd = month === 12 
      ? dateToUnix(year, 12, 31, 23, 59, 59)
      : dateToUnix(year, month + 1, 1) - 1;
    
    try {
      const scrobbles = await getScrobblesInRange(monthStart, monthEnd);
      monthlyScrobbles[month] = scrobbles;
    } catch (error) {
      console.log(`      ⚠ Error obteniendo scrobbles del mes ${month}`);
      monthlyScrobbles[month] = 0;
    }
  }

  // Encontrar mes más/menos activo
  const monthsWithScrobbles = Object.entries(monthlyScrobbles)
    .filter(([_, count]) => count > 0)
    .map(([month, count]) => ({ month: parseInt(month), count }));

  const mostActiveMonth = monthsWithScrobbles.reduce(
    (max, curr) => curr.count > max.count ? curr : max,
    { month: 1, count: 0 }
  );

  const leastActiveMonth = monthsWithScrobbles.reduce(
    (min, curr) => curr.count < min.count ? curr : min,
    { month: 1, count: Infinity }
  );

  return {
    monthlyScrobbles,
    mostActiveMonth: {
      month: MONTH_NAMES[mostActiveMonth.month - 1],
      scrobbles: mostActiveMonth.count,
    },
    leastActiveMonth: leastActiveMonth.count !== Infinity ? {
      month: MONTH_NAMES[leastActiveMonth.month - 1],
      scrobbles: leastActiveMonth.count,
    } : null,
    avgScrobblesPerDay: Math.floor(totalScrobbles / 365),
    topTrackOverall: topTracks[0] ? {
      name: topTracks[0].name,
      artist: topTracks[0].artist['#text'],
      playcount: parseInt(topTracks[0].playcount),
    } : null,
    topArtistOverall: topArtists[0] ? {
      name: topArtists[0].name,
      playcount: parseInt(topArtists[0].playcount),
    } : null,
  };
}
