import { NextResponse } from "next/server";
import { createTask } from "@/lib/database";
import { currentUser } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Log in first." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { buildId?: string; title?: string }
    | null;
  const buildId = body?.buildId?.trim() ?? "";
  const title = body?.title?.trim().replace(/\s+/g, " ").slice(0, 90) ?? "";

  if (!buildId || !title) {
    return NextResponse.json(
      { error: "Add a task title." },
      { status: 400 },
    );
  }

  const task = createTask(buildId, title, "todo");
  return NextResponse.json({ task }, { status: 201 });
}
