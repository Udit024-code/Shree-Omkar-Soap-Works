import { NextResponse } from "next/server";
import { isPasswordSet, setPassword, startSession } from "@/lib/auth";

// First-run only: the owner creates their password. Refuses once a password
// already exists (so nobody can reset it without logging in).
export async function POST(request: Request) {
  if (await isPasswordSet()) {
    return NextResponse.json({ ok: false, error: "already_set" }, { status: 403 });
  }
  const { password } = (await request.json().catch(() => ({}))) as { password?: string };
  if (!password || password.length < 8) {
    return NextResponse.json({ ok: false, error: "too_short" }, { status: 400 });
  }
  await setPassword(password);
  await startSession();
  return NextResponse.json({ ok: true });
}
