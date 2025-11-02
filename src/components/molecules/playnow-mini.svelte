<script lang="ts">
/**
 * 🎶 PlayNowMini Component
 * 
 * @description Compact inline display of currently playing track.
 * Shows small album cover, track name, and artist in a single line.
 * 
 * @usage
 * ```astro
 * <PlayNowMini>
 *   {#snippet play()}<PlayIcon />{/snippet}
 *   {#snippet noplay()}<span>Not playing</span>{/snippet}
 *   {#snippet nocover()}<PlaceholderIcon />{/snippet}
 * </PlayNowMini>
 * ```
 * 
 * @compatible
 * - 🎵 Lighter version of PlayNow component
 * - 🔊 Last.fm integration with TanStack Query
 * - 📱 Optimized for inline/header placement
 */
  import { useGetCurrentTrack } from "@/lib/queries";

  let { play, noplay, nocover } = $props();

  const query = useGetCurrentTrack();
  let track = $derived(query.data);
  let currentTrack = $derived(track?.["@attr"]?.nowplaying ? query.data : null);
  let currentImg = $derived(
    currentTrack?.image?.find((img) => img.size === "large")?.["#text"],
  );
</script>

{#if currentTrack}
  <p class="mb-0">
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
      <span
        class="inline-flex items-center justify-center size-6 text-muted rounded bg-muted/10 border-[1px] border-divider"
      >
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
  <p class="text-muted mb-0">
    No se está reproduciendo nada ahora mismo. {@render noplay?.()}
  </p>
{/if}
