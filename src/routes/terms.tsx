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
        <section><h2>Payments</h2><p className="mt-3">One-time project fees and monthly plan fees are payable as agreed in writing. Third-party costs (domains, hosting, paid tools) are billed separately at cost.</p></section>
        <section><h2>Your responsibilities</h2><p className="mt-3">You confirm you have the rights to any content, logos and images you give us, and that the information you submit through this site is accurate.</p></section>
        <section><h2>Personal data</h2><p className="mt-3">We handle personal data as described in our Privacy Policy and in line with the Digital Personal Data Protection Act, 2023. You can withdraw consent anytime from "Privacy preferences" in the footer.</p></section>
        <section><h2>Liability</h2><p className="mt-3">We take care to build and test every website, but we can't guarantee uninterrupted operation of third-party services such as hosting, Google or WhatsApp.</p></section>
        <section><h2>Governing law</h2><p className="mt-3">These terms are governed by the laws of India.</p></section>
        <p className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">Draft terms — please review with the business owner before launch.</p>
      </article>
    </>
  ),
});
