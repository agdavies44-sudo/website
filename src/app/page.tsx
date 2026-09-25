import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Photography from "@/components/Photography";
import SiteHeader from "@/components/SiteHeader";
import SocialLinks from "@/components/SocialLinks";
import WorkSection from "@/components/WorkSection";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-[100] focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Intro />
        <WorkSection />
        <Photography />
        <SocialLinks />
        <Contact />
      </main>
      <footer className="flex flex-wrap items-center justify-between gap-4 bg-ink px-[2.35%] py-[18px] text-[0.76rem] text-[#a5a5a1]">
        <a href="#main" className="text-white hover:opacity-80">
          Alexandra Davies
        </a>
        <span className="hidden sm:inline">From idea to final cut</span>
        <span className="flex items-center gap-3">
          <a href="/edit" className="opacity-40 hover:opacity-80" title="Content editor">Edit</a>
          <span>© 2026</span>
        </span>
      </footer>
    </>
  );
}
