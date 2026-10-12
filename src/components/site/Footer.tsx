import { Link } from "@tanstack/react-router";
import { SITE, waLink } from "@/lib/site";
import { Wordmark } from "./Brand";
import { openPrivacyNotice } from "./PrivacyNotice";

export function Footer() {
  return (
    <footer className="bg-ink text-on-dark-muted">
      <div className="container-g grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="mt-5 max-w-sm leading-relaxed">
            Thoughtful, mobile-first websites and practical digital tools for small businesses in India.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <p>
              Phone / WhatsApp:{" "}
              <a className="link-u text-on-dark" href={`tel:+91${SITE.phone}`}>+91 {SITE.phone}</a>
              {SITE.phoneIsPlaceholder && <span className="ml-2 rounded bg-line-dark px-1.5 py-0.5 text-xs">placeholder</span>}
            </p>
            <a className="link-u inline-block text-on-dark" href={waLink("Hi Grewella, I'd like to discuss a website.")} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>
          </div>
        </div>
        <FooterCol title="Explore" links={[["/services", "Services"], ["/work", "Our Work"], ["/process", "Process"], ["/pricing", "Pricing"], ["/faq", "FAQ"]]} />
        <FooterCol title="Get started" links={[["/contact", "Start a Project"], ["/book", "Book a Consultation"]]} />
        <div className="md:col-span-2">
          <h3 className="eyebrow text-on-dark">Legal</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/privacy" className="link-u">Privacy notice</Link></li>
            <li><Link to="/terms" className="link-u">Terms of service</Link></li>
            <li><button type="button" onClick={openPrivacyNotice} className="link-u text-left">Privacy preferences</button></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line-dark">
        <p className="container-g py-6 text-xs">© {new Date().getFullYear()} Grewella. All rights reserved.</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="md:col-span-2">
      <h3 className="eyebrow text-on-dark">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map(([to, l]) => (
          <li key={to}><Link to={to} className="link-u">{l}</Link></li>
        ))}
      </ul>
    </div>
  );
}
