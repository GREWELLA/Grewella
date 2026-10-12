import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Wordmark } from "./Brand";

const LINKS = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Our Work" },
  { to: "/process", label: "Process" },
  { to: "/pricing", label: "Pricing" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open]);

  const solid = scrolled || open;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? "border-b border-line-dark bg-ink/85 backdrop-blur-xl" : "border-b border-transparent"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-paper focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
      <nav className="container-g flex h-18 items-center justify-between py-3" aria-label="Main">
        <Link to="/" aria-label="Grewella home"><Wordmark /></Link>
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="link-u py-1 text-sm font-medium text-on-dark-muted hover:text-on-dark" activeProps={{ className: "text-on-dark" }}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link to="/contact" className="btn btn-primary hidden sm:inline-flex">Start a Project</Link>
          <button
            type="button"
            className="inline-flex size-12 items-center justify-center rounded-full text-on-dark lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="container-g h-[calc(100dvh-72px)] overflow-y-auto pb-10 lg:hidden">
          <ul className="flex flex-col gap-1 pt-4">
            {LINKS.map((l, i) => (
              <li key={l.to} className="anim-rise" style={{ animationDelay: `${i * 50}ms` }}>
                <Link to={l.to} className="block border-b border-line-dark py-4 font-display text-3xl font-semibold text-on-dark">{l.label}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <Link to="/contact" className="btn btn-primary">Start a Project</Link>
            <Link to="/book" className="btn btn-ghost-dark">Book a Consultation</Link>
          </div>
        </div>
      )}
    </header>
  );
}
