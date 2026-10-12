import { createFileRoute } from "@tanstack/react-router";
import { BookingForm } from "@/components/site/Forms";
import { PageHero } from "@/components/site/Sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/book")({
  head: () => seo("Book a Consultation | Grewella", "Request a free phone, video or in-person consultation with Grewella to discuss your website."),
  component: () => (
    <>
      <PageHero eyebrow="Book a consultation" title="Let's talk about your project." intro="Pick a preferred date and time. We'll confirm the exact slot with you — your consultation is booked only once we confirm." />
      <section className="py-16 lg:py-24">
        <div className="container-g max-w-3xl"><BookingForm /></div>
      </section>
    </>
  ),
});
