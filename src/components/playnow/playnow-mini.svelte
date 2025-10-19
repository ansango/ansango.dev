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
  let track = $derived(query.data);
  let currentTrack = $derived(track?.["@attr"]?.nowplaying ? query.data : null);
</script>

{#if currentTrack}
  <p>
   
    <img
      src={currentTrack.image.find((img) => img.size === "large")?.["#text"]}
      alt={currentTrack.album["#text"]}
      class="inline-block size-6 mx-1 rounded object-cover align-middle"
      loading="eager"
      width={20}
      height={20}
    />
    {currentTrack.name}
    <span class="text-muted mr-1">de {currentTrack.artist["#text"]}</span>  {@render play?.()}
  </p>
{:else if query.isLoading}
  <p class="h-6 w-32 rounded bg-muted/10 animate-pulse m-0"></p>
{:else if !currentTrack && !query.isLoading && track}
  <p class="text-muted">
    No se está reproduciendo nada ahora mismo. {@render noplay?.()}
  </p>
{/if}
