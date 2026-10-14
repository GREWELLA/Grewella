import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { appendLead } from "./leads.server";

const clean = (max: number) => z.string().trim().max(max).transform((s) => s.replace(/[\u0000-\u001f]/g, " "));
const phone = z.string().trim().regex(/^[+\d][\d\s-]{7,16}$/, "Enter a valid phone number");
const anti = { website_url: z.string().max(0).optional(), startedAt: z.number() };

export const enquirySchema = z.object({
  name: clean(80).pipe(z.string().min(2, "Please enter your name")),
  business: clean(120).pipe(z.string().min(2, "Please enter your business name")),
  category: z.string({ required_error: "Choose a category" }).pipe(clean(60)).pipe(z.string().min(1, "Choose a category")),
  phone,
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email").max(120)]),
  website: clean(200),
  service: clean(60).pipe(z.string().min(1, "Choose a service")),
  budget: clean(60),
  requirements: clean(2000).pipe(z.string().min(10, "Tell us a little more (10+ characters)")),
  contactMethod: z.enum(["WhatsApp", "Phone call", "Email"]),
  privacy: z.literal(true, { errorMap: () => ({ message: "Please confirm you have read the privacy notice" }) }),
  marketing: z.boolean(),
});

export const bookingSchema = z.object({
  name: clean(80).pipe(z.string().min(2, "Please enter your name")),
  business: clean(120),
  phone,
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email").max(120)]),
  meetingType: z.enum(["Phone call", "Video call", "In-person"]),
  topic: clean(500).pipe(z.string().min(5, "Briefly describe the topic")),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date"),
  slot: z.string({ required_error: "Choose a time slot" }).pipe(clean(40)).pipe(z.string().min(1, "Choose a time slot")),
  dataUse: z.literal(true, { errorMap: () => ({ message: "Please agree to how we collect and use your data to book" }) }),
  privacy: z.literal(true, { errorMap: () => ({ message: "Please confirm you have read the privacy notice" }) }),
  marketing: z.boolean(),
});

type Result = { ok: true } | { ok: false; error: string };

function spamCheck(d: { website_url?: string | undefined; startedAt: number }) {
  return !!d.website_url || Date.now() - d.startedAt < 3000;
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => enquirySchema.extend(anti).parse(d))
  .handler(async ({ data }): Promise<Result> => {
    if (spamCheck(data)) return { ok: true }; // silently drop bots
    try {
      const r = await appendLead("Enquiries", [
        new Date().toISOString(), data.name, data.business, data.category, data.phone, data.email,
        data.website, data.service, data.budget, data.requirements, data.contactMethod,
        "Yes", data.marketing ? "Yes" : "No",
      ]);
      if (!r.ok) return { ok: false, error: "Our enquiry system isn't connected yet. Please contact us on WhatsApp." };
      return { ok: true };
    } catch {
      return { ok: false, error: "We couldn't save your enquiry right now. Please try again or reach us on WhatsApp." };
    }
  });

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => bookingSchema.extend(anti).parse(d))
  .handler(async ({ data }): Promise<Result> => {
    if (spamCheck(data)) return { ok: true };
    try {
      const r = await appendLead("Appointments", [
        new Date().toISOString(), data.name, data.business, data.phone, data.email, data.meetingType,
        data.topic, data.date, data.slot, "Yes", data.marketing ? "Yes" : "No", "Requested",
      ]);
      if (!r.ok) return { ok: false, error: "Our booking system isn't connected yet. Please contact us on WhatsApp." };
      return { ok: true };
    } catch {
      return { ok: false, error: "We couldn't save your request right now. Please try again or reach us on WhatsApp." };
    }
  });
