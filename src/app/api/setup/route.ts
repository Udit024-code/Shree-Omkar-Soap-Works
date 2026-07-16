import { NextResponse } from "next/server";
import { initSchema, seedIfEmpty } from "@/lib/data";

// One-time database setup: creates tables and seeds products/FAQs from the
// code defaults. Guarded by a secret so it can't be triggered by strangers.
// Call once after connecting the database: /api/setup?secret=YOUR_SETUP_SECRET
export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  if (!process.env.SETUP_SECRET || secret !== process.env.SETUP_SECRET) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  await initSchema();
  await seedIfEmpty();
  return NextResponse.json({ ok: true, message: "Database ready and seeded." });
}
