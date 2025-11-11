# 🎵 Wrapped - Last.fm Annual Statistics System

A comprehensive TypeScript module for generating Spotify Wrapped-style annual music statistics from Last.fm data.

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [API Reference](#-api-reference)
- [Data Structure](#-data-structure)
- [Rate Limiting](#️-rate-limiting)
- [Examples](#-examples)

## ✨ Features

- **📊 Listening Patterns**: Monthly scrobbles, most/least active months, daily averages
- **🎨 Diversity Metrics**: Herfindahl concentration index, genre diversity, one-hit wonders
- **🔍 Discoveries**: First/last track of year, persistent artists throughout the year
- **🔥 Obsessions**: Top tracks/artists, favorite season, monthly evolution
- **📈 Year-over-Year Comparisons**: Growth percentage, adopted/abandoned tags and artists
- **✨ Curiosities**: Milestones, rarest tracks/artists/albums by global listeners
- **🛡️ Smart Rate Limiting**: Automatic retry with exponential backoff
- **🔧 Modular Architecture**: Separated by use case for easy maintenance

## 🚀 Installation

This module is part of the ansango.dev project. The wrapped functionality is located in `src/lib/wrapped/`.

```bash
# Install dependencies
npm install
# or
bun install
```

## 🏁 Quick Start

### Generate Wrapped Data for All Valid Years

```typescript
import { getWrappedData } from '@/lib/wrapped';

// Get all valid years with scrobble counts above threshold
const data = await getWrappedData();

console.log(data);
// {
//   scrobblesByYear: { 2018: 7112, 2023: 31679, 2024: 28492 },
//   threshold: 22427,
//   validYears: [2023, 2024],
//   registeredYear: 2018
// }
```

### Generate Complete Wrapped for a Specific Year

```typescript
import { generateWrappedForYear } from '@/lib/wrapped';

const wrapped2023 = await generateWrappedForYear(
  2023,           // year
  31679,          // scrobbles for that year
  22427,          // threshold
  []              // tags from previous years
);

console.log(wrapped2023.summary);
// {
//   totalScrobbles: 31679,
//   listeningHours: 1583,
//   uniqueArtists: 1000,
//   avgScrobblesPerDay: 86
// }
```

## 📚 API Reference

### Core Functions

#### `getWrappedData()`

Fetches user info and calculates scrobbles per year with automatic threshold.

**Returns:** `Promise<WrappedData>`

```typescript
interface WrappedData {
  scrobblesByYear: Record<number, number>;
  threshold: number;
  validYears: number[];
  registeredYear: number;
}
```

#### `generateWrappedForYear(year, scrobbles, threshold, previousYearsTags)`

Generates complete wrapped statistics for a specific year.

**Parameters:**
- `year` (number): Target year
- `scrobbles` (number): Total scrobbles for that year
- `threshold` (number): Minimum scrobbles threshold
- `previousYearsTags` (string[]): Accumulated tags from previous years

**Returns:** `Promise<WrappedYear>`

### Individual Calculators

#### `calculateListeningPatterns(year, totalScrobbles, topTracks, topArtists)`

Computes monthly listening patterns and activity peaks.

**Returns:**
```typescript
{
  monthlyScrobbles: Record<number, number>;
  mostActiveMonth: { month: string; scrobbles: number };
  leastActiveMonth: { month: string; scrobbles: number } | null;
  avgScrobblesPerDay: number;
  topTrackOverall: { name: string; artist: string; playcount: number };
  topArtistOverall: { name: string; playcount: number };
}
```

#### `calculateDiversity(year, topTracks, topArtists, totalScrobbles)`

Analyzes musical diversity using Herfindahl index and genre count.

**Returns:**
```typescript
{
  herfindahlIndex: number;          // 0-1, lower = more diverse
  concentration: 'Alta' | 'Media' | 'Baja';
  oneHitWonders: number;            // Tracks with 1-3 plays
  discoveryRatio: number;           // % of artists with <10 plays
  genreDiversity: number;           // Unique genre tags count
}
```

#### `calculateDiscoveries(year, topArtists)`

Finds first/last tracks and identifies persistent artists.

**Returns:**
```typescript
{
  firstTrack: { name: string; artist: string; timestamp: number; date: string } | null;
  lastTrack: { name: string; artist: string; timestamp: number; date: string } | null;
  persistentArtists: Array<{ name: string; playcount: number; avgPerMonth: number }>;
}
```

#### `calculateObsessions(year, topTracks, topArtists, monthlyScrobbles)`

Identifies top obsessions and seasonal patterns.

**Returns:**
```typescript
{
  topTrack: { name: string; artist: string; playcount: number };
  topArtist: { name: string; playcount: number };
  favoriteSeason: { season: string; seasonName: string; scrobbles: number; months: string[] };
  yearStartMonth: { month: string; scrobbles: number };
  yearEndMonth: { month: string; scrobbles: number };
}
```

#### `calculateComparisons(year, scrobbles, currentYearTags, currentYearArtists, previousYearData)`

Compares current year against previous year.

**Returns:**
```typescript
{
  growth: number;                                    // Percentage change
  growthDirection: 'increase' | 'decrease' | 'stable';
  abandonedTags: string[];                           // Tags dropped
  adoptedTags: string[];                             // New tags
  abandonedArtists: Array<{ name: string; lastYearPlaycount: number }>;
  newArtists: Array<{ name: string; playcount: number }>;
}
```

#### `calculateCuriosities(year, totalScrobbles, topTracks, topArtists, topAlbums)`

Discovers milestones and rarest items by global listeners.

**Returns:**
```typescript
{
  milestones: Array<{ scrobbles: number; message: string }>;
  rarest: {
    track: { name: string; artist: string; listeners: number; playcount: number } | null;
    artist: { name: string; listeners: number; playcount: number } | null;
    album: { name: string; artist: string; listeners: number; playcount: number } | null;
  };
}
```

### Utility Functions

#### `withRateLimit<T>(apiCall, context?)`

Wraps API calls with automatic rate limiting and retry logic.

**Features:**
- 250ms delay between requests (4 req/s)
- Exponential backoff: 10s → 20s → 30min
- Handles HTTP 429 errors
- Max 3 retry attempts

**Example:**
```typescript
const data = await withRateLimit(
  async () => await userApiMethods.getRecentTracks({ user: 'username', limit: 200 }),
  'getRecentTracks'
);
```

## 📦 Data Structure

### Complete Wrapped Year Object

```typescript
{
  year: number;
  metadata: {
    threshold: number;
    generated: string;              // ISO timestamp
  };
  summary: {
    totalScrobbles: number;
    listeningHours: number;
    uniqueArtists: number;
    avgScrobblesPerDay: number;
  };
  top: {
    tracks: Array<Track>;           // Top 50
    artists: Array<Artist>;         // Top 20 with tags
    albums: Array<Album>;           // Top 20
  };
  patterns: { /* see calculateListeningPatterns */ };
  diversity: { /* see calculateDiversity */ };
  discoveries: { /* see calculateDiscoveries */ };
  obsessions: { /* see calculateObsessions */ };
  comparisons: { /* see calculateComparisons */ };
  curiosities: { /* see calculateCuriosities */ };
  newTags: string[];               // Tags not in previous years
  allTags: string[];               // All tags this year
}
```

## ⏱️ Rate Limiting

This module respects Last.fm's API limits:

- **Limit:** 5 requests/second averaged over 5 minutes
- **Implementation:** 4 requests/second (250ms delay) for safety margin
- **Retry Strategy:** Exponential backoff (10s, 20s, up to 30min)
- **Max Retries:** 3 attempts per call

All API-calling functions use `withRateLimit()` automatically.

## 📖 Examples

### Example 1: Generate Wrapped for 2023

```typescript
import { generateWrappedForYear } from '@/lib/wrapped';

const wrapped = await generateWrappedForYear(2023, 31679, 22427, []);

console.log(`🎵 Total scrobbles: ${wrapped.summary.totalScrobbles}`);
console.log(`⏰ Listening hours: ${wrapped.summary.listeningHours}`);
console.log(`👥 Unique artists: ${wrapped.summary.uniqueArtists}`);
console.log(`🔥 Top artist: ${wrapped.obsessions.topArtist.name}`);
console.log(`❄️ Favorite season: ${wrapped.obsessions.favoriteSeason.seasonName}`);
```

**Output:**
```
🎵 Total scrobbles: 31679
⏰ Listening hours: 1583
👥 Unique artists: 1000
🔥 Top artist: The Blaze
❄️ Favorite season: Invierno
```

### Example 2: Compare Two Years

```typescript
import { calculateComparisons } from '@/lib/wrapped';

const comparison = await calculateComparisons(
  2024,
  28492,
  ['hardcore', 'punk', 'electronic'],
  [{ name: 'Punch', playcount: 1066 }, ...],
  {
    scrobbles: 31679,
    tags: ['electronic', 'house', 'techno'],
    artists: [{ name: 'The Blaze', playcount: 552 }, ...]
  }
);

console.log(`📉 Growth: ${comparison.growth}%`);
console.log(`🆕 New tags: ${comparison.adoptedTags.join(', ')}`);
console.log(`👋 Left behind: ${comparison.abandonedTags.join(', ')}`);
```

**Output:**
```
📉 Growth: -10.06%
🆕 New tags: hardcore, punk, powerviolence
👋 Left behind: (none)
```

### Example 3: Find Rarest Items

```typescript
import { calculateCuriosities } from '@/lib/wrapped';

const curiosities = await calculateCuriosities(2023, 31679, topTracks, topArtists, topAlbums);

console.log(`🎯 Rarest track: ${curiosities.rarest.track.name}`);
console.log(`👂 Global listeners: ${curiosities.rarest.track.listeners.toLocaleString()}`);
console.log(`🎖️ Milestones: ${curiosities.milestones[0].message}`);
```

**Output:**
```
🎯 Rarest track: Top Rank
👂 Global listeners: 9,317
🎖️ Milestones: Alcanzaste 30,000 scrobbles totales
```

## 🗂️ Module Structure

```
src/lib/wrapped/
├── index.ts           # Main exports
├── utils.ts           # Date utils, rate limiting
├── data.ts            # User data, scrobbles calculation
├── top-items.ts       # Top tracks/artists/albums fetchers
├── patterns.ts        # Monthly listening patterns
├── diversity.ts       # Musical diversity metrics
├── discoveries.ts     # First/last tracks, persistent artists
├── obsessions.ts      # Top items and seasonal trends
├── comparisons.ts     # Year-over-year comparisons
├── curiosities.ts     # Milestones and rarest items
└── generator.ts       # Main wrapped orchestrator
```

## 🤝 Contributing

When adding new features:

1. Follow the existing modular structure
2. Add comprehensive JSDoc documentation with emojis
3. Include usage examples in comments
4. Wrap API calls with `withRateLimit()`
5. Update this README with new functionality

## 📄 License

Part of ansango.dev project. See main repository for license details.
