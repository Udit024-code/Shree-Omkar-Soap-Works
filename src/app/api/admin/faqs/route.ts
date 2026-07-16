import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { createFaq, getFaqs } from "@/lib/data";

const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function GET() {
  if (!(await requireSession())) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ faqs: await getFaqs() });
}

export async function POST(request: Request) {
  if (!(await requireSession())) return NextResponse.json({ ok: false }, { status: 401 });
  const b = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const qEn = s(b.qEn);
  const aEn = s(b.aEn);
  if (!qEn || !aEn) return NextResponse.json({ ok: false, error: "question and answer required" }, { status: 400 });
  await createFaq({
    qEn,
    aEn,
    qHi: s(b.qHi) || qEn,
    aHi: s(b.aHi) || aEn,
    sortOrder: Number(b.sortOrder) || 0,
  });
  return NextResponse.json({ ok: true });
}
