import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { createProduct, getProducts } from "@/lib/data";

const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function GET() {
  if (!(await requireSession())) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ products: await getProducts() });
}

export async function POST(request: Request) {
  if (!(await requireSession())) return NextResponse.json({ ok: false }, { status: 401 });
  const b = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const slug = s(b.slug);
  const nameEn = s(b.nameEn);
  if (!slug || !nameEn) return NextResponse.json({ ok: false, error: "slug and name required" }, { status: 400 });
  await createProduct({
    slug,
    nameEn,
    nameHi: s(b.nameHi) || nameEn,
    typeEn: s(b.typeEn),
    typeHi: s(b.typeHi),
    image: s(b.image),
    sortOrder: Number(b.sortOrder) || 0,
  });
  return NextResponse.json({ ok: true });
}
