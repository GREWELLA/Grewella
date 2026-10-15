import { useState } from "react";
import { ArrowRight, Bell, Check, ChevronRight, ClipboardCheck, FileSpreadsheet, Globe, MessageCircle, PhoneCall, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHead } from "./Brand";

const STAGES = [
  { icon: Globe, title: "Discover your business", detail: "A visitor finds your services and a clear way to get in touch.", label: "Your website", phase: "Discover" },
  { icon: Send, title: "Send an enquiry", detail: "They share what they need, their contact details and their consent.", label: "Project enquiry", phase: "Connect" },
  { icon: ClipboardCheck, title: "Check the details", detail: "Required fields are validated before the request is saved.", label: "Review & validation", phase: "Connect" },
  { icon: FileSpreadsheet, title: "Keep it organised", detail: "The enquiry is added to your Google Sheet, ready for follow-up.", label: "Google Sheets", phase: "Organise" },
  { icon: Bell, title: "Stay informed", detail: "Optional alerts can bring new enquiries to your inbox once email is configured.", label: "Optional email alert", phase: "Organise" },
  { icon: PhoneCall, title: "Start a conversation", detail: "You review the request and contact the customer using their preferred method.", label: "Personal follow-up", phase: "Follow up" },
] as const;

export function EnquiryJourney() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active] ?? STAGES[0];
  const Icon = stage.icon;
  return (
    <section className="bg-ink py-24 text-on-dark lg:py-32" aria-labelledby="enquiry-journey-title">
      <div className="container-g">
        <SectionHead tone="dark" eyebrow="How enquiries flow" title={<span id="enquiry-journey-title">From first click to <span className="highlight-word-dark">real conversation.</span></span>} intro="A clear path for your customers. An organised starting point for your business." />
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <ol className="journey-timeline" aria-label="Enquiry journey stages">
              {STAGES.map((item, i) => (
                <li key={item.title}>
                  <Button variant="ghost" onClick={() => setActive(i)} aria-pressed={active === i} aria-controls="enquiry-preview" className="journey-step">
                    <span className="journey-number">{i < active ? <Check className="size-4" /> : String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1"><span className="block text-base font-semibold sm:text-lg">{item.title}</span><span className="mt-1 block text-xs font-normal text-on-dark-muted">{item.phase}{i === 4 ? " · Needs setup" : ""}</span></span>
                    <ChevronRight className="size-4 shrink-0" />
                  </Button>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <div id="enquiry-preview" className="journey-preview" aria-live="polite" aria-atomic="true">
              <div className="flex items-center justify-between border-b border-line-dark px-6 py-4">
                <span className="flex items-center gap-2 text-xs font-medium text-on-dark-muted"><span className="size-2 rounded-full bg-aqua" />Illustrative journey</span>
                <span className="font-display text-xs text-on-dark-muted">{String(active + 1).padStart(2, "0")} / 06</span>
              </div>
              <div key={active} className="journey-preview-content anim-rise">
                <div className="mb-7 flex items-center gap-3"><span className="journey-icon"><Icon className="size-5" /></span><span className="text-sm font-semibold">{stage.label}</span></div>
                <div className="journey-art" aria-hidden="true">
                  {active === 0 && <><div className="flex items-center justify-between border-b border-border pb-4"><span className="font-display font-bold text-ink">Your business</span><span className="text-xs text-muted-foreground">Services · About</span></div><div className="mt-7 h-3 w-20 rounded bg-accent" /><p className="mt-3 max-w-64 font-display text-3xl font-bold leading-tight text-ink">Great service.<br />One clear next step.</p><div className="mt-6 inline-flex items-center gap-3 rounded bg-ink px-4 py-3 text-xs font-semibold text-on-dark">Get in touch <ArrowRight className="size-4" /></div></>}
                  {active === 1 && <><p className="font-display text-xl font-semibold text-ink">Let’s talk about your project</p><div className="mt-5 grid grid-cols-2 gap-3">{["Your name", "Your business", "Contact details", "Website service"].map(x => <span key={x} className="border-b border-border py-3 text-xs text-muted-foreground">{x}</span>)}</div><p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4 text-emphasis" />Shared with your permission</p><div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm font-semibold text-ink">Send enquiry <Send className="size-4" /></div></>}
                  {active === 2 && <><p className="font-display text-xl font-semibold text-ink">Ready to save</p><ul className="mt-6 space-y-5">{["Required details provided", "Contact format checked", "Data-use agreement confirmed"].map(x => <li key={x} className="flex items-center gap-3 text-sm text-ink"><span className="flex size-6 items-center justify-center rounded-full bg-accent text-emphasis"><Check className="size-3.5" /></span>{x}</li>)}</ul></>}
                  {active === 3 && <><p className="flex items-center gap-2 font-display text-lg font-semibold text-ink"><FileSpreadsheet className="size-5 text-emphasis" />Your enquiry records</p><div className="mt-6 overflow-hidden"><div className="grid grid-cols-3 gap-3 border-b border-border pb-3 text-xs text-muted-foreground"><span>Business</span><span>Service</span><span>Status</span></div>{["Example business", "Another business"].map((x,i) => <div key={x} className="grid grid-cols-3 items-center gap-3 border-b border-border py-4 text-xs text-ink"><span>{x}</span><span>{i === 0 ? "New website" : "Website care"}</span><span className="font-medium text-emphasis">Requested</span></div>)}</div><p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><Check className="size-4 text-emphasis" />One place to review and follow up</p></>}
                  {active === 4 && <><span className="inline-flex items-center gap-2 border-b border-border pb-3 text-xs font-semibold text-emphasis"><Bell className="size-4" />Optional · not configured</span><p className="mt-6 font-display text-2xl font-semibold text-ink">A new enquiry,<br />brought to your attention.</p><p className="mt-4 max-w-72 text-sm leading-relaxed text-muted-foreground">Email notifications need an email service and a verified sending domain.</p></>}
                  {active === 5 && <><p className="font-display text-xl font-semibold text-ink">The human part starts here.</p><div className="mt-6 flex items-start gap-3"><MessageCircle className="mt-1 size-5 shrink-0 text-emphasis" /><p className="border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground">Thanks for reaching out. Let’s discuss your business and what you need from your website.</p></div><div className="mt-6 flex gap-5 border-t border-border pt-4 text-xs text-ink"><span>WhatsApp</span><span>Phone</span><span>Email</span></div></>}
                </div>
                <h3 className="mt-7 font-display text-2xl font-semibold">{stage.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">{stage.detail}</p>
              </div>
              <div className="grid grid-cols-6 gap-1.5 px-6 pb-6" aria-hidden="true">{STAGES.map((x,i) => <span key={x.title} className={`h-1 rounded-full ${i <= active ? "bg-aqua" : "bg-line-dark"}`} />)}</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}