import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { bookingSchema, enquirySchema, submitBooking, submitEnquiry } from "@/lib/leads.functions";
import { BUDGET_OPTIONS, CATEGORY_OPTIONS, MEETING_TYPES, SERVICE_OPTIONS, TIME_SLOTS, waLink } from "@/lib/site";

type Errors = Partial<Record<"name"|"business"|"category"|"phone"|"email"|"website"|"service"|"budget"|"requirements"|"contactMethod"|"privacy"|"marketing"|"meetingType"|"topic"|"date"|"slot", string>>;

function Field({ id, label, error, optional, children }: { id: string; label: string; error?: string | undefined; optional?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">{label}{optional && <span className="font-normal text-muted-foreground"> (optional)</span>}</label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}
const a = (e: Errors, k: keyof Errors) => ({ id: k, name: k, "aria-invalid": !!e[k], "aria-describedby": e[k] ? `${k}-err` : undefined, className: "field" });

function Consent({ e }: { e: Errors }) {
  return (
    <div className="space-y-3 rounded-2xl bg-muted p-4 text-sm">
      <label className="flex gap-3">
        <input type="checkbox" name="privacy" className="mt-1 size-5 accent-violet" aria-invalid={!!e.privacy} aria-describedby={e.privacy ? "privacy-err" : undefined} />
        <span>I have read the <Link to="/privacy" className="link-u font-semibold text-ink" target="_blank">privacy notice</Link> and agree that Grewella may use these details to respond to my request.</span>
      </label>
      {e.privacy && <p id="privacy-err" className="text-destructive">{e.privacy}</p>}
      <label className="flex gap-3">
        <input type="checkbox" name="marketing" className="mt-1 size-5 accent-violet" />
        <span>Optional: send me occasional tips and offers. You can opt out anytime.</span>
      </label>
    </div>
  );
}

function Honeypot() {
  return <input type="text" name="website_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />;
}

function useSubmit(kind: "enquiry" | "booking") {
  const fn = useServerFn(kind === "enquiry" ? submitEnquiry : submitBooking);
  const started = useRef(Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "loading" | "done" | "fail">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const raw: Record<string, unknown> = Object.fromEntries(fd.entries());
    raw["privacy"] = fd.get("privacy") === "on";
    raw["marketing"] = fd.get("marketing") === "on";
    const schema = kind === "enquiry" ? enquirySchema : bookingSchema;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const e: Errors = {};
      parsed.error.issues.forEach((i) => { const k = String(i.path[0]) as keyof Errors; e[k] ??= i.message; });
      setErrors(e);
      const first = Object.keys(e)[0]; if (first) document.getElementById(first)?.focus();
      return;
    }
    setErrors({});
    setState("loading");
    try {
      const r = await fn({ data: { ...parsed.data, website_url: String(raw["website_url"] ?? ""), startedAt: started.current } as never });
      if (r.ok) setState("done");
      else { setState("fail"); setMsg(r.error); }
    } catch {
      setState("fail"); setMsg("Something went wrong sending your details. Please try again.");
    }
  }
  return { errors, state, msg, onSubmit };
}

function Success({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="status" className="anim-pop rounded-3xl bg-card p-8 text-center shadow-soft">
      <CheckCircle2 className="mx-auto size-14 text-violet" />
      <h2 className="mt-4 text-2xl font-bold text-ink">{title}</h2>
      <div className="mt-3 text-muted-foreground">{children}</div>
    </div>
  );
}

function Footer({ state, msg, label }: { state: string; msg: string; label: string }) {
  return (
    <>
      {state === "fail" && (
        <div role="alert" className="rounded-2xl border border-destructive/40 p-4 text-sm text-destructive">
          {msg} <a className="link-u font-semibold" href={waLink("Hi Grewella, I tried your website form.")} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
        </div>
      )}
      <button type="submit" disabled={state === "loading"} className="btn btn-dark w-full sm:w-auto">
        {state === "loading" ? <><Loader2 className="size-4 animate-spin" />Sending…</> : label}
      </button>
    </>
  );
}

export function EnquiryForm({ defaultService }: { defaultService?: string | undefined }) {
  const { errors: e, state, msg, onSubmit } = useSubmit("enquiry");
  if (state === "done") return <Success title="Thanks — your enquiry is in.">We've saved your details and will get back to you using your preferred contact method, usually within one or two working days.</Success>;
  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5 rounded-3xl bg-card p-6 shadow-soft sm:p-8">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={e.name}><input {...a(e, "name")} autoComplete="name" /></Field>
        <Field id="business" label="Business name" error={e.business}><input {...a(e, "business")} autoComplete="organization" /></Field>
        <Field id="category" label="Business category" error={e.category}>
          <select {...a(e, "category")} defaultValue=""><option value="" disabled>Choose…</option>{CATEGORY_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select>
        </Field>
        <Field id="phone" label="Phone / WhatsApp" error={e.phone}><input {...a(e, "phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98xxx xxxxx" /></Field>
        <Field id="email" label="Email" optional error={e.email}><input {...a(e, "email")} type="email" autoComplete="email" /></Field>
        <Field id="website" label="Existing website" optional error={e.website}><input {...a(e, "website")} type="url" placeholder="https://" /></Field>
        <Field id="service" label="What do you need?" error={e.service}>
          <select {...a(e, "service")} defaultValue={defaultService && SERVICE_OPTIONS.includes(defaultService as never) ? defaultService : ""}>
            <option value="" disabled>Choose…</option>{SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="budget" label="Approximate budget" optional error={e.budget}>
          <select {...a(e, "budget")} defaultValue="Not sure yet">{BUDGET_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select>
        </Field>
      </div>
      <Field id="requirements" label="Tell us about your project" error={e.requirements}><textarea {...a(e, "requirements")} rows={5} placeholder="What do you want your website to do?" /></Field>
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">Preferred contact method</legend>
        <div className="flex flex-wrap gap-3">
          {["WhatsApp", "Phone call", "Email"].map((m, i) => (
            <label key={m} className="flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-input px-4 has-[:checked]:border-violet has-[:checked]:bg-accent">
              <input type="radio" name="contactMethod" value={m} defaultChecked={i === 0} className="accent-violet" />{m}
            </label>
          ))}
        </div>
      </fieldset>
      <Consent e={e} />
      <Footer state={state} msg={msg} label="Send enquiry" />
    </form>
  );
}

export function BookingForm() {
  const { errors: e, state, msg, onSubmit } = useSubmit("booking");
  const today = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  if (state === "done") return <Success title="Request received — not yet confirmed.">We'll contact you to confirm a time. Your consultation is only booked once Grewella confirms it. To change or cancel, just reply to our confirmation message or WhatsApp us.</Success>;
  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5 rounded-3xl bg-card p-6 shadow-soft sm:p-8">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={e.name}><input {...a(e, "name")} autoComplete="name" /></Field>
        <Field id="business" label="Business name" optional error={e.business}><input {...a(e, "business")} autoComplete="organization" /></Field>
        <Field id="phone" label="Phone / WhatsApp" error={e.phone}><input {...a(e, "phone")} type="tel" inputMode="tel" autoComplete="tel" /></Field>
        <Field id="email" label="Email" optional error={e.email}><input {...a(e, "email")} type="email" autoComplete="email" /></Field>
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">Meeting type</legend>
        <div className="flex flex-wrap gap-3">
          {MEETING_TYPES.map((m, i) => (
            <label key={m} className="flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-input px-4 has-[:checked]:border-violet has-[:checked]:bg-accent">
              <input type="radio" name="meetingType" value={m} defaultChecked={i === 0} className="accent-violet" />{m}
            </label>
          ))}
        </div>
      </fieldset>
      <Field id="topic" label="What would you like to discuss?" error={e.topic}><textarea {...a(e, "topic")} rows={3} /></Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="date" label="Preferred date" error={e.date}><input {...a(e, "date")} type="date" min={today} /></Field>
        <Field id="slot" label="Preferred time" error={e.slot}>
          <select {...a(e, "slot")} defaultValue=""><option value="" disabled>Choose…</option>{TIME_SLOTS.map((o) => <option key={o}>{o}</option>)}</select>
        </Field>
      </div>
      <p className="text-sm text-muted-foreground">This is a request, not a confirmed booking. We'll contact you to confirm an exact time.</p>
      <Consent e={e} />
      <Footer state={state} msg={msg} label="Request consultation" />
    </form>
  );
}
