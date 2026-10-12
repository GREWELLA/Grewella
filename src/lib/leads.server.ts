const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

export const TABS = {
  Enquiries: [
    "Submitted at", "Name", "Business", "Category", "Phone / WhatsApp", "Email", "Existing website",
    "Service", "Budget", "Requirements", "Preferred contact", "Privacy acknowledged", "Marketing consent",
  ],
  Appointments: [
    "Submitted at", "Name", "Business", "Phone", "Email", "Meeting type", "Topic", "Preferred date",
    "Time slot", "Privacy acknowledged", "Marketing consent", "Status",
  ],
} as const;

export type TabName = keyof typeof TABS;

function creds() {
  const lovable = process.env["LOVABLE_API_KEY"];
  const sheets = process.env["GOOGLE_SHEETS_API_KEY"];
  const sheetId = process.env["GREWELLA_SHEET_ID"];
  if (!lovable || !sheets || !sheetId) return null;
  return { lovable, sheets, sheetId };
}

async function gw(path: string, init: RequestInit, c: NonNullable<ReturnType<typeof creds>>) {
  const res = await fetch(`${GATEWAY_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${c.lovable}`,
      "X-Connection-Api-Key": c.sheets,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Sheets request failed [${res.status}]: ${body}`);
    throw new Error(`Sheets request failed [${res.status}]`);
  }
  return res.json();
}

async function ensureTab(tab: TabName, c: NonNullable<ReturnType<typeof creds>>) {
  const meta = await gw(`/spreadsheets/${c.sheetId}?fields=sheets.properties.title`, { method: "GET" }, c);
  const titles: string[] = (meta.sheets ?? []).map((s: { properties: { title: string } }) => s.properties.title);
  if (!titles.includes(tab)) {
    await gw(`/spreadsheets/${c.sheetId}:batchUpdate`, {
      method: "POST",
      body: JSON.stringify({ requests: [{ addSheet: { properties: { title: tab } } }] }),
    }, c);
  }
  const head = await gw(`/spreadsheets/${c.sheetId}/values/${tab}!A1:A1`, { method: "GET" }, c);
  if (!head.values || head.values.length === 0) {
    await gw(`/spreadsheets/${c.sheetId}/values/${tab}!A1?valueInputOption=RAW`, {
      method: "PUT",
      body: JSON.stringify({ values: [TABS[tab]] }),
    }, c);
  }
}

export async function appendLead(tab: TabName, row: string[]) {
  const c = creds();
  if (!c) return { ok: false as const, reason: "not_configured" as const };
  await ensureTab(tab, c);
  // RAW prevents formula injection from visitor input.
  await gw(`/spreadsheets/${c.sheetId}/values/${tab}!A1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
    method: "POST",
    body: JSON.stringify({ values: [row] }),
  }, c);
  return { ok: true as const };
}
