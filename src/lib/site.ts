// Central business config. Replace placeholders once confirmed by the owner.
export const SITE = {
  name: "Grewella",
  tagline: "Beautiful websites. Better business experiences.",
  // PLACEHOLDER number supplied during build — replace with the real business number.
  phone: "9999999999",
  phoneIsPlaceholder: true,
  whatsappNumber: "919999999999",
};

export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const SERVICE_OPTIONS = [
  "New website",
  "Website redesign",
  "Website maintenance",
  "Lead capture",
  "Automation",
  "Other",
] as const;

export const BUDGET_OPTIONS = [
  "Not sure yet",
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "Above ₹50,000",
] as const;

export const CATEGORY_OPTIONS = [
  "Shop / retail",
  "Clinic / healthcare",
  "Salon / wellness",
  "Restaurant / café",
  "Coach / consultant",
  "Home services",
  "Other",
] as const;

export const MEETING_TYPES = ["Phone call", "Video call", "In-person"] as const;
export const TIME_SLOTS = ["Morning (10am–12pm)", "Afternoon (12pm–4pm)", "Evening (4pm–7pm)"] as const;
