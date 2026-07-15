import { NextResponse } from "next/server";
import { updateEvidence } from "@/lib/database";
import { currentUser } from "@/lib/session";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Log in first." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { completed?: boolean }
    | null;
  const { id } = await context.params;

  updateEvidence(id, body?.completed === true);
  return NextResponse.json({ ok: true });
}
