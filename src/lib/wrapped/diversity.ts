/**
 * Funciones para calcular métricas de diversidad musical
 */

/**
 * Calcula métricas de diversidad musical
 */
export async function calculateDiversity(
  year: number,
  topTracks: any[],
  topArtists: any[],
  totalScrobbles: number
) {
  console.log(`   🎨 Calculando diversidad musical de ${year}...`);

  // Índice de concentración de Herfindahl para artistas
  // Valores cercanos a 1 = muy concentrado (pocos artistas dominan)
  // Valores cercanos a 0 = muy diverso (muchos artistas diferentes)
  const artistShares = topArtists.map(artist => {
    const playcount = parseInt(artist.playcount);
    return (playcount / totalScrobbles) ** 2;
  });
  const herfindahlIndex = artistShares.reduce((sum, share) => sum + share, 0);

  // One-hit wonders: canciones con muy pocas reproducciones (1-3 scrobbles)
  const oneHitWonders = topTracks.filter(track => {
    const playcount = parseInt(track.playcount);
    return playcount >= 1 && playcount <= 3;
  }).length;

  // Discovery ratio: proporción de artistas nuevos
  // Para calcular esto necesitaríamos saber qué artistas son nuevos este año
  // Por ahora usamos una aproximación: artistas con pocas reproducciones son probablemente nuevos
  const newArtistsApprox = topArtists.filter(artist => {
    const playcount = parseInt(artist.playcount);
    return playcount <= 10;
  }).length;
  
  const discoveryRatio = topArtists.length > 0 
    ? (newArtistsApprox / topArtists.length) * 100 
    : 0;

  // Diversidad de géneros (basado en tags únicos)
  const allTags = new Set<string>();
  topArtists.forEach(artist => {
    if (artist.tags) {
      artist.tags.forEach((tag: string) => allTags.add(tag));
    }
  });

  return {
    herfindahlIndex: parseFloat(herfindahlIndex.toFixed(4)),
    concentration: herfindahlIndex > 0.15 ? 'Alta' : herfindahlIndex > 0.08 ? 'Media' : 'Baja',
    oneHitWonders,
    discoveryRatio: parseFloat(discoveryRatio.toFixed(2)),
    genreDiversity: allTags.size,
  };
}
