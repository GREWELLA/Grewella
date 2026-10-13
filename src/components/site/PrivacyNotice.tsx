import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const KEY = "grewella_notice_v1";
const EVT = "grewella:open-privacy";

export function openPrivacyNotice() {
  window.dispatchEvent(new Event(EVT));
}

export function PrivacyNotice() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try { if (!localStorage.getItem(KEY)) setOpen(true); } catch { /* storage blocked */ }
    const o = () => setOpen(true);
    window.addEventListener(EVT, o);
    return () => window.removeEventListener(EVT, o);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    btnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("a,button");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); prev?.focus?.(); };
  }, [open]);

  function close() {
    try { localStorage.setItem(KEY, "seen"); } catch { /* ignore */ }
    setOpen(false);
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm animate-in fade-in">
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="pn-title" aria-describedby="pn-desc"
        className="anim-pop max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-3xl bg-card p-6 shadow-float sm:p-8">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-accent text-violet"><ShieldCheck className="size-6" /></div>
        <h2 id="pn-title" className="mt-5 text-2xl font-bold text-ink">Your privacy matters to us.</h2>
        <p id="pn-desc" className="mt-3 leading-relaxed text-muted-foreground">
          We use the information you choose to share to respond to enquiries and provide our services. Here's the short version:
        </p>
        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-foreground">
          <li><strong>What:</strong> only what you type into our enquiry or consultation forms (name, business, contact details, project notes).</li>
          <li><strong>Why:</strong> to reply to you and discuss your project.</li>
          <li><strong>Where:</strong> submissions are saved to a Google Sheet that Grewella manages (Google acts as our service provider).</li>
          <li><strong>Tracking:</strong> this site uses no advertising or analytics cookies. It remembers only that you've seen this notice, on your device.</li>
          <li><strong>Your rights:</strong> ask us anytime to see, correct or delete your details, or withdraw consent, using the contact details in our privacy notice.</li>
        </ul>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
          <Link to="/privacy" onClick={close} className="btn btn-ghost flex-1">Read Privacy Notice</Link>
          <button ref={btnRef} type="button" onClick={close} className="btn btn-dark flex-1">Continue</button>
        </div>
      </div>
    </div>
  );
}
