# Grewella Website Build Plan

## Confirmed decisions
- Brand name: **Grewella** everywhere.
- Pricing: Website Development = "Custom - talk to us"; Basic Website Care = ₹499/month; Growth & Automation = ₹999/month. Inclusions and exclusions will be written plainly and marked for your review.
- Contact: 9999999999 is used for phone and WhatsApp. It is clearly flagged as a placeholder until you give the real number. No email or social links will be shown.
- Consultations: phone, video and in-person.
- Pinterest and Figma: not accessible. The visual direction comes from the written brief. It can be refined later if you send screenshots.

## Visual direction
- Palette from the brief: ink #101117, midnight #171A2B, off-white #F7F5F0, coral, violet, aqua, lime. Sections switch between dark and light backgrounds.
- Fonts: Space Grotesk for headings, Inter for body text.
- Custom geometric "G" mark plus a wordmark.
- Hero: a layered CSS 3D scene with a tilted browser window showing a fictional business site, a phone, sculpted shapes and an animated "new enquiry" notification. It responds to pointer movement and reframes as you scroll. On mobile it is simplified and sits below the headline. This is **not** WebGL, so it stays fast on phones.
- Motion: short staggered reveals, scroll-linked depth and tactile buttons. All non-essential motion turns off when reduced motion is preferred.

## Pages
```text
/          Home: hero, capability strip, problem, services preview, portfolio, before/after slider,
           process, pricing preview, lead workflow, illustrative analytics, about, final CTA
/services  Four services in varied layouts, marked "available now / needs setup / paid third-party"
/work      Three labelled concept projects (Aurelia Clinic, Local Craft, Modern Professional) + before/after
/process   Animated timeline (vertical on mobile)
/pricing   Three plans with billing, domain/hosting, limits, cancellation; CTAs preselect the service
/faq       Accessible accordion
/contact   Project Enquiry form
/book      Book a Consultation form (preferred time only, "not confirmed until Grewella confirms")
/privacy   Privacy notice (plain language, reflects the real system)
/terms     Terms of service
```
- Shared navigation (with a mobile menu) and footer. The footer has a "Privacy & cookie preferences" link.
- First-visit privacy dialog with a dimmed and blurred background, plus "Read Privacy Notice" and "Continue" buttons. No optional tracking is added, so no cookie banner is needed. Only a flag that the notice was seen is saved on the device.

## Lead storage in Google Sheets
- Link your Google Sheets connection to the project and find "Grewella's Leads". If it can't be found by name, I'll ask you for its link.
- Both forms submit to the server. The server checks every field, blocks spam with a hidden honeypot field and a minimum fill time, then adds a row to the sheet:
  - "Enquiries" tab: timestamp, name, business, category, phone, email, website, service, budget, requirements, contact method, privacy acknowledged, marketing consent.
  - "Appointments" tab: timestamp, name, business, contact, meeting type, topic, preferred date, time slot, status = "Requested".
  - Missing tabs or header rows are created on first setup.
- A success message appears only after Google confirms the row was saved. Otherwise a clear error is shown with a WhatsApp fallback.
- Email notifications are not set up for now. They would need an email service, and will be listed as a follow-up.

## Technical details
- TanStack Start routes with a head() for each page (title, description, og, twitter). Root metadata will be updated to Grewella.
- Design tokens in styles.css (oklch). Fonts loaded through a link in __root.
- Server function `submitLead` using createServerFn with zod validation. It calls the Google Sheets gateway with LOVABLE_API_KEY and GOOGLE_SHEETS_API_KEY, using one batched append per submission.
- Lightweight motion via CSS and IntersectionObserver, with framer-motion only where needed. The hero is CSS 3D transforms with a pointer parallax, gated by reduced motion.
- AGENTS.md: record the lead-storage and 3D approach decisions. Memory: pricing, brand name, placeholder phone.

## QA
- Check with Playwright at 360, 390, 768, 1440 and 1920 px: overflow, mobile menu, slider keyboard use, privacy dialog, both forms (valid and invalid), and a real test row appearing in the sheet.

## Needs your input later
- Real phone/WhatsApp number, email, social links, production domain.
- Final inclusions and limits for each plan.
