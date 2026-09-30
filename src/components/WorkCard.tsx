"use client";

import { useRef, useState } from "react";
import type { WorkItem } from "@/data/projects";
import { vimeoEmbedSrc, youtubeEmbedSrc } from "@/lib/embeds";
import { useModals } from "./ModalProvider";

type Props = { item: WorkItem };

export default function WorkCard({ item }: Props) {
  const { openViewer } = useModals();
  const [playing, setPlaying] = useState(false);
  const [warmed, setWarmed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const portrait = item.aspect === "portrait";

  // Explicit width + self-start so flex stretch cannot defeat aspect-ratio.
  // Social = 9:16; Corporate / Podcast / Lives = 16:9.
  // object-cover fills the matched frame (no letterboxing inside the card).
  const shell = portrait
    ? "aspect-[9/16] w-[clamp(180px,18.5vw,285px)] max-[700px]:w-[min(62vw,250px)]"
    : "aspect-[16/9] w-[clamp(320px,38vw,610px)] max-[700px]:w-[min(86vw,520px)]";

  const warm = () => {
    if (!item.videoSrc || warmed) return;
    setWarmed(true);
  };

  const start = () => {
    // Prefer native HTML5 when a local MP4 exists — no host branding.
    if (item.videoSrc) {
      setWarmed(true);
      setPlaying(true);
      requestAnimationFrame(() => {
        const v = videoRef.current;
        if (!v) return;
        v.volume = 0.2;
        v.muted = true;
        void v.play().catch(() => {
          void v.play();
        });
      });
      return;
    }
    if (item.kind === "vimeo" && item.vimeoId) {
      setPlaying(true);
      return;
    }
    if (item.kind === "youtube" && item.youtubeId) {
      setPlaying(true);
      return;
    }
    openViewer(item);
  };

  if (playing && item.videoSrc) {
    return (
      <article
        className={`relative shrink-0 grow-0 self-start snap-start overflow-hidden bg-black ${shell}`}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={item.videoSrc}
          poster={item.poster}
          controls
          playsInline
          preload="auto"
          autoPlay
          muted
          onLoadedMetadata={(e) => {
            e.currentTarget.volume = 0.2;
          }}
        />
      </article>
    );
  }

  if (playing && item.kind === "vimeo" && item.vimeoId) {
    return (
      <article
        className={`relative shrink-0 grow-0 self-start snap-start overflow-hidden bg-black ${shell}`}
      >
        <iframe
          src={vimeoEmbedSrc(item.vimeoId)}
          title={item.title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </article>
    );
  }

  if (playing && item.kind === "youtube" && item.youtubeId) {
    return (
      <article
        className={`relative shrink-0 grow-0 self-start snap-start overflow-hidden bg-black ${shell}`}
      >
        <iframe
          src={youtubeEmbedSrc(item.youtubeId)}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </article>
    );
  }

  const playable = Boolean(
    item.videoSrc ||
      (item.kind === "vimeo" && item.vimeoId) ||
      (item.kind === "youtube" && item.youtubeId),
  );

  return (
    <article
      className={`group relative shrink-0 grow-0 self-start snap-start overflow-hidden bg-[#111] ${shell}`}
      onMouseEnter={warm}
      onTouchStart={warm}
    >
      {item.poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] via-[#2a2a2a] to-[#111]" />
      )}

      {warmed && item.videoSrc ? (
        <video
          className="pointer-events-none absolute h-0 w-0 opacity-0"
          src={item.videoSrc}
          preload="auto"
          muted
          playsInline
          aria-hidden
        />
      ) : null}

      <button
        type="button"
        onClick={start}
        className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-b from-black/15 to-black/55 p-[18px] text-center text-white transition-colors hover:from-black/5 hover:to-[rgba(114,43,61,0.68)]"
        aria-label={playable ? `Play ${item.title}` : `View ${item.title}`}
      >
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-black/35 text-lg"
          aria-hidden
        >
          ▶
        </span>
        <span
          className={`relative z-[1] max-w-[90%] font-medium uppercase leading-none tracking-[0.13em] text-white ${
            portrait
              ? "text-[clamp(0.72rem,1.05vw,1rem)]"
              : "text-[clamp(0.84rem,1.45vw,1.45rem)]"
          }`}
          style={{ textShadow: "0 2px 18px rgba(0,0,0,.7)" }}
        >
          {item.brand}
        </span>
      </button>
    </article>
  );
}
