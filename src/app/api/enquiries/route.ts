import { NextResponse } from "next/server";
import { createEnquiry } from "@/lib/data";

const MAX = 2000;
const clip = (v: unknown) => (typeof v === "string" ? v.slice(0, MAX).trim() : "");

// Public endpoint: stores an enquiry from the contact form or the chatbot.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields; real users leave them empty.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true }); // silently accept, don't store
  }

  const name = clip(body.name);
  const phone = clip(body.phone);
  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "name and phone required" }, { status: 400 });
  }

  await createEnquiry({
    name,
    phone,
    business: clip(body.business) || null,
    product: clip(body.product) || null,
    qty: clip(body.qty) || null,
    message: clip(body.message) || null,
    source: body.source === "chatbot" ? "chatbot" : "form",
  });

  return NextResponse.json({ ok: true });
}
