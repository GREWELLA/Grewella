import { Link } from "@tanstack/react-router";
import { ArrowRight, Bell, Bot, Check, ClipboardCheck, Code2, FileSpreadsheet, LifeBuoy, MessageCircle, MousePointerClick, Palette, PhoneCall, Rocket, Search, Send, ShieldCheck, Sparkles, UserRound, Wrench } from "lucide-react";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import aurelia from "@/assets/work-aurelia.jpg";
import craft from "@/assets/work-craft.jpg";
import meridian from "@/assets/work-meridian.jpg";
import { CountUp, Reveal, SectionHead } from "./Brand";
import { Hero3D } from "./Hero3D";

/* ---------------- HERO ---------------- */
export function Hero() {
  return (
    <section className="bg-hero relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="container-g grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow anim-rise text-aqua">Websites for growing businesses</p>
          <h1 className="text-hero anim-rise mt-5 font-bold text-on-dark" style={{ animationDelay: "80ms" }}>
            Make your business <span className="highlight-word-dark">impossible</span> to ignore.
          </h1>
          <p className="anim-rise mt-6 max-w-xl text-lg leading-relaxed text-on-dark-muted" style={{ animationDelay: "160ms" }}>
            We build thoughtful, high-impact websites and practical digital tools that help businesses earn trust, capture enquiries, and grow online.
          </p>
          <div className="anim-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
            <Link to="/contact" className="btn btn-primary">Start Your Project <ArrowRight className="size-4" /></Link>
            <Link to="/work" className="btn btn-ghost-dark">Explore Our Work</Link>
          </div>
        </div>
        <div className="lg:col-span-6"><Hero3D /></div>
      </div>
    </section>
  );
}

