"use client";

import type { WorkItem } from "@/data/projects";

type Props = {
  item: WorkItem;
  onClose: () => void;
};

export default function MediaViewer({ item, onClose }: Props) {
  const portrait = item.aspect === "portrait";

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-[#080808] px-[5vw] pb-6 pt-[78px] text-white max-[700px]:px-3.5 max-[700px]:pt-[68px]"
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
    >
      <button
        type="button"
        aria-label="Close viewer"
        onClick={onClose}
        className="absolute right-[2.5%] top-5 z-[3] h-11 w-11 text-[2.5rem] font-extralight leading-none text-white"
      >
        ×
      </button>

      <div className="grid flex-1 place-items-center">
        {item.videoSrc ? (
          <video
            src={item.videoSrc}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            className={
              portrait
                ? "max-h-[76vh] w-[min(430px,78vw)] bg-black object-contain"
                : "max-h-[76vh] max-w-[min(88vw,1240px)] bg-black object-contain"
            }
          />
        ) : item.kind === "youtube" && item.youtubeId ? (
          <div
            className={
              portrait
                ? "relative h-[min(76vh,760px)] w-[min(430px,78vw)] overflow-hidden bg-black"
                : "relative h-[min(76vh,698px)] w-[min(88vw,1240px)] overflow-hidden bg-black"
            }
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&fs=1&disablekb=0&controls=1`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute left-0 top-[-10%] h-[120%] w-full border-0"
            />
          </div>
        ) : item.kind === "instagram" ? (
          <div className="flex w-full max-w-[min(480px,92vw)] flex-col items-center gap-4">
            <iframe
              src={`${item.url.replace(/\/?$/, "/")}embed/captioned/`}
              title={item.title}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="h-[min(78vh,760px)] w-full border-0 bg-black"
            />
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider text-[#bcbcbc] underline-offset-2 hover:text-white hover:underline"
            >
              Open on Instagram ↗
            </a>
          </div>
        ) : item.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.poster}
            alt={item.title}
            className={
              portrait
                ? "max-h-[76vh] w-[min(430px,78vw)] object-contain"
                : "max-h-[76vh] max-w-[min(88vw,1240px)] object-contain"
            }
          />
        ) : item.url && item.url !== "#" ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white px-6 py-3 uppercase tracking-wider"
          >
            Open project ↗
          </a>
        ) : null}
      </div>

      <p className="mt-3 text-center text-[0.82rem] uppercase tracking-[0.08em] text-[#bcbcbc]">
        {item.title}
      </p>
    </div>
  );
}
