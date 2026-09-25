# Editor plan — simple no-code content edits

Goal: let Alexandra change titles, Vimeo IDs, and carousel order without touching React/TypeScript, then hand a small JSON download to the assistant for a safe apply.

## Live editor

- URL: `/edit` (passphrase `davies-edit`, light client-side gate only).
- Source of truth: `src/data/work.json` (imported by `src/data/projects.ts`).
- Mirror for static serving: `public/content/work.json` (copied on `npm run build` via `prebuild`).
- Flow: edit → **Download JSON** → send file to Grok Bot in chat → assistant merges into `src/data/work.json`, rebuilds, deploys.
- The browser never writes to GitHub.

## Item shape

```json
{
  "id": "vimeo-1229936390",
  "brand": "Missoni",
  "title": "Moonstone Interiors by Missoni",
  "kind": "vimeo",
  "vimeoId": "1229936390",
  "youtubeId": null,
  "videoSrc": null,
  "poster": "/media/social/missoni.jpg",
  "aspect": "portrait",
  "url": "https://vimeo.com/1229936390"
}
```

Sections: `social`, `corporate`, `podcasts`, `lives`.

## Out of scope for v1

Uploading video files, DNS, GoDaddy, or editing photography/hero copy.
