"use client";

import { useRef, type ReactNode } from "react";

type Props = {
  heading: string;
  label: string;
  children: ReactNode;
  className?: string;
};

export default function Carousel({ heading, label, children, className }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.72, 520);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <div className={className}>
      <div className="mb-[15px] flex items-end justify-between gap-6 border-b border-line pb-[11px]">
        <h3 className="text-[clamp(1.25rem,2vw,2rem)] font-normal tracking-[-0.035em] text-mid">
          {heading}
        </h3>
        <div className="flex gap-[7px]">
          <button
            type="button"
            aria-label={`Previous ${label}`}
            onClick={() => scrollBy(-1)}
            className="flex h-[38px] w-[38px] items-center justify-center border border-[#999] bg-transparent text-ink hover:bg-ink hover:text-white transition-colors"
          >
            ←
          </button>
          <button
            type="button"
            aria-label={`Next ${label}`}
            onClick={() => scrollBy(1)}
            className="flex h-[38px] w-[38px] items-center justify-center border border-[#999] bg-transparent text-ink hover:bg-ink hover:text-white transition-colors"
          >
            →
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        tabIndex={0}
        aria-label={label}
        className="carousel-track flex items-start gap-[clamp(10px,1.2vw,18px)] overflow-x-auto overflow-y-hidden px-[2px] pb-[13px] snap-x snap-proximity"
      >
        {children}
      </div>
    </div>
  );
}
