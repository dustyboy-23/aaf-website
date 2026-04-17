import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let slug: string | undefined;
  try {
    const body = await request.json();
    slug = body?.post?.current?.slug;
  } catch {
    // body may be empty
  }

  revalidatePath("/");
  if (slug) {
    revalidatePath(`/${slug}`);
    revalidatePath("/news");
    revalidatePath("/learn");
    revalidatePath("/deep-dives");
    revalidatePath("/tools");
    revalidatePath("/signal");
  }

  return NextResponse.json({ revalidated: true, slug: slug ?? null });
}
