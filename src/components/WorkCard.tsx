"use client";

import { useRef, useState } from "react";
import type { WorkItem } from "@/data/projects";
import { useModals } from "./ModalProvider";

type Props = { item: WorkItem };

export default function WorkCard({ item }: Props) {
  const { openViewer } = useModals();
  const [playing, setPlaying] = useState(false);
  const [warmed, setWarmed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const portrait = item.aspect === "portrait";

  const shell = portrait
    ? "aspect-[9/16] basis-[clamp(180px,18.5vw,285px)] max-[700px]:basis-[min(62vw,250px)]"
    : "aspect-[16/10] basis-[clamp(320px,38vw,610px)] max-[700px]:basis-[min(86vw,520px)]";

  const warm = () => {
    if (!item.videoSrc || warmed) return;
    setWarmed(true);
  };

  const start = () => {
    if (item.videoSrc) {
      setWarmed(true);
      setPlaying(true);
      requestAnimationFrame(() => {
        const v = videoRef.current;
        if (!v) return;
        // Quiet by default (~20%); keep muted first so inline play stays seamless
        v.volume = 0.2;
        v.muted = true;
        void v.play().catch(() => {
          void v.play();
        });
      });
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
        className={`relative shrink-0 snap-start overflow-hidden bg-black ${shell}`}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
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

  if (playing && item.kind === "youtube" && item.youtubeId) {
    const embedParams =
      "autoplay=1&mute=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&fs=1&disablekb=0&controls=1";
    return (
      <article
        className={`relative shrink-0 snap-start overflow-hidden bg-black ${shell}`}
      >
        {/* Slight vertical overscan hides YouTube title/channel chrome without nuking controls */}
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?${embedParams}`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute left-0 top-[-10%] h-[120%] w-full border-0"
          />
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group relative shrink-0 snap-start overflow-hidden bg-[#111] ${shell}`}
      onMouseEnter={warm}
      onTouchStart={warm}
    >
      {item.poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] via-[#2a2a2a] to-[#111]" />
      )}

      {/* Warm cache on hover without showing controls */}
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
        aria-label={`Play ${item.title}`}
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
