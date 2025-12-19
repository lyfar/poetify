# Poetify agent guide

We are building a single demo site (“Poetify”) that looks like Spotify but is purpose-built for our friend Nikita. The app runs in demo mode (`NEXT_PUBLIC_DEMO_MODE=true`) using local mock data; no Spotify login is needed.

## Core idea
- **One main playlist**: **for Nikita's Birthday** (`demo-playlist`).
- Tracks are grouped into **artist-themed albums** (`POETIFY x <cover artist>`) based on the performer/cover artist.
- Each track has its own **unique cover image** (saved under `public/assets/covers/tracks/`) while albums use `public/assets/covers/albums/`.
- Everything is local/offline: no Spotify API, no Spotify OAuth, and no Spotify links.

## How to add a new track when user provides lyrics/audio
1. **Rename the audio file** to a clean, lower-case, hyphenated name reflecting the song title (and optionally “cover”) before using it.
2. **Create/assign a cover artist** entry in `mocks/demoData.ts` if needed.
3. **Add the track seed** to `demoTrackSeeds` in `mocks/demoData.ts` (id/name/artistId/preview_url/duration_ms).
4. **Add a placeholder cover** at `public/assets/covers/tracks/<track-id>.jpg` (or run `npm run generate:images`).
5. Album grouping and playlist items are auto-derived from `demoTrackSeeds`.

## Demo behavior expectations
- With `NEXT_PUBLIC_DEMO_MODE=true`, the app should show the birthday playlist, artist albums, and allow per-artist navigation/cards.
- Player uses local audio for previews; no Spotify auth required.
