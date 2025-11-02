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
import { userApiMethods } from "@/lib/lastfm/services";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useGetCurrentTrack = () => {
  return createQuery(
    () => ({
      queryKey: ["recent-tracks"],
      queryFn: () => userApiMethods.getRecentTracks({ user: "ansango", limit: 1 }),
      select: ({ recenttracks: { track } }) => track.at(0),
      refetchInterval: FIVE_MINUTES,
      refetchIntervalInBackground: true,
      staleTime: FIVE_MINUTES,
      refetchOnWindowFocus: true,
    }),
    queryClient,
  );
};
