/**
 * ⚙️ TanStack Query Client
 * 
 * @description Factory function for creating TanStack Query client instances.
 * Used by Svelte components for data fetching and caching.
 * 
 * @module lib/queries/client
 * 
 * @compatible
 * - 📦 Used in Svelte 5 components
 * - 💾 Client-side state management
 * - ⏱️ Automatic refetching and caching
 * - 🎵 Powers real-time music features
 */

import { QueryClient } from "@tanstack/svelte-query";

export const queryClient = () => new QueryClient();
