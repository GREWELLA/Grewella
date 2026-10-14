import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const KEY = "grewella_consent_v2";
const EVT = "grewella:open-privacy";
const CHG = "grewella:consent-changed";

export type Consent = { forms: boolean; marketing: boolean };

export function readConsent(): Consent | null {
  try { const v = localStorage.getItem(KEY); return v ? (JSON.parse(v) as Consent) : null; } catch { return null; }
}
function saveConsent(c: Consent) {
  try { localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* ignore */ }
  window.dispatchEvent(new Event(CHG));
}
export function openPrivacyNotice() {
  window.dispatchEvent(new Event(EVT));
}
/** Current consent (null until chosen / before hydration). */
export function useConsent() {
  const [c, setC] = useState<Consent | null>(null);
  useEffect(() => {
    const u = () => setC(readConsent());
    u();
    window.addEventListener(CHG, u);
    return () => window.removeEventListener(CHG, u);
  }, []);
  return c;
}

export function PrivacyNotice() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [forms, setForms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!readConsent()) setOpen(true);
    const o = () => {
      const c = readConsent();
      setForms(c?.forms ?? false); setMarketing(c?.marketing ?? false); setCustom(true); setOpen(true);
    };
    window.addEventListener(EVT, o);
    return () => window.removeEventListener(EVT, o);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("a,button,input");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); prev?.focus?.(); };
  }, [open]);

  function done(c: Consent) { saveConsent(c); setOpen(false); }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/60 p-3 backdrop-blur-sm animate-in fade-in sm:items-center sm:p-4">
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="pn-title" aria-describedby="pn-desc"
        className="anim-pop max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-3xl bg-card p-6 shadow-float sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-violet"><ShieldCheck className="size-6" /></span>
          <span className="eyebrow text-violet">DPDP Act, 2023 notice</span>
        </div>
        <h2 id="pn-title" className="mt-4 text-2xl font-bold text-ink">Your privacy matters to us.</h2>
        <p id="pn-desc" className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Under India's Digital Personal Data Protection Act, 2023, we ask before we use your personal data. We only collect what you type into our forms, to reply to you. Data is saved in a Google Sheet managed by Grewella. You can change your choice anytime from the footer and ask us to correct or delete your data. Read our{" "}
          <Link to="/privacy" onClick={() => setOpen(false)} className="link-u font-semibold text-ink">Privacy Policy</Link> and{" "}
          <Link to="/terms" onClick={() => setOpen(false)} className="link-u font-semibold text-ink">Terms &amp; Conditions</Link>.
        </p>

        {custom && (
          <div className="mt-5 space-y-3">
            <Opt checked disabled title="Essential" desc="Remembers your privacy choice on this device. Always on." />
            <Opt checked={forms} onChange={setForms} title="Enquiries & appointments" desc="Lets us store and use details you submit to respond and book consultations. Required to use the forms." />
            <Opt checked={marketing} onChange={setMarketing} title="Marketing updates" desc="Occasional tips and offers. Optional." />
          </div>
        )}

        <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
          <button type="button" onClick={() => done({ forms: false, marketing: false })} className="btn btn-ghost">Reject all</button>
          {custom
            ? <button type="button" onClick={() => done({ forms, marketing })} className="btn btn-ghost">Save choices</button>
            : <button type="button" onClick={() => setCustom(true)} className="btn btn-ghost">Select preferred</button>}
          <button type="button" onClick={() => done({ forms: true, marketing: true })} className="btn btn-dark">Accept all</button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">If you reject all, you can still browse, but you won't be able to send enquiries or book appointments.</p>
      </div>
    </div>
  );
}

function Opt({ title, desc, checked, onChange, disabled }: { title: string; desc: string; checked: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  return (
    <label className="flex cursor-pointer gap-3 rounded-2xl border border-border p-3.5 has-[:checked]:border-violet">
      <input type="checkbox" className="mt-1 size-5 accent-violet" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} />
      <span className="text-sm"><strong className="block text-ink">{title}</strong><span className="text-muted-foreground">{desc}</span></span>
    </label>
  );
}
