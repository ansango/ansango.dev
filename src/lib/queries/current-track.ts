/**
 * 🎶 Current Track Query Hook
 *
 * @description TanStack Query hook for fetching currently playing track.
 * Auto-refreshes every 5 minutes to show real-time listening activity.
 *
 * @module lib/queries/current-track
 *
 * @compatible
 * - 🎵 Used by PlayNow and PlayNowMini components
 * - ⏱️ Auto-refresh interval: 5 minutes
 * - 💾 Background refetching enabled
 * - 🔄 Refetches on window focus
 */

import { createQuery } from "@tanstack/svelte-query";
import { queryClient } from "./client";
import { fetcher } from "../utils";
import type { RecentTrack } from "../music";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useGetCurrentTrack = (url: string, apiKey: string) => {
  return createQuery(
    () => ({
      queryKey: ["recent-tracks"],
      queryFn: async () => {
        const { tracks } = await fetcher<{
          tracks: RecentTrack[];
        }>(`${url}/music/ansango/tracks/recent?limit=1`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });

        return tracks;
      },
      select: (tracks) => tracks.at(0),
      refetchInterval: FIVE_MINUTES,
      refetchIntervalInBackground: true,
      staleTime: FIVE_MINUTES,
      refetchOnWindowFocus: true,
    }),
    queryClient,
  );
};
