import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Sections";
import { SITE } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy Notice | Grewella", "How Grewella collects, uses and handles the information you share through this website."),
  component: () => (
    <>
      <PageHero eyebrow="Privacy" title="Privacy notice" intro="Plain-language summary of how we handle your information. Last updated October 2026." />
      <article className="container-g max-w-3xl space-y-8 py-16 leading-relaxed text-foreground [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink">
        <section><h2>What we collect</h2><p className="mt-3">Only what you enter in our forms: your name, business name and category, phone number, optional email and website, the service you're interested in, budget range, project notes, preferred contact method, and for consultations your preferred date, time and meeting type.</p></section>
        <section><h2>Why we collect it</h2><p className="mt-3">To respond to your enquiry, arrange a consultation and discuss our services. If you tick the optional marketing box, we may also send occasional tips and offers.</p></section>
        <section><h2>How it is stored and who processes it</h2><p className="mt-3">Form submissions are sent over HTTPS to our server and saved in a Google Sheet controlled by Grewella. Google (Google Workspace) processes this data as our service provider. We do not sell your information.</p></section>
        <section><h2>Cookies and tracking</h2><p className="mt-3">This website does not use advertising or analytics cookies. It stores one small value on your device to remember that you have seen the privacy notice. No personal information is stored in it.</p></section>
        <section><h2>How long we keep it</h2><p className="mt-3">We keep enquiry details for as long as needed to respond and, if you become a client, for the duration of our work together and any legal record-keeping period. You can ask us to delete your details earlier.</p></section>
        <section><h2>Your rights</h2><p className="mt-3">Under India's Digital Personal Data Protection Act, you can ask to access, correct or erase your personal data, withdraw consent, or raise a grievance. Contact us at +91 {SITE.phone} (phone or WhatsApp) and we'll respond promptly.</p></section>
        <section><h2>Your consent choices</h2><p className="mt-3">On your first visit we ask you to Reject all, Select preferred or Accept all. "Enquiries & appointments" consent is needed to use our forms; marketing is always optional. Change your choice anytime via "Privacy preferences" in the footer. Withdrawing consent does not affect processing already done.</p></section>
        <section><h2>Grievances</h2><p className="mt-3">For any privacy concern, contact our grievance contact at +91 {SITE.phone}. If unresolved, you may approach the Data Protection Board of India.</p></section>
        <p className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">This notice describes the website as currently built. It should be reviewed by the business owner against its actual practices and applicable law before launch.</p>
      </article>
    </>
  ),
});
