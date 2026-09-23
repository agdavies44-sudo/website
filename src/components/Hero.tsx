"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

/**
 * Italy still is always the base layer.
 * Prefer VP9 WebM with real alpha (no mix-blend — Safari often paints
 * opaque MP4 black when mix-blend-screen is used on <video>).
 * MP4 keeps mix-blend-screen + isolation as a fallback path.
 */
export default function Hero() {
  const [preferBlend, setPreferBlend] = useState(false);
  const [showStatic, setShowStatic] = useState(false);

  useEffect(() => {
    const probe = document.createElement("video");
    const webm =
      probe.canPlayType('video/webm; codecs="vp9"') ||
      probe.canPlayType("video/webm");
    // Only force screen-blend when WebM (alpha) is unavailable.
    setPreferBlend(!webm);
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate h-[min(880px,84svh)] min-h-[560px] overflow-hidden bg-[#111] max-[700px]:h-[68svh] max-[700px]:min-h-[440px]"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Stable Italy still — always visible under the signature */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/media/hero-italy-104.jpg")}
        alt=""
        className="absolute inset-0 h-full w-full scale-[1.002] object-cover object-center"
        decoding="async"
        fetchPriority="high"
      />

      {!showStatic ? (
        <video
          className={
            preferBlend
              ? "absolute inset-0 z-[1] h-full w-full scale-[1.002] object-cover object-center mix-blend-screen"
              : "absolute inset-0 z-[1] h-full w-full scale-[1.002] object-cover object-center"
          }
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={asset("/media/hero-signature.png")}
          aria-label="Alexandra Davies signature animation"
          onError={() => setShowStatic(true)}
        >
          {/* Alpha WebM first — no blend needed */}
          <source
            src={asset("/media/hero-signature.webm")}
            type='video/webm; codecs="vp9"'
          />
          {/* Opaque MP4 fallback — screen blend knocks out black */}
          <source src={asset("/media/hero-signature.mp4")} type="video/mp4" />
        </video>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={asset("/media/hero-signature.png")}
          alt=""
          className="absolute inset-0 z-[1] h-full w-full scale-[1.002] object-cover object-center"
          decoding="async"
        />
      )}

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/15 via-transparent via-55% to-black/35"
        aria-hidden="true"
      />
    </section>
  );
}
