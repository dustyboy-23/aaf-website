import { NextResponse } from "next/server";

/**
 * Newsletter subscription endpoint.
 *
 * Logs every signup to stdout (visible in Vercel function logs) and
 * sends a Telegram notification to Dusty so he knows the moment
 * someone subscribes. Email provider gets wired up once we hit 10.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function notifyTelegram(email: string, source: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = `New AAF subscriber: ${email}\nSource: ${source}\nTime: ${new Date().toISOString()}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch {
    // Don't let Telegram failures break the signup flow
    console.error("[subscribe] Telegram notify failed");
  }
}

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

  // Log to stdout -- visible in Vercel function logs
  console.log(
    `[subscribe] ${JSON.stringify({ email, source, ts: new Date().toISOString() })}`,
  );

  // Ping Dusty on Telegram
  await notifyTelegram(email, source);

  return NextResponse.json({ ok: true });
}
