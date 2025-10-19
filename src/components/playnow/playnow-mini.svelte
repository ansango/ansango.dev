<script lang="ts">
  import { userApiMethods } from "@/lib/lastfm/services";
  import { queryClient } from "@/lib/query";
  import { createQuery } from "@tanstack/svelte-query";
  let { play, noplay } = $props();
  const { getRecentTracks } = userApiMethods;

  const FIVE_MINUTES = 5 * 60 * 1000;

  const query = createQuery(
    () => ({
      queryKey: ["recent-tracks"],
      queryFn: () => getRecentTracks({ user: "ansango", limit: 1 }),
      select: ({ recenttracks: { track } }) => track.at(0),
      refetchInterval: FIVE_MINUTES,
    }),
    queryClient,
  );
  let track = $derived(query.data?.["@attr"]?.nowplaying ? query.data : null);
</script>

{#if track}
  <p>
    {@render play?.()}
    {track.name} <span class="text-muted">de {track.artist["#text"]}</span>
  </p>
{:else if query.isLoading}
  <p class="h-6 w-32 rounded bg-muted/10 animate-pulse m-0"></p>
{:else}
  <p>
    {@render noplay?.()}
    <span class="text-muted">No se está reproduciendo nada ahora mismo.</span>
  </p>
{/if}
