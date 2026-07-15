import { NextResponse } from "next/server";
import { validateUser } from "@/lib/database";
import { signInUser } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { username?: string; password?: string }
    | null;

  const username = body?.username?.trim().toLowerCase() ?? "";
  const password = body?.password ?? "";
  const user = validateUser(username, password);

  if (!user) {
    return NextResponse.json(
      { error: "Username or password is incorrect." },
      { status: 401 },
    );
  }

  await signInUser(user.id);
  return NextResponse.json({ user });
}
