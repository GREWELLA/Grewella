import { createFileRoute } from "@tanstack/react-router";
import { FinalCTA, PageHero, Process } from "@/components/site/Sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/process")({
  head: () => seo("Process | Grewella", "How Grewella takes your website from first conversation to launch: discover, design, build, launch."),
  component: () => (
    <>
      <PageHero eyebrow="Process" title="Simple steps, clear agreements." intro="Timelines depend on your project's scope and are agreed with you before work begins." />
      <Process />
      <FinalCTA />
    </>
  ),
});
