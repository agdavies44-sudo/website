/** Minimal-chrome Vimeo embed (free player limits apply). */
export function vimeoEmbedSrc(id: string, opts?: { autoplay?: boolean }) {
  const autoplay = opts?.autoplay === false ? 0 : 1;
  const params = [
    `autoplay=${autoplay}`,
    "muted=1",
    "title=0",
    "byline=0",
    "portrait=0",
    "sidedock=0",
    "controls=1",
    "dnt=1",
    "transparent=0",
    "playsinline=1",
  ].join("&");
  return `https://player.vimeo.com/video/${id}?${params}`;
}

/** Privacy-enhanced YouTube embed with reduced branding. */
export function youtubeEmbedSrc(id: string, opts?: { autoplay?: boolean }) {
  const autoplay = opts?.autoplay === false ? 0 : 1;
  const params = [
    `autoplay=${autoplay}`,
    "mute=1",
    "modestbranding=1",
    "rel=0",
    "iv_load_policy=3",
    "controls=1",
    "playsinline=1",
    "fs=1",
  ].join("&");
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
}
