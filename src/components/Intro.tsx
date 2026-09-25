"use client";

import { useModals } from "./ModalProvider";

export default function Intro() {
  const { openEmail } = useModals();

  return (
    <section className="grid grid-cols-1 items-start gap-4 bg-white px-[2.35%] py-[clamp(22px,3vw,36px)] md:grid-cols-3 md:items-center md:gap-x-6 md:gap-y-0 lg:gap-x-10">
      <h1 className="m-0 text-[clamp(1.05rem,1.7vw,1.75rem)] font-normal leading-[1.1] tracking-[-0.03em] text-ink md:text-left">
        Looking to capture, create, or sell story?
      </h1>
      <p className="m-0 text-[clamp(0.88rem,1.05vw,1.05rem)] leading-[1.2] text-[#444] md:text-center">
        Happy to help, from conception to final cut.
      </p>
      <div className="md:justify-self-end">
        <button
          type="button"
          onClick={openEmail}
          className="whitespace-nowrap border border-ink bg-ink px-[18px] py-[9px] text-[0.7rem] uppercase tracking-[0.1em] text-white transition-colors hover:bg-transparent hover:text-ink"
        >
          Get in touch
        </button>
      </div>
    </section>
  );
}
