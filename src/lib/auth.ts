import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { db } from "./db";
import { SESSION_COOKIE, SESSION_HOURS, signSession, verifySession } from "./session";

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

export async function isPasswordSet(): Promise<boolean> {
  const rows = (await db()`SELECT password_hash FROM admin WHERE id=1`) as { password_hash: string | null }[];
  return !!rows[0]?.password_hash;
}

// Owner sets their own password on first run — we only ever store the hash.
export async function setPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  await db()`UPDATE admin SET password_hash=${hash}, failed_attempts=0, locked_until=NULL WHERE id=1`;
}

export type LoginResult =
  | { ok: true }
  | { ok: false; error: "bad" | "locked" | "no_password"; lockedSeconds?: number };

export async function login(password: string): Promise<LoginResult> {
  const rows = (await db()`
    SELECT password_hash, failed_attempts, locked_until FROM admin WHERE id=1`) as {
    password_hash: string | null;
    failed_attempts: number;
    locked_until: string | null;
  }[];
  const admin = rows[0];
  if (!admin?.password_hash) return { ok: false, error: "no_password" };

  if (admin.locked_until && new Date(admin.locked_until) > new Date()) {
    const secs = Math.ceil((new Date(admin.locked_until).getTime() - Date.now()) / 1000);
    return { ok: false, error: "locked", lockedSeconds: secs };
  }

  const match = await bcrypt.compare(password, admin.password_hash);
  if (!match) {
    const attempts = (admin.failed_attempts ?? 0) + 1;
    if (attempts >= MAX_ATTEMPTS) {
      const until = new Date(Date.now() + LOCK_MINUTES * 60000).toISOString();
      await db()`UPDATE admin SET failed_attempts=${attempts}, locked_until=${until} WHERE id=1`;
      return { ok: false, error: "locked", lockedSeconds: LOCK_MINUTES * 60 };
    }
    await db()`UPDATE admin SET failed_attempts=${attempts} WHERE id=1`;
    return { ok: false, error: "bad" };
  }

  await db()`UPDATE admin SET failed_attempts=0, locked_until=NULL WHERE id=1`;
  return { ok: true };
}

export async function startSession() {
  const token = await signSession();
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_HOURS * 3600,
  });
}

export async function endSession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

// Server-side guard for route handlers and admin server components.
export async function requireSession(): Promise<boolean> {
  const jar = await cookies();
  return verifySession(jar.get(SESSION_COOKIE)?.value);
}
