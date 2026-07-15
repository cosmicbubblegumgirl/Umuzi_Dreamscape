import { NextResponse } from "next/server";
import { updateTask, type TaskRecord } from "@/lib/database";
import { currentUser } from "@/lib/session";

export const runtime = "nodejs";

const statuses: TaskRecord["status"][] = ["todo", "doing", "done"];

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Log in first." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { status?: TaskRecord["status"] }
    | null;
  const status = statuses.includes(body?.status ?? "todo")
    ? body?.status ?? "todo"
    : "todo";
  const { id } = await context.params;

  updateTask(id, status);
  return NextResponse.json({ ok: true });
}
