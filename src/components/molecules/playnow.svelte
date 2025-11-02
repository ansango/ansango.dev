<script lang="ts">
/**
 * 🎵 PlayNow Component
 * 
 * @description Displays currently playing or recently played track from Last.fm.
 * Shows album cover, track name, artist, and album with real-time updates.
 * 
 * @usage
 * ```astro
 * <PlayNow>
 *   {#snippet play()}<PlayIcon />{/snippet}
 *   {#snippet noplay()}<NoListenIcon />{/snippet}
 * </PlayNow>
 * ```
 * 
 * @compatible
 * - 🔊 Integrates with Last.fm API via TanStack Query
 * - ▶️ Uses PlayIcon for active state
 * - 🖼️ Shows album artwork with fallback
 */
  import {  useGetCurrentTrack } from "@/lib/queries";

  let { play, noplay } = $props();
  const query = useGetCurrentTrack();
  let track = $derived(query.data);
  let currentTrack = $derived(track?.["@attr"]?.nowplaying ? track : null);
  let imageUrl = $derived(
    currentTrack?.image.find((img) => img.size === "large")?.["#text"],
  );
  let previousTrack = $derived(
    !currentTrack && track && !query.isLoading ? track : null,
  );
</script>

<h2>
  {#if currentTrack}
    {@render play?.()}
  {:else if query.isLoading}
    <span class="h-4 min-w-2xs rounded bg-muted/10 animate-pulse inline-block"></span>
  {:else}
    {@render noplay?.()}
  {/if}
</h2>
{#if query.isError}
  <p>Error: {query.error.message}</p>
{:else}
  <div class="flex items-start gap-4">
    <div class="border-divider overflow-hidden rounded-md border-[1px]">
      {#if query.isLoading || !currentTrack || !imageUrl}
        <div
          class={`size-20 rounded object-cover bg-muted/10 flex items-center justify-center ${query.isLoading ? "animate-pulse " : ""}`}
        >
          <svg class="size-5 text-muted" viewBox="0 0 24 24" fill="none">
            <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
              ><path
                d="M7 7a3 3 0 1 0 0 6a3 3 0 0 0 0-6m-1 3a1 1 0 1 1 2 0a1 1 0 0 1-2 0"
              ></path><path
                d="M3 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm18 2H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4.314l6.878-6.879a3 3 0 0 1 4.243 0L22 15.686V6a1 1 0 0 0-1-1m0 14H10.142l5.465-5.464a1 1 0 0 1 1.414 0l4.886 4.886A1 1 0 0 1 21 19"
              ></path></g
            >
          </svg>
        </div>
      {:else}
        <img
          src={imageUrl
            ? imageUrl
            : track?.image.find((img) => img.size === "large")?.["#text"]}
          alt={currentTrack
            ? currentTrack.album["#text"]
            : track?.album["#text"]}
          class="size-20 rounded object-cover"
          loading="eager"
          width={80}
          height={80}
        />
      {/if}
    </div>

    <div
      class={`min-w-0 flex-1  ${query.isLoading ? "animate-pulse space-y-2.5" : "space-y-0.5"}`}
    >
      {#if query.isLoading}
        <div class="h-3 w-3/4 rounded bg-muted/10"></div>
        <div class="h-2 w-1/2 rounded bg-muted/10"></div>
      {:else}
        <p class="font-medium text-pretty">
          {currentTrack ? currentTrack.name : previousTrack?.name}
        </p>
        <p class="text-muted text-sm">
          {currentTrack
            ? currentTrack.artist["#text"]
            : previousTrack?.artist["#text"]}
        </p>
        <p class="text-muted text-xs">
          {currentTrack
            ? currentTrack.album["#text"]
            : previousTrack?.album["#text"]}
        </p>
      {/if}
    </div>
  </div>
{/if}
