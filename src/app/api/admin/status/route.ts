import { NextResponse } from "next/server";
import { isPasswordSet } from "@/lib/auth";

// Lets the login page decide whether to show "create password" (first run)
// or the normal login form.
export async function GET() {
  return NextResponse.json({ passwordSet: await isPasswordSet() });
}
