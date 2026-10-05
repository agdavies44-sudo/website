import { site } from "@/data/site";

const links = [
  { label: "Instagram", href: site.social.instagram },
  { label: "LinkedIn", href: site.social.linkedin },
] as const;

export default function SocialLinks() {
  return (
    <div className="bg-white px-[2.35%] pb-[clamp(38px,5vw,72px)]">
      <div className="grid grid-cols-1 border-y border-line sm:grid-cols-2">
        {links.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between px-5 py-[17px] text-[clamp(1rem,1.5vw,1.3rem)] transition-colors hover:bg-paper ${
              i > 0 ? "border-t border-line sm:border-t-0 sm:border-l" : ""
            }`}
          >
            <span>{link.label}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
