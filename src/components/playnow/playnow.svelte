<script lang="ts">
  import { userApiMethods } from "@/lib/lastfm/services";
  import { queryClient } from "@/lib/query";
  import { createQuery } from "@tanstack/svelte-query";

  const { getRecentTracks } = userApiMethods;
  const FIVE_MINUTES = 5 * 60 * 1000;
  const query = createQuery(
    () => ({
      queryKey: ["recent-tracks"],
      queryFn: () => getRecentTracks({ user: "ansango", limit: 1 }),
      select: ({ recenttracks: { track } }) => ({ track: track.at(0) }),
      refetchInterval: FIVE_MINUTES,
    }),
    queryClient,
  );
  let track = $derived(query.data?.track);
  let imageUrl = $derived(
    track?.image.find((img) => img.size === "large")?.["#text"],
  );
</script>



{#if query.isError}
  <p>Error: {query.error.message}</p>
{:else}
  <div class="flex items-start gap-4">
    <div class="border-divider overflow-hidden rounded-md border-[1px]">
      {#if !query.isLoading && imageUrl}
        <img
          src={imageUrl}
          alt={track ? track.album["#text"] : "caption"}
          class="size-20 rounded object-cover"
          loading="eager"
          width={80}
          height={80}
        />
      {:else}
        <div
          class={`size-20 rounded object-cover bg-muted/10 flex items-center justify-center ${query.isLoading ? "animate-pulse" : ""}`}
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
      {/if}
    </div>
    {#if !query.isLoading && track}
      <div class="min-w-0 flex-1 space-y-0.5">
        <p class="font-medium text-pretty">
          {track.name}
        </p>
        <p class="text-muted text-sm">
          {track.artist["#text"]}
        </p>
        <p class="text-muted text-xs">{track.album["#text"]}</p>
      </div>
    {:else if query.isLoading}
      <div class="min-w-0 flex-1 space-y-1 animate-pulse">
        <div class="h-4 w-3/4 rounded bg-muted/10"></div>
        <div class="h-3 w-1/2 rounded bg-muted/10"></div>
        <div class="h-2 w-1/3 rounded bg-muted/10"></div>
      </div>
    {/if}
  </div>
{/if}
