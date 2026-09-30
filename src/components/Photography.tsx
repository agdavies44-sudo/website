"use client";

import { useRef, useState } from "react";
import { photography } from "@/data/photography";
import { asset } from "@/lib/asset";

export default function Photography() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const visible = expanded ? photography : photography.slice(0, 8);

  function scrollBy(dir: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.7, 600), behavior: "smooth" });
  }

  return (
    <section className="bg-white px-[2.35%] py-[clamp(40px,6vw,86px)]">
      <div className="mb-[15px] flex items-end justify-between gap-6">
        <div>
          <h2 className="text-[clamp(1.8rem,3.2vw,2.5rem)] font-normal text-muted">
            Photography
          </h2>
          <p className="mt-1 text-[0.74rem] uppercase tracking-[0.12em] text-muted">
            Travel · Event · Candid
          </p>
        </div>
        <div className="flex gap-[7px]">
          <button
            type="button"
            aria-label="Previous photography"
            onClick={() => scrollBy(-1)}
            className="flex h-[38px] w-[38px] items-center justify-center border border-[#999] hover:bg-ink hover:text-white transition-colors"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next photography"
            onClick={() => scrollBy(1)}
            className="flex h-[38px] w-[38px] items-center justify-center border border-[#999] hover:bg-ink hover:text-white transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="carousel-track flex gap-[clamp(12px,1.4vw,22px)] overflow-x-auto overflow-y-hidden px-[2px] pb-[13px] snap-x snap-proximity"
      >
        {visible.map((photo) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setLightbox(asset(photo.src))}
            title={photo.category.charAt(0).toUpperCase() + photo.category.slice(1)}
            className={`photo relative h-[clamp(310px,36vw,540px)] shrink-0 snap-start overflow-hidden bg-[#deded9] cursor-zoom-in max-[700px]:h-[min(108vw,470px)] ${
              photo.variant === "wide"
                ? "basis-[clamp(430px,48vw,760px)] max-[700px]:basis-[88vw]"
                : photo.variant === "portrait"
                  ? "basis-[clamp(230px,25vw,380px)] max-[700px]:basis-[62vw]"
                  : "basis-[clamp(300px,32vw,520px)] max-[700px]:basis-[76vw]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(photo.src)}
              alt={photo.alt}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.025] hover:brightness-90"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          setExpanded(true);
          requestAnimationFrame(() => {
            trackRef.current?.scrollTo({
              left: trackRef.current.scrollWidth,
              behavior: "smooth",
            });
          });
        }}
        className="mx-auto mt-7 block border border-ink bg-transparent px-[18px] py-[10px] text-[0.74rem] uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-white transition-colors"
      >
        View all photography
      </button>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Photography lightbox"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-[2.5%] top-5 text-4xl font-light text-white"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt=""
            className="max-h-[90vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
