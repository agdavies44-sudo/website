"use client";

import { useModals } from "./ModalProvider";

export default function Contact() {
  const { openEmail, openPhone } = useModals();

  return (
    <section id="contact" className="min-h-screen bg-ink px-[2.35%] pb-8 pt-[clamp(52px,8vw,118px)] text-white">
      <p className="text-[0.74rem] uppercase tracking-[0.12em] text-[#a5a5a1]">
        Have a brief, a launch or the start of an idea?
      </p>
      <h2 className="mt-[18px] mb-[clamp(50px,8vw,100px)] max-w-[9ch] text-[clamp(4rem,10vw,11rem)] font-normal leading-[0.82] tracking-[-0.075em]">
        Let’s make it worth watching.
      </h2>
      <div className="flex flex-col items-start justify-between gap-7 border-t border-[#555] pt-5 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={openEmail}
          className="text-[clamp(1.2rem,2.2vw,2rem)] text-white hover:opacity-80"
        >
          Start a conversation <span aria-hidden="true">↗</span>
        </button>
        <button
          type="button"
          onClick={openPhone}
          className="text-sm text-white/80 hover:text-white"
        >
          Get in touch
        </button>
      </div>
    </section>
  );
}
