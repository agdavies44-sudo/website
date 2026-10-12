import Contact from "@/components/Contact";
import SiteHeader from "@/components/SiteHeader";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="min-h-screen bg-ink">
        <Contact />
      </main>
    </>
  );
}
