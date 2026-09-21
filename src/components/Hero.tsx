import { asset } from "@/lib/asset";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[min(880px,84svh)] min-h-[560px] overflow-hidden bg-[#111] max-[700px]:h-[68svh] max-[700px]:min-h-[440px]"
    >
      {/* Stable Italy still — always visible; never swapped for a video frame */}
      <img
        src={asset("/media/hero-italy-104.jpg")}
        alt=""
        className="absolute inset-0 h-full w-full scale-[1.002] object-cover object-center"
        decoding="async"
        fetchPriority="high"
      />
      {/* Signature animation on black — screen blend drops black so Italy shows through */}
      <video
        className="absolute inset-0 z-[1] h-full w-full scale-[1.002] object-cover object-center mix-blend-screen"
        autoPlay
        muted
        loop
        playsInline
        aria-label="Alexandra Davies signature animation"
      >
        <source src={asset("/media/hero-signature.mp4")} type="video/mp4" />
      </video>
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/15 via-transparent via-55% to-black/35"
        aria-hidden="true"
      />
    </section>
  );
}
