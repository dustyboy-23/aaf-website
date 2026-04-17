import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * Newsletter subscription stub.
 *
 * Appends submissions to `data/subscribers.jsonl` at the repo root.
 * Designed to be swapped for a real provider (ConvertKit / Buttondown /
 * Loops) by replacing the persist block below — the request/response
 * contract stays stable, so the client component doesn't change.
 *
 * Why JSON Lines: atomic append semantics without needing a DB, and
 * easily replayable when we port to the real provider.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DATA_DIR = path.join(process.cwd(), "data");
const STORE = path.join(DATA_DIR, "subscribers.jsonl");

export async function POST(req: Request) {
  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const source = body.source || "unknown";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That doesn't look like a valid email." },
      { status: 400 },
    );
  }

  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    const line =
      JSON.stringify({
        email,
        source,
        ts: new Date().toISOString(),
      }) + "\n";
    fs.appendFileSync(STORE, line, "utf-8");
  } catch (err) {
    console.error("[subscribe] persist failed", err);
    // Don't leak filesystem errors to the client. Fail silently as far as
    // the user is concerned — we'd rather lose one submission than hand
    // them a scary "server error" screen on the homepage CTA.
  }

  return NextResponse.json({ ok: true });
}