/* ---------------- CAPABILITIES ---------------- */
const CAPS = [
  [Palette, "Website Design"], [Code2, "Website Development"], [MousePointerClick, "Lead Capture"], [Bot, "Practical Automation"], [LifeBuoy, "Ongoing Website Care"],
] as const;
export function Capabilities() {
  return (
    <section aria-label="What we do" className="border-y border-line-dark bg-midnight">
      <ul className="container-g flex flex-wrap justify-center gap-x-8 gap-y-4 py-6 md:justify-between">
        {CAPS.map(([I, l]) => (
          <li key={l} className="flex items-center gap-2.5 text-sm font-medium text-on-dark"><I className="size-5 text-lime" />{l}</li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- PROBLEM ---------------- */
const PROBLEMS = [
  ["Customers can't find the basics", "Opening hours, services, prices and location are scattered or missing."],
  ["An outdated site weakens trust", "First impressions happen in seconds — an old design can send people elsewhere."],
  ["Getting in touch feels like work", "Hidden phone numbers and clunky forms make visitors give up."],
  ["Enquiries slip through the cracks", "Messages arrive in too many places and are hard to follow up."],
];
export function Problem() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-g grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <SectionHead eyebrow="Why it matters" title={<>Looking <span className="highlight-word">professional online</span> should not be complicated.</>} intro="Many small businesses run into at least one of these. We help untangle whichever ones apply to you." />
        </div>
        <ol className="space-y-4 lg:col-span-7">
          {PROBLEMS.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 80} className="card-lift group flex gap-6 rounded-3xl border border-border bg-card p-6 transition-transform hover:-translate-y-1 sm:p-8">
              <span className="font-display text-4xl font-bold text-coral/70">0{i + 1}</span>
              <div><h3 className="text-xl font-semibold text-ink">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p></div>
            </Reveal>
          ))}
          <Reveal as="li" className="flex items-center gap-4 rounded-3xl bg-ink p-6 text-on-dark sm:p-8">
            <Sparkles className="size-8 shrink-0 text-lime" />
            <p className="text-lg">A clear, mobile-first website brings it together: <strong>easy to find, easy to trust, easy to contact.</strong></p>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
type Avail = "now" | "setup" | "paid";
const BADGE: Record<Avail, [string, string]> = {
  now: ["Available now", "bg-lime text-ink"],
  setup: ["Needs setup", "bg-aqua text-ink"],
  paid: ["May need paid tools", "bg-accent text-ink"],
};
function Tag({ a }: { a: Avail }) {
  const [l, c] = BADGE[a];
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${c}`}>{l}</span>;
}
export function Services({ full = false }: { full?: boolean }) {
  return (
    <section className="bg-card py-24 lg:py-32">
      <div className="container-g">
        <SectionHead eyebrow="Services" title={<>Everything your website needs to <span className="highlight-word">work for you.</span></>} intro="Plain-language services, clearly scoped. Each item is marked so you know what's ready today and what needs extra setup." />

        {/* 01 — wide feature */}
        <Reveal className="mt-14 grid overflow-hidden rounded-[2rem] bg-ink text-on-dark lg:grid-cols-2">
          <div className="p-8 sm:p-12">
            <p className="eyebrow text-coral">01 — Website design & development</p>
            <h3 className="mt-4 text-3xl font-bold">Professional, mobile-first websites built around your business.</h3>
            <ul className="mt-6 grid gap-3 text-on-dark-muted sm:grid-cols-2">
              {["Landing pages & multi-page sites", "Layouts that work on every phone", "Service / product information", "Contact & WhatsApp buttons", "Agreed enquiry forms", "Basic on-page SEO", "Help with going live"].map((d) => (
                <li key={d} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-lime" />{d}</li>
              ))}
            </ul>
            <div className="mt-6"><Tag a="now" /></div>
          </div>
          <div className="relative min-h-64 bg-hero">
            <img src={aurelia} alt="Example concept website design for a clinic" loading="lazy" width={1280} height={800} className="absolute bottom-0 right-0 w-[88%] rounded-tl-2xl shadow-float" />
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* 02 — lead capture */}
          <Reveal className="card-lift rounded-[2rem] bg-coral p-8 text-ink lg:col-span-2 sm:p-10">
            <p className="eyebrow">02 — Lead capture</p>
            <h3 className="mt-4 text-2xl font-bold sm:text-3xl">Make it easier for customers to reach you — and keep enquiries organised.</h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {([["Enquiry forms", "now"], ["Click-to-call & WhatsApp", "now"], ["Google Sheets lead records", "setup"], ["Email notifications", "setup"], ["Basic lead organisation", "setup"]] as [string, Avail][]).map(([d, a]) => (
                <span key={d} className="flex items-center gap-2 rounded-full bg-paper/90 px-3 py-1.5 text-sm">{d}<Tag a={a} /></span>
              ))}
            </div>
          </Reveal>
          {/* 03 — automation */}
          <Reveal delay={100} className="card-lift rounded-[2rem] border border-border bg-paper p-8 sm:p-10">
            <Bot className="size-10 text-violet" />
            <p className="eyebrow mt-5 text-violet">03 — Business automation</p>
            <h3 className="mt-3 text-2xl font-bold text-ink">Less repetitive work.</h3>
            <p className="mt-3 text-muted-foreground">Enquiry alerts, approved follow-ups, review requests, basic reports and selected integrations.</p>
            <div className="mt-5 flex flex-wrap gap-2"><Tag a="setup" /><Tag a="paid" /></div>
          </Reveal>
        </div>

        {/* 04 — care */}
        <Reveal className="mt-6 flex flex-col gap-8 rounded-[2rem] border-2 border-dashed border-violet/40 bg-paper p-8 sm:p-10 md:flex-row md:items-center">
          <Wrench className="size-12 shrink-0 text-violet" />
          <div className="flex-1">
            <p className="eyebrow text-violet">04 — Website care</p>
            <h3 className="mt-2 text-2xl font-bold text-ink">Keep your website maintained, with clearly defined support.</h3>
            <p className="mt-2 text-muted-foreground">Agreed minor content updates, basic technical checks, issue reporting and hosting/domain coordination. Support is defined per plan — never "unlimited".</p>
          </div>
          <Link to="/pricing" className="btn btn-dark">See care plans</Link>
        </Reveal>
        {!full && <div className="mt-10 text-center"><Link to="/services" className="link-u font-semibold text-ink">All service details →</Link></div>}
      </div>
    </section>
  );
}

/* ---------------- PORTFOLIO ---------------- */
const WORK = [
  { img: aurelia, name: "Aurelia Clinic", industry: "Healthcare", why: "Warm whites, deep green and restrained gold build calm trust. The appointment button is always one tap away." },
  { img: craft, name: "Local Craft", industry: "Retail", why: "Warm neutrals and editorial type let handmade products lead. Categories are scannable on small screens." },
  { img: meridian, name: "Meridian Advisory", industry: "Professional services", why: "A structured grid and confident navy with a coral accent make the enquiry path unmistakable." },
];
export function Portfolio() {
  const [active, setActive] = useState(0);
  const w = WORK[active] ?? WORK[0]!;
  return (
    <section className="bg-midnight py-24 text-on-dark lg:py-32">
      <div className="container-g">
        <SectionHead tone="dark" eyebrow="Concept projects" title="Imagine what your business could look like." intro="These are concept designs created to show our approach — not client work." />
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div role="tablist" aria-label="Concept projects" className="flex gap-3 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible">
            {WORK.map((p, i) => (
              <button key={p.name} role="tab" aria-selected={i === active} aria-controls="work-panel" onClick={() => setActive(i)}
                className={`min-w-60 rounded-2xl border p-5 text-left transition-all ${i === active ? "border-coral bg-ink" : "border-line-dark hover:border-on-dark-muted"}`}>
                <span className="eyebrow text-aqua">{p.industry} · Concept</span>
                <span className="mt-1 block font-display text-xl font-semibold">{p.name}</span>
              </button>
            ))}
          </div>
          <div id="work-panel" role="tabpanel" className="lg:col-span-8" key={w.name}>
            <div className="anim-rise relative">
              <img src={w.img} alt={`${w.name} concept website on desktop`} loading="lazy" width={1280} height={800} className="w-full rounded-2xl border border-line-dark shadow-float" />
              <div className="absolute -bottom-8 right-4 w-[24%] overflow-hidden rounded-[1.2rem] border-4 border-ink shadow-float sm:right-8">
                <img src={w.img} alt={`${w.name} concept website on mobile`} loading="lazy" width={1280} height={800} className="aspect-[9/17] w-full object-cover object-left-top" />
              </div>
            </div>
            <p className="mt-14 max-w-xl text-on-dark-muted"><strong className="text-on-dark">Design rationale: </strong>{w.why}</p>
            <p className="mt-2 text-sm text-on-dark-muted">Live demo not yet available.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- BEFORE / AFTER ---------------- */
export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const drag = (e: PointerEvent) => {
    if (e.buttons !== 1 && e.type !== "pointerdown") return;
    const r = box.current!.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
  };
  const key = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
  };
  return (
    <section className="py-24 lg:py-32">
      <div className="container-g">
        <SectionHead eyebrow="Illustrative example" title="Before and after a redesign." intro="A fictional bakery website, shown to illustrate the difference clear design makes. Drag the handle or use the arrow keys." />
        <div ref={box} onPointerDown={drag} onPointerMove={drag} className="relative mt-12 aspect-[4/3] touch-none select-none overflow-hidden rounded-3xl border border-border shadow-soft sm:aspect-[16/9]">
          {/* AFTER */}
          <div className="absolute inset-0 bg-paper p-5 sm:p-10">
            <div className="flex items-center justify-between"><span className="font-display text-lg font-bold text-ink">Crumb & Co.</span><span className="rounded-full bg-coral px-4 py-2 text-xs font-semibold text-ink sm:text-sm">WhatsApp us</span></div>
            <h3 className="mt-8 max-w-md text-2xl font-bold text-ink sm:text-5xl">Fresh bread, baked every morning.</h3>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground sm:text-base">Open 7am–8pm · Indiranagar · Same-day orders</p>
            <div className="mt-6 grid max-w-lg grid-cols-3 gap-3">{["Breads", "Cakes", "Custom orders"].map((s) => <div key={s} className="rounded-xl bg-card p-3 text-xs font-medium text-ink shadow-soft sm:text-sm">{s}</div>)}</div>
            <span className="absolute bottom-4 right-4 rounded-full bg-lime px-3 py-1 text-xs font-bold text-ink">After</span>
          </div>
          {/* BEFORE */}
          <div className="absolute inset-0 overflow-hidden bg-muted" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <div className="p-4 font-serif text-ink">
              <div className="block bg-destructive/80 p-1 text-center text-xs">!!! WELCOME TO OUR WEBSITE !!! BEST BAKERY !!!</div>
              <p className="mt-3 text-3xl italic text-violet">crumb and co bakery shop</p>
              <p className="mt-2 text-[10px] leading-tight">We are bakery since many years and we make all kinds of bread cake pastry cookies biscuit and more please visit our shop for more information about our products and services and timing and location details click here...</p>
              <div className="mt-3 grid grid-cols-4 gap-1">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-8 border border-ink/40 bg-card" />)}</div>
              <p className="mt-3 text-[9px]">contact: see page 4 &gt; about &gt; more info</p>
            </div>
            <span className="absolute bottom-4 left-4 rounded-full bg-ink px-3 py-1 text-xs font-bold text-on-dark">Before</span>
          </div>
          <div className="absolute inset-y-0 w-0.5 bg-ink" style={{ left: `${pos}%` }}>
            <div role="slider" tabIndex={0} aria-label="Comparison position" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)} onKeyDown={key}
              className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-ink text-on-dark shadow-float">⇆</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */
const STEPS = [
  [Search, "Discover", "We understand your business, customers, goals, content and requirements."],
  [Palette, "Design", "Together we agree the structure, visual direction and content."],
  [Code2, "Build", "We develop the website and test agreed features across phones, tablets and desktops."],
  [Rocket, "Launch", "We publish the approved website and explain your support arrangements."],
] as const;
export function Process() {
  return (
    <section className="bg-card py-24 lg:py-32">
      <div className="container-g">
        <SectionHead eyebrow="Process" title="From first conversation to launch." />
        <ol className="relative mt-14 grid gap-8 md:grid-cols-4">
          <div className="absolute left-6 top-0 h-full w-0.5 bg-brand md:left-0 md:top-6 md:h-0.5 md:w-full" aria-hidden="true" />
          {STEPS.map(([I, t, d], i) => (
            <Reveal as="li" key={t} delay={i * 120} className="relative pl-20 md:pl-0 md:pt-20">
              <span className="absolute left-0 top-0 flex size-12 items-center justify-center rounded-full bg-ink text-lime ring-8 ring-card"><I className="size-5" /></span>
              <p className="eyebrow text-violet">0{i + 1}</p>
              <h3 className="mt-1 text-2xl font-bold text-ink">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-12"><Link to="/book" className="btn btn-dark">Discuss Your Project <ArrowRight className="size-4" /></Link></div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
export const PLANS = [
  {
    id: "website", service: "New website", name: "Website Development", price: "Custom", unit: "Talk to us", note: "One-time project fee, quoted after a short conversation.",
    inc: ["Agreed pages / sections", "Responsive (mobile-first) design", "Contact, call & WhatsApp links", "Enquiry form", "Basic on-page SEO", "Agreed revision rounds", "Help going live"],
    exc: "Domain registration, paid plugins/tools and extensive copywriting are quoted separately.",
  },
  {
    id: "care", service: "Website maintenance", name: "Basic Website Care", price: "₹499", unit: "/ month", note: "Recurring monthly. Cancel with notice; we hand over all access.", featured: true,
    inc: ["Agreed minor content updates each month", "Hosting coordination", "Basic technical checks", "Issue reporting via WhatsApp/phone", "Response on working days"],
    exc: "Excludes redesigns, new pages, paid integrations, domain renewal fees and content production.",
  },
  {
    id: "growth", service: "Automation", name: "Growth & Automation", price: "₹999", unit: "/ month", note: "Recurring monthly. External tool subscriptions billed at cost if needed.",
    inc: ["Everything in Basic Care", "Lead capture into Google Sheets", "Selected enquiry notifications", "Basic monthly enquiry report", "Maintenance of agreed automations"],
    exc: "Third-party subscriptions, advertising spend and custom software are excluded.",
  },
];
export function Pricing({ full = false }: { full?: boolean }) {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-g">
        <SectionHead eyebrow="Pricing" title={<>Choose what your business <span className="highlight-word">actually needs.</span></>} intro="Honest starting points. Every project gets a written scope before any payment." />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.id} delay={i * 90} className={`card-lift flex flex-col rounded-[2rem] p-8 ${p.featured ? "lg:-translate-y-4 ring-2 ring-coral" : ""} ${p.featured ? "bg-ink text-on-dark shadow-float" : "border border-border bg-card"}`}>
              {p.featured && <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-lime px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink"><Sparkles className="size-3.5" />Most popular</span>}
              <h3 className={`text-xl font-semibold ${p.featured ? "" : "text-ink"}`}>{p.name}</h3>
              <p className="mt-5 flex items-baseline gap-2"><span className="font-display text-5xl font-bold">{p.price}</span><span className={p.featured ? "text-on-dark-muted" : "text-muted-foreground"}>{p.unit}</span></p>
              <p className={`mt-3 text-sm ${p.featured ? "text-on-dark-muted" : "text-muted-foreground"}`}>{p.note}</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {p.inc.map((x) => <li key={x} className="flex gap-2"><Check className={`mt-0.5 size-4 shrink-0 ${p.featured ? "text-lime" : "text-violet"}`} />{x}</li>)}
              </ul>
              {full && <p className={`mt-5 border-t pt-4 text-xs ${p.featured ? "border-line-dark text-on-dark-muted" : "text-muted-foreground"}`}>{p.exc}</p>}
              <Link to="/contact" search={{ service: p.service }} className={`btn mt-8 ${p.featured ? "btn-primary" : "btn-dark"}`}>{p.price === "Custom" ? "Talk to us" : "Choose this plan"}</Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          You always own your domain and content. Domains are registered in your name and renewed at the registrar's price. Plan details are being finalised — we'll confirm the exact scope in writing.
          {!full && <> <Link to="/pricing" className="link-u font-semibold text-ink">Full plan details →</Link></>}
        </p>
      </div>
    </section>
  );
}

/* ---------------- LEAD FLOW ---------------- */
const FLOW = [
  [UserRound, "Visitor arrives"], [Send, "Submits enquiry"], [ClipboardCheck, "Form is checked"], [FileSpreadsheet, "Saved to your sheet"], [Bell, "You're notified"], [PhoneCall, "You follow up"],
] as const;
export function LeadFlow() {
  return (
    <section className="bg-ink py-24 text-on-dark lg:py-32">
      <div className="container-g">
        <SectionHead tone="dark" eyebrow="How enquiries flow" title={<>A better website makes the <span className="highlight-word-dark">next step easier.</span></>} intro="Here's how a well-built enquiry system works. Notifications depend on which tools are set up for your business." />
        <ol className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {FLOW.map(([I, l], i) => (
            <Reveal as="li" key={l} delay={i * 110} className="card-lift card-dark relative rounded-2xl border p-5">
              <span className="text-xs text-on-dark-muted">Step {i + 1}</span>
              <I className="mt-3 size-7 text-aqua" />
              <p className="mt-3 font-semibold">{l}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- ANALYTICS ---------------- */
const STATS = [["Website visits", 1240, "bg-violet"], ["WhatsApp clicks", 39, "bg-lime"], ["Contact-button clicks", 86, "bg-coral"], ["Form enquiries", 24, "bg-aqua"]] as const;
export function Analytics() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-g grid items-center gap-12 lg:grid-cols-2">
        <SectionHead eyebrow="Simple reporting" title={<>Know what your website <span className="highlight-word">is doing.</span></>} intro="An example of the simple monthly report we can set up. Actual reporting depends on your analytics setup and available data — and visits or clicks are not the same as paying customers." />
        <Reveal className="card-lift rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-center justify-between"><h3 className="font-semibold text-ink">Last 30 days</h3><span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink">Illustrative demo data</span></div>
          <ul className="mt-6 space-y-5">
            {STATS.map(([l, v, c]) => (
              <li key={l}>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">{l}</span><strong className="text-ink"><CountUp to={v} /></strong></div>
                <div className="mt-2 h-3 rounded-full bg-muted"><div className={`h-3 rounded-full ${c}`} style={{ width: `${Math.max(6, Math.sqrt(v / 1240) * 100)}%` }} /></div>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted-foreground">Bar lengths use a square-root scale for readability.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
export function About() {
  return (
    <section className="bg-lime py-24 text-ink lg:py-32">
      <div className="container-g grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow">About Grewella</p>
          <h2 className="text-section mt-3 font-bold">Creative technology, made practical.</h2>
        </div>
        <div className="space-y-5 text-lg leading-relaxed lg:col-span-6">
          <p>Grewella helps businesses improve their online presence through thoughtful websites and useful digital systems.</p>
          <ul className="space-y-3 text-base">
            {["We start by understanding your business.", "We design for your real customers.", "We match features to your budget.", "We agree a clear scope in writing.", "We test before anything goes live."].map((x) => (
              <li key={x} className="flex gap-3"><ShieldCheck className="size-5 shrink-0" />{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
export function FinalCTA() {
  return (
    <section className="bg-hero relative overflow-hidden py-24 lg:py-32">
      <div className="anim-float absolute -right-20 -top-20 size-80 rounded-full bg-brand opacity-40 blur-3xl" aria-hidden="true" />
      <div className="container-g relative text-center">
        <h2 className="text-section mx-auto max-w-4xl font-bold text-on-dark">Let's make your next website your <span className="highlight-word-dark">best first impression.</span></h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-on-dark-muted">Tell us about your business and what you want to achieve online. We'll discuss the right scope, design, and next steps.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn btn-primary">Start Your Project <ArrowRight className="size-4" /></Link>
          <Link to="/book" className="btn btn-ghost-dark">Book a Consultation</Link>
        </div>
        <p className="mt-6 inline-flex items-center gap-2 text-sm text-on-dark-muted"><MessageCircle className="size-4" />Prefer WhatsApp? Use the link in the footer.</p>
      </div>
    </section>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="bg-hero pt-36 pb-20">
      <div className="container-g">
        <p className="eyebrow anim-rise text-aqua">{eyebrow}</p>
        <h1 className="anim-rise mt-4 max-w-4xl text-[clamp(2.4rem,5.5vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-on-dark">{title}</h1>
        {intro && <p className="anim-rise mt-6 max-w-2xl text-lg text-on-dark-muted">{intro}</p>}
      </div>
    </section>
  );
}
