import { createFileRoute } from "@tanstack/react-router";
import { FinalCTA, PageHero, Pricing } from "@/components/site/Sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () => seo("Pricing | Grewella", "Custom website projects, Basic Website Care at ₹499/month, and Growth & Automation at ₹999/month."),
  component: () => (
    <>
      <PageHero eyebrow="Pricing" title="Transparent pricing, clearly scoped." intro="No hidden fees, no fake discounts. One-time and monthly charges are always shown separately." />
      <Pricing full />
      <section className="pb-24">
        <div className="container-g grid gap-6 md:grid-cols-3">
          {[
            ["Domain & hosting", "Your domain is registered in your name. Renewal fees are charged by the registrar. We help coordinate hosting."],
            ["Billing & renewal", "Care plans are billed monthly in advance and renew each month until cancelled."],
            ["Cancellation & handover", "Cancel with notice at any time. We hand over all logins, files and access to you."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-ink">{t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  ),
});
