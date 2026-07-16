import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { deleteFaq, updateFaq } from "@/lib/data";

const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function PUT(request: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await requireSession())) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await ctx.params;
  const b = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const qEn = s(b.qEn);
  const aEn = s(b.aEn);
  if (!qEn || !aEn) return NextResponse.json({ ok: false, error: "question and answer required" }, { status: 400 });
  await updateFaq(Number(id), {
    qEn,
    aEn,
    qHi: s(b.qHi) || qEn,
    aHi: s(b.aHi) || aEn,
    sortOrder: Number(b.sortOrder) || 0,
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await requireSession())) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await ctx.params;
  await deleteFaq(Number(id));
  return NextResponse.json({ ok: true });
}
