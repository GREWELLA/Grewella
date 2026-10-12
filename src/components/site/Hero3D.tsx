import { useEffect, useRef } from "react";
import { Bell, MessageCircle, Star } from "lucide-react";

/** Layered CSS 3D scene: browser + phone + sculptural shapes. Pointer + scroll driven. */
export function Hero3D() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let px = 0, py = 0, sy = 0, raf = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--rx", `${8 - py * 6 + sy * 10}deg`);
      el.style.setProperty("--ry", `${-18 + px * 10 + sy * 14}deg`);
      el.style.setProperty("--sy", `${sy}`);
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(apply); };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX / window.innerWidth - 0.5;
      py = e.clientY / window.innerHeight - 0.5;
      req();
    };
    const onScroll = () => { sy = Math.min(window.scrollY / window.innerHeight, 1); req(); };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[640px] [perspective:1400px]" aria-hidden="true">
      <div
        ref={stage}
        className="absolute inset-0 transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        style={{ transform: "rotateX(var(--rx,8deg)) rotateY(var(--ry,-18deg)) translateY(calc(var(--sy,0) * -40px))", animation: "scene-in 1.1s var(--ease-out) both" }}
      >
        {/* sculptural shapes */}
        <div className="anim-float absolute -left-[4%] top-[6%] size-[22%] rounded-full bg-brand opacity-90 blur-[1px] shadow-float" style={{ transform: "translateZ(-120px)" }} />
        <div className="absolute right-[2%] top-[0%] size-[16%] rounded-[30%] bg-lime shadow-float" style={{ transform: "translateZ(-60px) rotate(18deg)", animation: "float-y 7s ease-in-out infinite" }} />
        <div className="anim-spin absolute bottom-[4%] left-[8%] size-[14%] rounded-full border-[10px] border-aqua/80" style={{ transform: "translateZ(40px)" }} />

        {/* browser */}
        <div className="absolute left-[4%] top-[12%] w-[78%] overflow-hidden rounded-2xl border border-line-dark bg-paper shadow-float" style={{ transform: "translateZ(0px)" }}>
          <div className="flex items-center gap-1.5 border-b border-border bg-muted px-3 py-2">
            <span className="size-2.5 rounded-full bg-coral" /><span className="size-2.5 rounded-full bg-lime" /><span className="size-2.5 rounded-full bg-aqua" />
            <span className="ml-3 h-4 flex-1 rounded-full bg-card" />
          </div>
          <div className="grid grid-cols-5 gap-3 p-4 sm:p-5">
            <div className="col-span-3 space-y-2.5">
              <div className="h-2 w-1/3 rounded bg-violet/60" />
              <div className="font-display text-[clamp(.9rem,2.2vw,1.5rem)] font-bold leading-tight text-ink">Fresh bakes,<br />delivered daily.</div>
              <div className="h-2 w-5/6 rounded bg-border" /><div className="h-2 w-2/3 rounded bg-border" />
              <div className="flex gap-2 pt-1">
                <span className="rounded-full bg-coral px-3 py-1 text-[10px] font-semibold text-ink">Order now</span>
                <span className="rounded-full border border-input px-3 py-1 text-[10px] text-ink">Menu</span>
              </div>
            </div>
            <div className="col-span-2 rounded-xl bg-[linear-gradient(140deg,var(--coral),var(--violet))]" />
            <div className="col-span-5 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => <div key={i} className="h-10 rounded-lg bg-muted" />)}
            </div>
          </div>
        </div>

        {/* phone */}
        <div className="absolute bottom-[3%] right-[3%] w-[28%] rounded-[1.6rem] border-[5px] border-ink bg-paper p-2 shadow-float" style={{ transform: "translateZ(110px) rotateY(-8deg)", animation: "pop-in .7s .45s var(--ease-out) both" }}>
          <div className="mx-auto mb-2 h-1.5 w-1/3 rounded-full bg-ink" />
          <div className="aspect-[4/3] rounded-lg bg-[linear-gradient(140deg,var(--coral),var(--violet))]" />
          <div className="mt-2 h-1.5 w-3/4 rounded bg-border" /><div className="mt-1.5 h-1.5 w-1/2 rounded bg-border" />
          <div className="mt-3 flex items-center justify-center gap-1 rounded-full bg-lime py-1.5 text-[9px] font-semibold text-ink"><MessageCircle className="size-3" />WhatsApp</div>
        </div>

        {/* enquiry notification */}
        <div className="absolute right-[18%] top-[2%] flex items-center gap-2.5 rounded-2xl bg-card px-3.5 py-2.5 shadow-float" style={{ transform: "translateZ(160px)", animation: "pop-in .6s .9s var(--ease-out) both" }}>
          <span className="flex size-8 items-center justify-center rounded-full bg-coral text-ink"><Bell className="size-4" /></span>
          <span className="text-xs leading-tight"><strong className="block text-ink">New enquiry</strong><span className="text-muted-foreground">from your website</span></span>
          <span className="anim-pulse ml-1 size-2 rounded-full bg-coral" />
        </div>

        {/* review chip */}
        <div className="absolute bottom-[18%] left-[0%] flex items-center gap-1 rounded-full bg-ink px-3 py-2 text-xs text-on-dark shadow-float" style={{ transform: "translateZ(90px)", animation: "pop-in .6s 1.15s var(--ease-out) both" }}>
          <Star className="size-3.5 fill-lime text-lime" /> Mobile-ready
        </div>
      </div>
    </div>
  );
}
