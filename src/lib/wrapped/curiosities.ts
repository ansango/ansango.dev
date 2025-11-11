/**
 * Funciones para calcular curiosidades y datos únicos
 */


import { client } from "../lastfm";
import { withRateLimit } from "./utils";

/**
 * Calcula curiosidades y datos únicos del año
 */
export async function calculateCuriosities(
  year: number,
  totalScrobbles: number,
  topTracks: any[],
  topArtists: any[],
  topAlbums: any[],
) {
  console.log(`   ✨ Calculando curiosidades de ${year}...`);

  // Milestone aproximado (cada 10,000 scrobbles)
  const milestones = [];
  const baseMilestone = Math.floor(totalScrobbles / 10000) * 10000;
  if (baseMilestone > 0) {
    milestones.push({
      scrobbles: baseMilestone,
      message: `Alcanzaste ${baseMilestone.toLocaleString()} scrobbles totales`,
    });
  }

  // Tracks/artistas/álbumes más raros (menos listeners)
  const rarestTrack = await getRarestItem(topTracks, "track");
  const rarestArtist = await getRarestItem(topArtists, "artist");
  const rarestAlbum = await getRarestItem(topAlbums, "album");

  return {
    milestones,
    rarest: {
      track: rarestTrack,
      artist: rarestArtist,
      album: rarestAlbum,
    },
  };
}

/**
 * Encuentra el item más raro (con menos listeners)
 */
async function getRarestItem(items: any[], type: "track" | "artist" | "album") {
  if (!items || items.length === 0) return null;
  async function getRarestItem(
    items: any[],
    type: "track" | "artist" | "album",
  ) {
    if (!items || items.length === 0) return null;

    // Intentar obtener listeners para los primeros 5 items
    const itemsWithListeners = [];

    for (const item of items.slice(0, 5)) {
      try {
        let listeners = 0;

        if (type === "track") {
          const response = await withRateLimit(
            async () =>
              await client.track.getInfo({
                artist: item.artist["#text"],
                track: item.name,
              }),
            `getTrackInfo(${item.name})`,
          );
          listeners = parseInt(response.track.listeners || "0");
        } else if (type === "artist") {
          const response = await withRateLimit(
            async () =>
              await client.artist.getInfo({
                artist: item.name,
              }),
            `getArtistInfo(${item.name})`,
          );
          listeners = parseInt(response.artist.stats.listeners || "0");
        } else if (type === "album") {
          const response = await withRateLimit(
            async () =>
              await client.album.getInfo({
                artist: item.artist.name || item.artist["#text"],
                album: item.name,
              }),
            `getAlbumInfo(${item.name})`,
          );
          listeners = parseInt(response.album.listeners || "0");
        }

        itemsWithListeners.push({
          ...item,
          listeners,
        });
      } catch (error) {
        console.log(`      ⚠ Error obteniendo listeners para ${item.name}`);
      }
    }

    if (itemsWithListeners.length === 0) return null;

    // Encontrar el de menos listeners
    const rarest = itemsWithListeners.reduce((min, curr) =>
      curr.listeners < min.listeners ? curr : min,
    );

    return {
      name: rarest.name,
      artist:
        type === "track"
          ? rarest.artist["#text"]
          : type === "album"
            ? rarest.artist.name || rarest.artist["#text"]
            : undefined,
      listeners: rarest.listeners,
      playcount: parseInt(rarest.playcount),
    };
  }
}
