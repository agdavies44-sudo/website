import { asset } from "@/lib/asset";
export type MediaKind = "youtube" | "instagram" | "image" | "external";

export type WorkItem = {
  id: string;
  title: string;
  brand: string;
  kind: MediaKind;
  url: string;
  youtubeId?: string;
  poster?: string;
  videoSrc?: string;
  aspect: "portrait" | "landscape";
};

export type CarouselSection = {
  id: string;
  heading: string;
  items: WorkItem[];
};

/** Unlisted / @davies.alexandra portfolio uploads hosted locally for clean HTML5 playback */
const LOCAL_YT = new Set([
  "1nFfoj0aZgw",
  "46-0H0KQPLg",
  "5RmVsiePsII",
  "5YQCAJnYLzk",
  "9TCi5HsuUJ8",
  "Dv8yn-BHGGk",
  "ExfVTBCSIZg",
  "IC-LhuzDrjk",
  "PkWmZVphFQs",
  "RaLuIC3Qcag",
  "TFrwlGIHLfI",
  "WtveWDLhJ0Y",
  "XrDDNarmJ0M",
  "_4YwKbZqako",
  "bCHP3dBWUew",
  "f9O46xz4MDE",
  "l8sfb1Henmg",
  "mO8JyfzeT-s",
  "mTb3NOj8QcQ",
  "rQnwyMlZ3r0",
  "rnrffy_E3U0",
  "sZvf3_eF2Kg",
  "tH2jxV5vetY",
  "thC5ePQJ7CE",
  "tkHTbjjOg4U",
  "yrAIbY1d-po",
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

/** Social videos — portrait carousel (SPEC titles + BRIEF links) */
export const socialVideos: WorkItem[] = [
  // Visual impact first; Look Optic portraits near front; brands spread
  yt("IC-LhuzDrjk", "Missoni", "Moonstone Interiors by Missoni", "portrait", asset("/media/social/missoni.jpg")),
  yt("rQnwyMlZ3r0", "Look Optic", "Look Optic — Creator edit", "portrait"),
  yt("f9O46xz4MDE", "Made For Grownups", "Made For Grownups", "portrait", asset("/media/social/made-for-grownups.jpg")),
  yt("mTb3NOj8QcQ", "Look Optic", "Look Optic — Creator edit two", "portrait"),
  yt("mO8JyfzeT-s", "Liquid Opulence", "Liquid Opulence — Three Reasons", "portrait", asset("/media/social/liquid-opulence.jpg")),
  yt("l8sfb1Henmg", "W Hotels", "W Hotel Manchester Event Recap", "portrait", asset("/media/social/w-hotel-manchester.jpg")),
  yt("9TCi5HsuUJ8", "Look Optic", "Look Optic — Model film", "portrait"),
  yt("sZvf3_eF2Kg", "Snap Cookies", "Snap cookies", "portrait", asset("/media/social/snap-cookies.jpg")),
  yt("XrDDNarmJ0M", "The Silk Yard", "The Silk Yard Property Ad", "portrait", asset("/media/social/silk-yard.jpg")),
  local("social-focaccia", "5DB Media", "5DB Canteen — Focaccia", asset("/media/social/focaccia.jpg"), "portrait"),
  ig("Db73O9yK4Rx", "Borough Market", "Borough Market reel"),
  yt("rnrffy_E3U0", "Fincar", "Fincar Ad", "portrait", asset("/media/social/fincar.jpg")),
  yt("WtveWDLhJ0Y", "Cinnabons", "Cinnabon teaser", "portrait", asset("/media/social/cinnabon-teaser.jpg")),
  yt("PkWmZVphFQs", "5DB Media", "5DB — Band performance teaser", "portrait"),
  ig("Dbu-vcZs6Jv", "Borough Market", "Borough Market reel 2"),
  yt("tH2jxV5vetY", "Harp Song", "Harp Song", "portrait", asset("/media/social/harp-song.jpg")),
  ig("DakQSTJI3lm", "Lunch With…", "Lunch With… Instagram"),
  yt("_4YwKbZqako", "Buy Association", "Buy Association — Fountain Court", "portrait", asset("/media/social/buy-association.jpg")),
  local("social-bread", "5DB Media", "5DB Canteen — Bread teaser", asset("/media/social/bread-teaser.jpg"), "portrait"),
  ig("DbsZUhGMngR", "Borough Market", "Borough Market reel 3"),
  yt("yrAIbY1d-po", "5DB Media", "5DB — Band on Tour", "portrait"),
  ig("C0epaNJtyk2", "5DB Media", "5DB Media", "p"),
  yt("TFrwlGIHLfI", "5DB Media", "5DB — Meet the team", "portrait"),
  yt("46-0H0KQPLg", "5DB Media", "5DB — Gig round-up", "portrait"),
  yt("1nFfoj0aZgw", "5DB Media", "5DB — Interview cutdown", "portrait"),
];

/** Corporate — landscape carousel (playable YouTube first) */
export const corporate: WorkItem[] = [
  // Visual impact first; still-only cards toward the end; brands spread
  yt("IC-LhuzDrjk", "Missoni", "Missoni — Moonstone Interiors", "landscape", asset("/media/corporate/missoni-16x9.jpg")),
  yt("rnrffy_E3U0", "Fincar", "Fincar", "landscape", asset("/media/corporate/fincar-16x9.jpg")),
  yt("ExfVTBCSIZg", "Core Productions", "Core Productions — Partnership highlight", "landscape", asset("/media/corporate/core-agency-sizzle.jpg")),
  yt("bCHP3dBWUew", "Rothmore", "Rothmore — Tobacco Warehouse", "landscape", asset("/media/corporate/rothmore-tobacco-warehouse.jpg")),
  yt("RaLuIC3Qcag", "Buy Association", "Buy Association — Property Ad", "landscape", asset("/media/corporate/buy-association-16x9.jpg")),
  yt("5RmVsiePsII", "Waterhouse Gardens", "Waterhouse Gardens", "landscape", asset("/media/corporate/waterhouse-gardens.jpg")),
  yt("tkHTbjjOg4U", "Creative Image", "Creative Image Productions — Wedding edit", "landscape"),
  yt("thC5ePQJ7CE", "Core Productions", "Core Productions — Founders pitching investors", "landscape"),
  yt("4dr2xTe6-QA", "PensionBee", "PensionBee — James’s Story", "landscape"),
  yt("qvnz76sRMrA", "Stanley’s Stick", "Stanley’s Stick — Portfolio Excerpt", "landscape", asset("/media/corporate/stanleys-stick-preview.jpg")),
  yt("5YQCAJnYLzk", "5DB Media", "5DB — Full interview", "landscape"),
  yt("TQT7WDvhB6c", "PensionBee", "PensionBee — Sarah’s Story", "landscape"),
  yt("_4YwKbZqako", "Buy Association", "Buy Association — Fountain Court", "landscape"),
  yt("Dv8yn-BHGGk", "5DB Media", "5DB — Artists in Residence band intro", "landscape"),
  yt("Zt9eCXeBx34", "PensionBee", "PensionBee — Becca’s Story", "landscape"),
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

/** Podcasts */
export const podcasts: WorkItem[] = [
  yt("1WHRf51uFrA", "Lunch With…", "Lunch With… Ballin’ Jacks", "landscape"),
  local(
      "pod-eitik",
      "Everything I Thought I Knew",
      "Everything I Thought I Knew — Episode 1",
      asset("/media/podcasts/everything-i-thought-i-knew-episode-1.jpg"),
      "landscape",
    ),
  yt("iorwk_22ync", "Lunch With…", "Lunch With… Us", "landscape"),
  yt("9Khabl3tBVM", "Lunch With…", "Lunch With… Stepbrother", "landscape"),
];

/** Live productions */
export const lives: WorkItem[] = [
  yt("AsMuHbMUARE", "Lunch With…", "Lunch With… Ren Harvieu", "landscape"),
  yt("iwnXJ4laxXs", "Lunch With…", "Lunch With… Raquel Martins", "landscape"),
  yt("5inJCJizU-c", "Lunch With…", "Lunch With… Poppy Daniels", "landscape"),
  yt("NZIhqhNe-5k", "Lunch With…", "Lunch With… Mohan Evans", "landscape"),
];

export const workSections: CarouselSection[] = [
  { id: "social", heading: "Social", items: socialVideos },
  { id: "corporate", heading: "Corporate", items: corporate },
  { id: "podcasts", heading: "Podcast", items: podcasts },
  { id: "lives", heading: "Live productions", items: lives },
];
