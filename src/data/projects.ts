import { asset } from "@/lib/asset";
import workData from "./work.json";

export type MediaKind = "youtube" | "vimeo" | "instagram" | "image" | "external" | "video";

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

export type WorkContent = {
  social: WorkItem[];
  corporate: WorkItem[];
  podcasts: WorkItem[];
  lives: WorkItem[];
};

function localizePath(path: string | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  return asset(path);
}

function hydrate(item: WorkItem): WorkItem {
  return {
    ...item,
    poster: localizePath(item.poster),
    videoSrc: localizePath(item.videoSrc),
  };
}

const raw = workData as WorkContent;

export const socialVideos: WorkItem[] = raw.social.map(hydrate);
export const corporate: WorkItem[] = raw.corporate.map(hydrate);
export const podcasts: WorkItem[] = raw.podcasts.map(hydrate);
export const lives: WorkItem[] = raw.lives.map(hydrate);

export const workSections: CarouselSection[] = [
  { id: "social", heading: "Social", items: socialVideos },
  { id: "corporate", heading: "Corporate", items: corporate },
  { id: "podcasts", heading: "Podcast", items: podcasts },
  { id: "lives", heading: "Live productions", items: lives },
];
