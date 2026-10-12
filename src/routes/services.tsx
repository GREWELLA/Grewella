import { createFileRoute } from "@tanstack/react-router";
import { FinalCTA, LeadFlow, PageHero, Services } from "@/components/site/Sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => seo("Services | Grewella", "Website design and development, lead capture, practical automation and website care for small businesses."),
  component: () => (
    <>
      <PageHero eyebrow="Services" title="Websites and tools that help your business grow." intro="Clear services, plain language, and honest notes on what needs extra setup or paid tools." />
      <Services full />
      <LeadFlow />
      <FinalCTA />
    </>
  ),
});
