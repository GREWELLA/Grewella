import { useEffect, useRef, useState, type ReactNode } from "react";

export function GMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--coral)" />
          <stop offset=".55" stopColor="var(--violet)" />
          <stop offset="1" stopColor="var(--aqua)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="11" fill="url(#gm)" />
      <path d="M28 14.5A9 9 0 1 0 29 22h-8.5" fill="none" stroke="var(--ink)" strokeWidth="4.2" strokeLinecap="round" />
      <circle cx="29" cy="22" r="2.6" fill="var(--lime)" />
    </svg>
  );
}

export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="flex items-center gap-2.5">
      <GMark />
      <span className={`font-display text-xl font-bold tracking-tight ${tone === "dark" ? "text-on-dark" : "text-ink"}`}>
        grewella
      </span>
    </span>
  );
}

/** Adds .in when element enters view. */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "li" | "section" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // @ts-expect-error polymorphic ref
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function SectionHead({ eyebrow, title, intro, tone = "light", center = false }: { eyebrow: string; title: ReactNode; intro?: ReactNode; tone?: "light" | "dark"; center?: boolean }) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${tone === "dark" ? "text-aqua" : "text-violet"}`}>{eyebrow}</p>
      <h2 className={`text-section mt-3 font-bold ${tone === "dark" ? "text-on-dark" : "text-ink"}`}>{title}</h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${tone === "dark" ? "text-on-dark-muted" : "text-muted-foreground"}`}>{intro}</p>}
    </Reveal>
  );
}

/** Number that counts up when scrolled into view. */
export function CountUp({ to, ms = 1400 }: { to: number; ms?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min((t - t0) / ms, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, ms]);
  return <span ref={ref} aria-label={to.toLocaleString("en-IN")}>{n.toLocaleString("en-IN")}</span>;
}
