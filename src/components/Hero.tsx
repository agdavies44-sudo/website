"use client";

import { asset } from "@/lib/asset";

/**
 * Italy still is always the base layer.
 * Signature WebM/MP4 are opaque (no alpha) and mix-blend-screen on <video>
 * is unreliable in Safari, so we overlay the transparent PNG instead.
 * (We can bring the animated signature back once we ship a true-alpha WebM.)
 */
const SIG_V = "20260925b";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate h-[min(880px,84svh)] min-h-[560px] overflow-hidden bg-[#111] max-[700px]:h-[68svh] max-[700px]:min-h-[440px]"
      style={{ transform: "translateZ(0)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/media/hero-italy-104.jpg")}
        alt=""
        className="absolute inset-0 z-0 h-full w-full scale-[1.002] object-cover object-center"
        decoding="async"
        fetchPriority="high"
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${asset("/media/hero-signature.png")}?v=${SIG_V}`}
        alt="Alexandra Davies"
        className="absolute inset-0 z-[1] h-full w-full scale-[1.002] object-cover object-center"
        decoding="async"
      />

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/15 via-transparent via-55% to-black/35"
        aria-hidden="true"
      />
    </section>
  );
}
