/**
 * Funciones para calcular comparativas año a año
 */

/**
 * Calcula comparativas con el año anterior
 */
export async function calculateComparisons(
  year: number,
  scrobbles: number,
  currentYearTags: string[],
  currentYearArtists: any[],
  previousYearData?: {
    scrobbles: number;
    tags: string[];
    artists: any[];
  }
) {
  console.log(`   📈 Calculando comparativas de ${year}...`);

  if (!previousYearData) {
    return {
      growth: null,
      abandonedTags: [],
      adoptedTags: [],
      abandonedArtists: [],
      newArtists: [],
    };
  }

  // Crecimiento de scrobbles
  const growth = previousYearData.scrobbles > 0
    ? ((scrobbles - previousYearData.scrobbles) / previousYearData.scrobbles) * 100
    : 0;

  // Tags abandonados (estaban el año anterior pero no este año)
  const abandonedTags = previousYearData.tags.filter(
    tag => !currentYearTags.includes(tag)
  ).slice(0, 10); // Top 10

  // Tags adoptados (nuevos este año)
  const adoptedTags = currentYearTags.filter(
    tag => !previousYearData.tags.includes(tag)
  ).slice(0, 10); // Top 10

  // Artistas abandonados (top del año anterior que no están en top este año)
  const currentArtistNames = currentYearArtists.map(a => a.name);
  const previousArtistNames = previousYearData.artists.map(a => a.name);

  const abandonedArtists = previousYearData.artists
    .filter(a => !currentArtistNames.includes(a.name))
    .slice(0, 5)
    .map(a => ({
      name: a.name,
      lastYearPlaycount: parseInt(a.playcount),
    }));

  // Artistas nuevos (top este año que no estaban en top el año anterior)
  const newArtists = currentYearArtists
    .filter(a => !previousArtistNames.includes(a.name))
    .slice(0, 5)
    .map(a => ({
      name: a.name,
      playcount: parseInt(a.playcount),
    }));

  return {
    growth: parseFloat(growth.toFixed(2)),
    growthDirection: growth > 0 ? 'increase' : growth < 0 ? 'decrease' : 'stable',
    abandonedTags,
    adoptedTags,
    abandonedArtists,
    newArtists,
  };
}
