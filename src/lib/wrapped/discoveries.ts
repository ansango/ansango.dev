/**
 * Funciones para calcular descubrimientos del año
 */

import { client, USERNAME } from "../lastfm";
import { getYearStart, getYearEnd, withRateLimit } from "./utils";

/**
 * Calcula descubrimientos y datos curiosos del año
 */
export async function calculateDiscoveries(year: number, topArtists: any[]) {
  console.log(`   🔍 Calculando descubrimientos de ${year}...`);

  // Obtener primera y última canción del año
  const firstAndLast = await getFirstAndLastTrack(year);

  // Calcular artistas persistentes (aproximación basada en playcount distribuido)
  const persistentArtists = topArtists
    .filter((artist) => {
      const playcount = parseInt(artist.playcount);
      const avgPerMonth = playcount / 12;
      // Si tiene promedio > 5 scrobbles por mes, probablemente estuvo presente todo el año
      return avgPerMonth >= 5;
    })
    .map((artist) => ({
      name: artist.name,
      playcount: parseInt(artist.playcount),
      avgPerMonth: Math.floor(parseInt(artist.playcount) / 12),
    }));

  return {
    firstTrack: firstAndLast.first,
    lastTrack: firstAndLast.last,
    persistentArtists: persistentArtists.slice(0, 10), // Top 10 más persistentes
  };
}

/**
 * Obtiene la primera y última canción del año
 */
async function getFirstAndLastTrack(year: number) {
  return withRateLimit(async () => {
    const from = getYearStart(year);
    const to = getYearEnd(year);

    try {
      // Obtener primeros scrobbles del año (ordenados del más reciente al más antiguo)
      const response = await client.user.getRecentTracks({
        user: USERNAME,
        from: from.toString(),
        to: to.toString(),
        limit: 200, // Máximo permitido
        page: 1,
      });

      const tracks = response.recenttracks.track;

      if (!tracks || tracks.length === 0) {
        return { first: null, last: null };
      }

      // Filtrar tracks que tengan fecha (excluir "now playing")
      const tracksWithDate = tracks.filter((t) => t.date && t.date.uts);

      if (tracksWithDate.length === 0) {
        return { first: null, last: null };
      }

      // El API devuelve del más reciente al más antiguo
      // Así que el último del array es el primero del año
      const firstTrack = tracksWithDate[tracksWithDate.length - 1];
      const lastTrack = tracksWithDate[0];

      return {
        first: firstTrack
          ? {
              name: firstTrack.name,
              artist: firstTrack.artist["#text"],
              timestamp: parseInt(firstTrack.date?.uts || "0"),
              date: new Date(
                parseInt(firstTrack.date?.uts || "0") * 1000,
              ).toISOString(),
            }
          : null,
        last: lastTrack
          ? {
              name: lastTrack.name,
              artist: lastTrack.artist["#text"],
              timestamp: parseInt(lastTrack.date?.uts || "0"),
              date: new Date(
                parseInt(lastTrack.date?.uts || "0") * 1000,
              ).toISOString(),
            }
          : null,
      };
    } catch (error) {
      console.log(`      ⚠ Error obteniendo primera/última canción: ${error}`);
      return { first: null, last: null };
    }
  }, `getFirstAndLastTrack(${year})`);
}
