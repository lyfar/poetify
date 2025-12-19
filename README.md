# Poetify

A Spotify-like music UI built with Next.js — fully local/offline (no Spotify API, no Spotify login).

## Install & launch

```bash
npm install
npm run dev
```

## Add music

- Drop audio files into `public/music/`.
- Track metadata is defined in `mocks/demoData.ts`.

## Generate images (optional)

This repo uses `google/nano-banana-pro` via Replicate to generate a consistent set of album/artist/login images from the same reference photo.

1. Put the reference image at `public/nikita.jpg.webp`
2. Set `REPLICATE_API_TOKEN` in your environment (or in `.env.local`)
3. Run:

```bash
npm run generate:images
```

Outputs:
- `public/assets/login-bg.jpg`
- `public/assets/covers/demo-playlist.jpg`
- `public/assets/covers/demo-album-nikita.jpg`
- `public/assets/covers/albums/*.jpg`
- `public/assets/covers/tracks/*.jpg`
- `public/assets/artists/*.jpg`

## Deploy (GitHub Pages)

1. Push to `main`.
2. In GitHub: `Settings → Pages → Build and deployment → Source: GitHub Actions`.
3. The workflow `.github/workflows/pages.yml` builds and deploys the static site from `out/`.

## Tech stack

- TypeScript
- Next.js (App Router)
- Tailwind CSS
- Redux Toolkit
- Storybook
