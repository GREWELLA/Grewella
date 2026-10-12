import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FinalCTA, PageHero } from "@/components/site/Sections";
import { seo } from "@/lib/seo";

const QA = [
  ["I'm not technical. Can I still work with you?", "Absolutely. We explain everything in plain language and handle the technical parts for you."],
  ["How much does a website cost?", "Every business is different, so website projects are quoted after a short conversation about what you need. Ongoing care starts at ₹499/month."],
  ["How long does it take?", "It depends on the number of pages, content readiness and features. We agree a timeline with you before starting."],
  ["Do I own my website and domain?", "Yes. Your domain is registered in your name, and if you stop working with us we hand over all access."],
  ["Will my website work on mobile phones?", "Yes — every website we build is designed mobile-first and tested on phones, tablets and desktops."],
  ["Where do my website enquiries go?", "We can set up enquiries to be saved into a Google Sheet you own, along with WhatsApp and call buttons. Email alerts can be added with extra setup."],
  ["What does 'needs setup' mean?", "Some features, like automations or notifications, need accounts with other tools. We'll explain any costs before setting them up."],
  ["Can I cancel a care plan?", "Yes, with notice. There are no lock-ins."],
];

export const Route = createFileRoute("/faq")({
  head: () => seo("FAQ | Grewella", "Answers to common questions about Grewella websites, pricing, ownership, timelines and support."),
  component: () => (
    <>
      <PageHero eyebrow="FAQ" title="Questions, answered simply." />
      <section className="py-20">
        <div className="container-g max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {QA.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="rounded-2xl border border-border bg-card px-5">
                <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold text-ink">{q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-base text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <FinalCTA />
    </>
  ),
});
