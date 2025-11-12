import type { RecentTrack } from "@/lib/music";
import { fetcher } from "@/lib/utils";

export async function GET() {
  const { tracks } = await fetcher<{
    tracks: RecentTrack[];
  }>(`${import.meta.env.SERVICE_URL}/music/ansango/tracks/recent?limit=1`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.SERVICE_API_KEY}`,
    },
  });

  return new Response(JSON.stringify({ tracks }), {
    headers: { "Content-Type": "application/json" },
  });
}
