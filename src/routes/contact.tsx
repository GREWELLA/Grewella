import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { EnquiryForm } from "@/components/site/Forms";
import { PageHero } from "@/components/site/Sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ service: z.string().optional() }),
  head: () => seo("Start a Project | Grewella", "Tell Grewella about your business and the website you need. We'll reply to discuss scope and next steps."),
  component: Contact,
});

function Contact() {
  const { service } = Route.useSearch();
  return (
    <>
      <PageHero eyebrow="Start a project" title="Tell us about your business." intro="Takes about two minutes. We only ask for what we need to reply." />
      <section className="py-16 lg:py-24">
        <div className="container-g grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7"><EnquiryForm defaultService={service} /></div>
          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-3xl bg-ink p-8 text-on-dark">
              <h2 className="text-xl font-semibold">What happens next?</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-on-dark-muted">
                <li>Your enquiry is saved securely for our team.</li>
                <li>We review it and contact you the way you prefer.</li>
                <li>We discuss scope, design and a written quote.</li>
              </ol>
            </div>
            <p className="text-muted-foreground">Prefer to talk first? <Link to="/book" className="link-u font-semibold text-ink">Book a consultation</Link>.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
