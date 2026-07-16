import { NextResponse } from "next/server";
import { login, startSession } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = (await request.json().catch(() => ({}))) as { password?: string };
  if (!password) return NextResponse.json({ ok: false, error: "bad" }, { status: 400 });

  const result = await login(password);
  if (!result.ok) {
    return NextResponse.json(result, { status: result.error === "locked" ? 429 : 401 });
  }
  await startSession();
  return NextResponse.json({ ok: true });
}
