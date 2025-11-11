/**
 * Funciones para calcular obsesiones y patrones de maratones
 */

import { MONTH_NAMES } from './utils';

/**
 * Calcula obsesiones y maratones musicales del año
 */
export async function calculateObsessions(
  year: number,
  topTracks: any[],
  topArtists: any[],
  monthlyScrobbles: Record<number, number>
) {
  console.log(`   🔥 Calculando obsesiones de ${year}...`);

  // Track y artista más escuchado (ya los tenemos en top)
  const topTrackObsession = topTracks[0] ? {
    name: topTracks[0].name,
    artist: topTracks[0].artist['#text'],
    playcount: parseInt(topTracks[0].playcount),
  } : null;

  const topArtistObsession = topArtists[0] ? {
    name: topArtists[0].name,
    playcount: parseInt(topArtists[0].playcount),
  } : null;

  // Canciones por temporada (agrupando por trimestres)
  const seasons = {
    winter: { // Enero, Febrero, Marzo (Q1)
      months: [1, 2, 3],
      scrobbles: (monthlyScrobbles[1] || 0) + (monthlyScrobbles[2] || 0) + (monthlyScrobbles[3] || 0),
    },
    spring: { // Abril, Mayo, Junio (Q2)
      months: [4, 5, 6],
      scrobbles: (monthlyScrobbles[4] || 0) + (monthlyScrobbles[5] || 0) + (monthlyScrobbles[6] || 0),
    },
    summer: { // Julio, Agosto, Septiembre (Q3)
      months: [7, 8, 9],
      scrobbles: (monthlyScrobbles[7] || 0) + (monthlyScrobbles[8] || 0) + (monthlyScrobbles[9] || 0),
    },
    fall: { // Octubre, Noviembre, Diciembre (Q4)
      months: [10, 11, 12],
      scrobbles: (monthlyScrobbles[10] || 0) + (monthlyScrobbles[11] || 0) + (monthlyScrobbles[12] || 0),
    },
  };

  // Encontrar temporada favorita
  const favoriteSeason = Object.entries(seasons).reduce(
    (max, [season, data]) => {
      return data.scrobbles > max.scrobbles 
        ? { season, months: data.months, scrobbles: data.scrobbles } 
        : max;
    },
    { season: 'winter', months: [1, 2, 3], scrobbles: 0 }
  );

  // Artista del primer mes vs último mes
  const firstMonth = Object.keys(monthlyScrobbles).find(m => monthlyScrobbles[parseInt(m)] > 0);
  const lastMonth = Object.keys(monthlyScrobbles).reverse().find(m => monthlyScrobbles[parseInt(m)] > 0);

  return {
    topTrack: topTrackObsession,
    topArtist: topArtistObsession,
    favoriteSeason: {
      season: favoriteSeason.season,
      seasonName: getSeasonName(favoriteSeason.season),
      scrobbles: favoriteSeason.scrobbles,
      months: favoriteSeason.months.map(m => MONTH_NAMES[m - 1]),
    },
    yearStartMonth: firstMonth ? {
      month: MONTH_NAMES[parseInt(firstMonth) - 1],
      scrobbles: monthlyScrobbles[parseInt(firstMonth)],
    } : null,
    yearEndMonth: lastMonth ? {
      month: MONTH_NAMES[parseInt(lastMonth) - 1],
      scrobbles: monthlyScrobbles[parseInt(lastMonth)],
    } : null,
  };
}

/**
 * Traduce el nombre de la temporada
 */
function getSeasonName(season: string): string {
  const seasonNames: Record<string, string> = {
    winter: 'Invierno',
    spring: 'Primavera',
    summer: 'Verano',
    fall: 'Otoño',
  };
  return seasonNames[season] || season;
}
