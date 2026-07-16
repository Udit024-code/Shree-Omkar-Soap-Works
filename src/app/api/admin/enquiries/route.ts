import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { getEnquiries } from "@/lib/data";

export async function GET() {
  if (!(await requireSession())) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ enquiries: await getEnquiries() });
}
