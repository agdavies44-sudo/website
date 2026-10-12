"use client";

import { useEffect, useState } from "react";
import { useModals } from "./ModalProvider";

export default function SiteHeader() {
  const { openPhone, openEmail } = useModals();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    function onScroll() {
      const hero = document.getElementById("hero");
      const threshold = hero ? hero.offsetHeight - 40 : 420;
      setSolid(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 flex items-center justify-between px-[2.35%] transition-all duration-250 ${
        solid
          ? "min-h-[72px] border-b border-line bg-[rgba(244,244,242,0.96)] text-ink backdrop-blur-[12px]"
          : "min-h-[86px] bg-gradient-to-b from-black/55 to-transparent text-white"
      }`}
    >
      <a
        href="/"
        className="wordmark text-[clamp(1.55rem,2.8vw,2.65rem)]"
        aria-label="Alexandra Davies, home"
      >
        Alexandra Davies
      </a>
      <nav
        aria-label="Main navigation"
        className="flex items-center gap-[clamp(14px,2.5vw,40px)] text-[0.78rem] uppercase tracking-[0.12em] max-[700px]:text-[0.66rem] max-[700px]:tracking-[0.08em]"
      >
        <button
          type="button"
          onClick={openPhone}
          className="border-b border-transparent py-[10px] pb-[7px] uppercase tracking-[0.12em] hover:border-current"
        >
          Phone
        </button>
        <button
          type="button"
          onClick={openEmail}
          className="border-b border-transparent py-[10px] pb-[7px] uppercase tracking-[0.12em] hover:border-current"
        >
          Email
        </button>
        <a
          href="/#work"
          className="border-b border-transparent py-[10px] pb-[7px] uppercase tracking-[0.12em] hover:border-current"
        >
          Work
        </a>
      </nav>
    </header>
  );
}
