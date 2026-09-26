"use client";

import { FormEvent, useMemo, useState } from "react";
import { site } from "@/data/site";

type Props = {
  onClose: () => void;
  onSwitchToEmail: () => void;
};

export default function PhoneModal({ onClose, onSwitchToEmail }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [revealed, setRevealed] = useState(false);

  const valid = useMemo(() => {
    return (
      name.trim().length > 1 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    );
  }, [name, email]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setRevealed(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/84 backdrop-blur-[7px]" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="phone-heading"
        className="relative w-[min(560px,calc(100%-32px))] max-h-[90vh] overflow-auto bg-white p-10 text-ink shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-[15px] top-[10px] text-[2rem] leading-none text-ink"
        >
          ×
        </button>
        <p className="text-[0.85rem] text-muted">Get in touch</p>
        <h2
          id="phone-heading"
          className="mt-3.5 mb-6 text-[2.2rem] leading-[1.1] tracking-[-0.04em]"
        >
          Call Alexandra.
        </h2>
        {!revealed ? (
          <form onSubmit={onSubmit}>
            <p className="mb-5 text-[#333]">
              Please share your details to reveal Alexandra&apos;s phone
              numbers.
            </p>
            <label className="mb-4 block text-[0.9rem]">
              Your name
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-[7px] block w-full border border-[#bbb] bg-[#fafafa] px-[11px] py-[11px]"
                autoComplete="name"
                required
              />
            </label>
            <label className="mb-4 block text-[0.9rem]">
              Your email
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-[7px] block w-full border border-[#bbb] bg-[#fafafa] px-[11px] py-[11px]"
                autoComplete="email"
                required
              />
            </label>
            <label className="mb-4 block text-[0.9rem]">
              Your message <span className="text-muted">(optional)</span>
              <textarea
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-[7px] block w-full resize-y border border-[#bbb] bg-[#fafafa] px-[11px] py-[11px]"
              />
            </label>
            <button
              type="submit"
              disabled={!valid}
              className="bg-accent px-5 py-3 text-white hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Show numbers
            </button>
          </form>
        ) : (
          <div aria-live="polite">
            <p className="mb-5 text-[#333]">
              Thanks, {name.trim()}. You can reach Alexandra on either number:
            </p>
            <div className="mb-6 flex flex-col gap-3">
              <a
                href={site.phone.uk.href}
                className="text-[1.15rem] text-accent underline underline-offset-4 hover:opacity-80"
              >
                {site.phone.uk.label}
              </a>
              <a
                href={site.phone.us.href}
                className="text-[1.15rem] text-accent underline underline-offset-4 hover:opacity-80"
              >
                {site.phone.us.label}
              </a>
            </div>
            <button
              type="button"
              onClick={onSwitchToEmail}
              className="bg-accent px-5 py-3 text-white hover:bg-accent/90"
            >
              Send a message instead
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
