import { NextResponse } from "next/server";
import { createMessage } from "@/lib/database";
import { currentUser } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Log in first." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { buildId?: string; text?: string; sticker?: boolean }
    | null;

  const buildId = body?.buildId?.trim() ?? "";
  const text = body?.text?.trim().replace(/\s+/g, " ").slice(0, 280) ?? "";

  if (!buildId || !text) {
    return NextResponse.json(
      { error: "Choose a build and write an update." },
      { status: 400 },
    );
  }

  const message = createMessage({
    buildId,
    userId: user.id,
    author: user.name,
    text,
    tone: "you",
    sticker: body?.sticker === true,
  });

  return NextResponse.json({ message }, { status: 201 });
}
