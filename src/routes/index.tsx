import { createFileRoute } from "@tanstack/react-router";
import { About, Analytics, BeforeAfter, Capabilities, FinalCTA, Hero, LeadFlow, Portfolio, Pricing, Problem, Process, Services } from "@/components/site/Sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Grewella | Creative Websites for Growing Businesses", "Grewella creates thoughtful, mobile-first websites and practical digital solutions for small businesses in India."),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Capabilities />
      <Problem />
      <Services />
      <Portfolio />
      <BeforeAfter />
      <Process />
      <Pricing />
      <LeadFlow />
      <Analytics />
      <About />
      <FinalCTA />
    </>
  );
}
