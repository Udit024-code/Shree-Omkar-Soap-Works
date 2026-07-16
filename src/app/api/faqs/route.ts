import { NextResponse } from "next/server";
import { getFaqsSafe } from "@/lib/data";

// Public: the chatbot fetches the current FAQ list from here. Falls back to
// the built-in defaults if the database is unavailable.
export async function GET() {
  return NextResponse.json({ faqs: await getFaqsSafe() });
}
