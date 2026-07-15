import { NextResponse } from "next/server";
import { reactToMessage } from "@/lib/database";
import { currentUser } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Log in first." }, { status: 401 });
  }

  const { id } = await context.params;
  reactToMessage(id);
  return NextResponse.json({ ok: true });
}
