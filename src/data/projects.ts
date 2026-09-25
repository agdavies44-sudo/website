import { asset } from "@/lib/asset";
export type MediaKind = "youtube" | "vimeo" | "instagram" | "image" | "external";

export type WorkItem = {
  id: string;
  title: string;
  brand: string;
  kind: MediaKind;
  url: string;
  youtubeId?: string;
  vimeoId?: string;
  poster?: string;
  videoSrc?: string;
  aspect: "portrait" | "landscape";
};

export type CarouselSection = {
  id: string;
  heading: string;
  items: WorkItem[];
};

/** Remaining YouTube items that still use local HTML5 mirrors (long videos pending Vimeo). */
const LOCAL_YT = new Set<string>([
  // Intentionally empty after Social/Corporate Vimeo switch.
  // Podcasts / Lives / Stanley's Stick stay on YouTube until uploaded to Vimeo.
]);

function yt(
  id: string,
  brand: string,
  title: string,
  aspect: "portrait" | "landscape" = "landscape",
  poster?: string,
  videoSrc?: string,
): WorkItem {
  const local = videoSrc ?? (LOCAL_YT.has(id) ? asset(`/media/yt/${id}.mp4`) : undefined);
  return {
    id: `yt-${id}`,
    brand,
    title,
    kind: "youtube",
    url: `https://www.youtube.com/watch?v=${id}`,
    youtubeId: id,
    poster: poster ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    videoSrc: local,
    aspect,
  };
}

function vim(
  id: string,
  brand: string,
  title: string,
  aspect: "portrait" | "landscape" = "landscape",
  poster?: string,
): WorkItem {
  return {
    id: `vimeo-${id}`,
    brand,
    title,
    kind: "vimeo",
    url: `https://vimeo.com/${id}`,
    vimeoId: id,
    poster: poster ?? `https://vumbnail.com/${id}.jpg`,
    aspect,
  };
}

function ig(
  code: string,
  brand: string,
  title: string,
  kind: "reel" | "p" = "reel",
  poster?: string,
): WorkItem {
  return {
    id: `ig-${code}`,
    brand,
    title,
    kind: "instagram",
    url: `https://www.instagram.com/${kind}/${code}/`,
    poster: poster ?? asset(`/media/social/ig/${code}.jpg`),
    videoSrc: asset(`/media/social/ig/${code}.mp4`),
    aspect: "portrait",
  };
}

function local(
  id: string,
  brand: string,
  title: string,
  poster: string,
  aspect: "portrait" | "landscape",
  url?: string,
): WorkItem {
  return {
    id,
    brand,
    title,
    kind: "image",
    url: url ?? "#",
    poster,
    aspect,
  };
}

/**
 * Social videos — portrait 9:16 carousel.
 * YouTube-backed items with Public Vimeo counterparts → kind "vimeo".
 * Instagram / local MP4 stills kept for portrait reels & still-only cards.
 * Mapping from /workspace/godaddy-rebuild-pack/VIMEO_URLS.md (Social A/B/C).
 */
export const socialVideos: WorkItem[] = [
  vim("1229936390", "Missoni", "Moonstone Interiors by Missoni", "portrait", asset("/media/social/missoni.jpg")),
  vim("1229946528", "Look Optic", "Look Optic — Creator edit", "portrait"),
  vim("1229946525", "Made For Grownups", "Made For Grownups", "portrait", asset("/media/social/made-for-grownups.jpg")),
  vim("1229946526", "Look Optic", "Look Optic — Creator edit two", "portrait"),
  vim("1229946527", "Liquid Opulence", "Liquid Opulence — Three Reasons", "portrait", asset("/media/social/liquid-opulence.jpg")),
  vim("1229946560", "W Hotels", "W Hotel Manchester Event Recap", "portrait", asset("/media/social/w-hotel-manchester.jpg")),
  vim("1229946561", "Look Optic", "Look Optic — Model film", "portrait"),
  vim("1229946566", "Snap Cookies", "Snap cookies", "portrait", asset("/media/social/snap-cookies.jpg")),
  vim("1229950823", "The Silk Yard", "The Silk Yard Property Ad", "portrait", asset("/media/social/silk-yard.jpg")),
  local("social-focaccia", "5DB Media", "5DB Canteen — Focaccia", asset("/media/social/focaccia.jpg"), "portrait"),
  // Keep Instagram local MP4 (portrait reel) — also on Vimeo 1229957352
  ig("Db73O9yK4Rx", "Borough Market", "Borough Market reel"),
  vim("1229950822", "Fincar", "Fincar Ad", "portrait", asset("/media/social/fincar.jpg")),
  vim("1229950824", "Cinnabons", "Cinnabon teaser", "portrait", asset("/media/social/cinnabon-teaser.jpg")),
  vim("1229950820", "5DB Media", "5DB — Band performance teaser", "portrait"),
  // Keep Instagram local MP4 — also on Vimeo 1229957380
  ig("Dbu-vcZs6Jv", "Borough Market", "Borough Market reel 2"),
  vim("1229955614", "5DB Media", "5DB — Artists in Residence band intro", "portrait"),
  vim("1229955615", "Harp Song", "Harp Song", "portrait", asset("/media/social/harp-song.jpg")),
  // Keep Instagram local MP4 — also on Vimeo 1229957379
  ig("DakQSTJI3lm", "Lunch With…", "Lunch With… Instagram"),
  vim("1229955617", "Buy Association", "Buy Association — Fountain Court", "portrait", asset("/media/social/buy-association.jpg")),
  local("social-bread", "5DB Media", "5DB Canteen — Bread teaser", asset("/media/social/bread-teaser.jpg"), "portrait"),
  // Keep Instagram local MP4 — also on Vimeo 1229957416
  ig("DbsZUhGMngR", "Borough Market", "Borough Market reel 3"),
  vim("1229955616", "5DB Media", "5DB — Band on Tour", "portrait"),
  vim("1229961835", "5DB Media", "5DB — Full interview", "portrait"),
  // Keep Instagram local MP4 — also on Vimeo 1229962093
  ig("C0epaNJtyk2", "5DB Media", "5DB Media", "p"),
  vim("1229957351", "5DB Media", "5DB — Meet the team", "portrait"),
  vim("1229957349", "5DB Media", "5DB — Gig round-up", "portrait"),
  vim("1229957350", "5DB Media", "5DB — Interview cutdown", "portrait"),
];

