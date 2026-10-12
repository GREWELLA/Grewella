import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => seo("Terms of Service | Grewella", "The basic terms for using the Grewella website and working with Grewella."),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Terms of service" />
      <article className="container-g max-w-3xl space-y-6 py-16 leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink">
        <section><h2>Website content</h2><p className="mt-3">Information on this site is a general description of our services. Concept projects are illustrative designs, not client work.</p></section>
        <section><h2>Quotes and scope</h2><p className="mt-3">Every project is confirmed with a written scope and quote. Prices shown are starting points and may change before agreement.</p></section>
        <section><h2>Care plans</h2><p className="mt-3">Monthly plans renew each month until cancelled with notice. Support is limited to the inclusions of each plan.</p></section>
        <section><h2>Ownership</h2><p className="mt-3">Once paid, you own your website content and domain. We hand over access on request or cancellation.</p></section>
        <p className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">Draft terms — please review with the business owner before launch.</p>
      </article>
    </>
  ),
});
