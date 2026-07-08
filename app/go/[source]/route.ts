import { NextResponse, type NextRequest } from "next/server";
import { resolveLink } from "@/lib/links";

/**
 * /go/[source] — clean-slug 302 redirect to the community, with UTMs appended.
 *
 * The raw destination never appears in any public link; it lives only in
 * lib/links.ts. A privacy-light click event is written server-side before the
 * redirect fires (best-effort — never blocks the redirect).
 */

export const dynamic = "force-dynamic";

async function logClick(
  req: NextRequest,
  source: string,
  medium: string,
): Promise<void> {
  try {
    const { track } = await import("@vercel/analytics/server");
    await track("go_click", {
      source,
      medium,
      referrer: req.headers.get("referer") ?? "direct",
    });
  } catch {
    // Analytics is optional plumbing. A logging failure must never stop the
    // reader from reaching the community.
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ source: string }> },
) {
  const { source } = await params;
  const link = resolveLink(source);

  await logClick(req, link.source, link.medium);

  return NextResponse.redirect(link.destination, { status: 302 });
}
