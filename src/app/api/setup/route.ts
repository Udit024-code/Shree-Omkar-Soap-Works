import { NextResponse } from "next/server";
import { initSchema, seedIfEmpty } from "@/lib/data";
import { db } from "@/lib/db";

// One-time database setup: creates tables and seeds products/FAQs from the
// code defaults. Guarded by a secret so it can't be triggered by strangers.
// Call once after connecting the database: /api/setup?secret=YOUR_SETUP_SECRET
// Pass &reset=admin to clear the admin password (returns the panel to first-run).
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  if (!process.env.SETUP_SECRET || params.get("secret") !== process.env.SETUP_SECRET) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  await initSchema();
  await seedIfEmpty();

  if (params.get("reset") === "admin") {
    await db()`UPDATE admin SET password_hash=NULL, failed_attempts=0, locked_until=NULL WHERE id=1`;
    return NextResponse.json({ ok: true, message: "Admin password reset — panel is back to first-run." });
  }

  return NextResponse.json({ ok: true, message: "Database ready and seeded." });
}
