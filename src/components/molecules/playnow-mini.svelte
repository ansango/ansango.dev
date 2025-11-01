<script lang="ts">
  import { userApiMethods } from "@/lib/lastfm/services";
  import { queryClient } from "@/lib/queries";
  import { createQuery } from "@tanstack/svelte-query";

  let { play, noplay, nocover } = $props();
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
  let currentImg = $derived(
    currentTrack?.image?.find((img) => img.size === "large")?.["#text"],
  );
</script>

{#if currentTrack}
  <p>
    {#if currentImg}
      <img
        src={currentImg}
        alt={currentTrack.album["#text"]}
        class="inline-block size-6 mx-1 rounded object-cover align-middle"
        loading="eager"
        width={24}
        height={24}
      />
    {:else}
      <span class="inline-flex items-center justify-center size-6 text-muted rounded bg-muted/10 border-[1px] border-divider">
        {@render nocover?.()}
      </span>
    {/if}
    {currentTrack.name}
    <span class="text-muted mr-1">de {currentTrack.artist["#text"]}</span>
    {@render play?.()}
  </p>
{:else if query.isLoading}
  <p class="h-6 w-32 rounded bg-muted/10 animate-pulse m-0"></p>
{:else if !currentTrack && !query.isLoading && track}
  <p class="text-muted">
    No se está reproduciendo nada ahora mismo. {@render noplay?.()}
  </p>
{/if}
