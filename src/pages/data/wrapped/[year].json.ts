/**
 * Endpoint estático dinámico: /data/wrapped/[year].json
 * 
 * Genera el wrapped de cada año válido
 */

import { getWrappedData, generateWrappedForYear, calculateComparisons } from '@/lib/wrapped';
import type { APIContext } from 'astro';

export async function getStaticPaths() {
  const { scrobblesByYear, threshold, validYears } = await getWrappedData();

  // Ordenar años para procesar secuencialmente y acumular tags
  const sortedYears = validYears.sort((a, b) => a - b);
  const allTagsByYear: Record<number, string[]> = {};
  const allWrappedByYear: Record<number, any> = {};

  return sortedYears.map((year, index) => {
    // Acumular tags de años anteriores
    const previousYearsTags = sortedYears
      .slice(0, index)
      .flatMap(y => allTagsByYear[y] || []);

    // Obtener datos del año anterior para comparisons
    const previousYear = index > 0 ? sortedYears[index - 1] : null;
    const previousYearWrapped = previousYear ? allWrappedByYear[previousYear] : null;

    return {
      params: { year: year.toString() },
      props: {
        scrobbles: scrobblesByYear[year],
        threshold,
        previousYearsTags,
        previousYear,
        previousYearScrobbles: previousYear ? scrobblesByYear[previousYear] : null,
      },
    };
  });
}

export async function GET({ params, props }: APIContext) {
  const year = parseInt(params.year!);
  const { scrobbles, threshold, previousYearsTags, previousYear, previousYearScrobbles } = props;

  const wrapped = await generateWrappedForYear(
    year,
    scrobbles,
    threshold,
    previousYearsTags
  );

  // Calcular comparisons si hay año anterior
  let comparisons = {};
  if (previousYear && previousYearScrobbles) {
    comparisons = await calculateComparisons(
      year,
      scrobbles,
      wrapped.allTags,
      wrapped.top.artists,
      {
        scrobbles: previousYearScrobbles,
        tags: previousYearsTags,
        artists: [], // No tenemos los artistas del año anterior aquí, simplificamos
      }
    );
  }
  console.log(`   ✅ Wrapped de ${year} generado.`);

  return new Response(JSON.stringify({ ...wrapped, comparisons }, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
