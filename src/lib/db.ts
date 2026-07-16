import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Lazily create the Neon SQL client so that importing this module during the
// build (before env vars are read) never throws. The connection string is
// injected by the Vercel Neon integration as DATABASE_URL, and mirrored into
// .env.local for local development.
let client: NeonQueryFunction<false, false> | null = null;

export function db(): NeonQueryFunction<false, false> {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    client = neon(url);
  }
  return client;
}
