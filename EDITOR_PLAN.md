# Editor plan — simple no-code content edits

Goal: let Alexandra change titles, Vimeo IDs, and carousel order without touching React/TypeScript, then hand a small JSON download to the assistant for a safe apply.

## Inspiration

`public/edit-guide.html` is a drag-and-type layout mock (hero/copy boxes). The real `/edit` page should be lighter: structured lists per section, not free-form absolute positioning.

## Approach (next phase — do not build fully yet)

1. **Content file** — move carousel data out of `src/data/projects.ts` into something like `public/content/work.json` (or `src/data/work.json` imported at build time). Shape per item: `{ id, brand, title, kind, vimeoId?, youtubeId?, poster?, aspect, order }`. Sections: `social`, `corporate`, `podcasts`, `lives`.

2. **`/edit` page** (client-only, no auth beyond a shared passphrase or “local only” warning):
   - List each section’s items with reorder (↑/↓ or drag).
   - Editable fields: title, brand, Vimeo ID (preferred), optional YouTube ID / poster URL.
   - Add / remove row with sensible defaults (`kind: "vimeo"`, landscape/portrait from section).
   - **Download JSON** button → `alexandra-work-YYYY-MM-DD.json` for email/chat to the assistant.
   - Optional: “Copy JSON” for paste.

3. **Apply path** — assistant (or a small `scripts/apply-work-json.mjs`) validates IDs, merges into the content file, rebuilds. No live write to production from the browser.

4. **Out of scope for v1** — uploading video files, DNS, GoDaddy, or editing photography/hero copy (those can reuse the edit-guide drag mock later).

## Placeholder note

Until `/edit` exists, change titles / Vimeo IDs in `src/data/projects.ts` (helpers `vim()`, `yt()`, `ig()`, `local()`), then `npm run build`.
