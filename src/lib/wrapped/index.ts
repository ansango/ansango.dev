/**
 * 🎵 Wrapped - Last.fm Annual Statistics System
 * 
 * @description
 * Main module entry point for generating annual wrapped statistics from Last.fm data.
 * Provides comprehensive music listening analytics including patterns, diversity,
 * discoveries, obsessions, comparisons, and curiosities.
 * 
 * @module wrapped
 * 
 * @example
 * ```ts
 * import { getWrappedData, generateWrappedForYear } from '@/lib/wrapped';
 * 
 * // Get all valid years
 * const data = await getWrappedData();
 * 
 * // Generate complete wrapped for a year
 * const wrapped = await generateWrappedForYear(
 *   2023,
 *   data.scrobblesByYear[2023],
 *   data.threshold,
 *   []
 * );
 * ```
 */

// 📦 Core data fetching and validation
export * from './utils';
export * from './data';
export * from './top-items';

// 📊 Statistical calculations
export * from './patterns';
export * from './diversity';
export * from './discoveries';
export * from './obsessions';
export * from './comparisons';
export * from './curiosities';

// 🎯 Main orchestrator
export * from './generator';
export * from './utils';
export * from './data';
export * from './top-items';
export * from './patterns';
export * from './diversity';
export * from './discoveries';
export * from './obsessions';
export * from './comparisons';
export * from './curiosities';
export * from './generator';