/**
 * Corporate — landscape 16:9 carousel.
 * Mapped from VIMEO_URLS.md Corporate A/B. Prefer Vimeo embeds.
 */
export const corporate: WorkItem[] = [
  vim("1229936390", "Missoni", "Missoni — Moonstone Interiors", "landscape", asset("/media/corporate/missoni-16x9.jpg")),
  vim("1229950822", "Fincar", "Fincar", "landscape", asset("/media/corporate/fincar-16x9.jpg")),
  vim("1229962712", "Core Productions", "Core Productions — Partnership highlight", "landscape", asset("/media/corporate/core-agency-sizzle.jpg")),
  vim("1229963580", "Rothmore", "Rothmore — Tobacco Warehouse", "landscape", asset("/media/corporate/rothmore-tobacco-warehouse.jpg")),
  vim("1229964583", "Buy Association", "Buy Association — Property Ad", "landscape", asset("/media/corporate/buy-association-16x9.jpg")),
  vim("1229964586", "Waterhouse Gardens", "Waterhouse Gardens", "landscape", asset("/media/corporate/waterhouse-gardens.jpg")),
  vim("1229964585", "Creative Image", "Creative Image Productions — Wedding edit", "landscape"),
  vim("1229966791", "Core Productions", "Core Productions — Founders pitching investors", "landscape"),
  vim("1229964584", "PensionBee", "PensionBee — James’s Story", "landscape"),
  // PENDING VIMEO (long video on laptop queue) — keep YouTube for now
  yt("qvnz76sRMrA", "Stanley’s Stick", "Stanley’s Stick — Portfolio Excerpt", "landscape", asset("/media/corporate/stanleys-stick-preview.jpg")),
  vim("1229966792", "PensionBee", "PensionBee — Sarah’s Story", "landscape"),
  vim("1229955617", "Buy Association", "Buy Association — Fountain Court", "landscape"),
  vim("1229966795", "PensionBee", "PensionBee — Becca’s Story", "landscape"),
  local(
    "corp-one",
    "The One Residence",
    "The One Residence",
    asset("/media/corporate/the-one-residence.jpg"),
    "landscape",
  ),
  local(
    "corp-monta",
    "Monta Capital",
    "Monta Capital",
    asset("/media/corporate/monta-capital.jpg"),
    "landscape",
  ),
  local(
    "corp-honor",
    "Honor Oak",
    "Honor Oak",
    asset("/media/corporate/honor-oak.jpg"),
    "landscape",
  ),
];

/**
 * Podcasts — landscape carousel.
 * PENDING VIMEO: 3 Lunch With… episodes (Ballin’ Jacks, Us, Stepbrother)
 * still on YouTube; Everything I Thought I Knew remains still-only.
 */
export const podcasts: WorkItem[] = [
  // PENDING VIMEO — long video on laptop queue
  yt("1WHRf51uFrA", "Lunch With…", "Lunch With… Ballin’ Jacks", "landscape"),
  local(
    "pod-eitik",
    "Everything I Thought I Knew",
    "Everything I Thought I Knew — Episode 1",
    asset("/media/podcasts/everything-i-thought-i-knew-episode-1.jpg"),
    "landscape",
  ),
  // PENDING VIMEO — long video on laptop queue
  yt("iorwk_22ync", "Lunch With…", "Lunch With… Us", "landscape"),
  // PENDING VIMEO — long video on laptop queue
  yt("9Khabl3tBVM", "Lunch With…", "Lunch With… Stepbrother", "landscape"),
];

/**
 * Live productions — landscape carousel.
 * PENDING VIMEO: all 4 Lunch With… lives still on YouTube.
 */
export const lives: WorkItem[] = [
  // PENDING VIMEO — long video on laptop queue
  yt("AsMuHbMUARE", "Lunch With…", "Lunch With… Ren Harvieu", "landscape"),
  // PENDING VIMEO — long video on laptop queue
  yt("iwnXJ4laxXs", "Lunch With…", "Lunch With… Raquel Martins", "landscape"),
  // PENDING VIMEO — long video on laptop queue
  yt("5inJCJizU-c", "Lunch With…", "Lunch With… Poppy Daniels", "landscape"),
  // PENDING VIMEO — long video on laptop queue
  yt("NZIhqhNe-5k", "Lunch With…", "Lunch With… Mohan Evans", "landscape"),
];

export const workSections: CarouselSection[] = [
  { id: "social", heading: "Social", items: socialVideos },
  { id: "corporate", heading: "Corporate", items: corporate },
  { id: "podcasts", heading: "Podcast", items: podcasts },
  { id: "lives", heading: "Live productions", items: lives },
];
