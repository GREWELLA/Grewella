import { createFileRoute } from "@tanstack/react-router";
import { BeforeAfter, FinalCTA, PageHero, Portfolio } from "@/components/site/Sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/work")({
  head: () => seo("Our Work | Grewella", "Concept website designs for clinics, retail and professional services, plus an illustrative before-and-after redesign."),
  component: () => (
    <>
      <PageHero eyebrow="Our work" title="Concepts that show how we think." intro="All projects on this page are concept designs created by Grewella, not client work." />
      <Portfolio />
      <BeforeAfter />
      <FinalCTA />
    </>
  ),
});
