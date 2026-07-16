import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { deleteEnquiry } from "@/lib/data";

export async function DELETE(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await requireSession())) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await ctx.params;
  await deleteEnquiry(Number(id));
  return NextResponse.json({ ok: true });
}
