/**
 * Endpoint estático: /data/wrapped/index.json
 * 
 * Genera el índice de años disponibles con metadata
 */

import { getWrappedData } from '@/lib/wrapped';

export async function GET() {
  const { scrobblesByYear, threshold, validYears } = await getWrappedData();

  const thresholds: Record<number, number> = {};
  const totals: Record<number, number> = {};

  validYears.forEach((year) => {
    thresholds[year] = threshold;
    totals[year] = scrobblesByYear[year];
  });

  const index = {
    years: validYears.sort((a, b) => b - a),
    thresholds,
    totals,
    lastGenerated: new Date().toISOString(),
  };

console.log(`   ✅ Índice de years generado.`);

  return new Response(JSON.stringify(index, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
