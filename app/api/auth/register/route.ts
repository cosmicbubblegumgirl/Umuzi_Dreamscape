import { NextResponse } from "next/server";
import { createUser, getUserByUsername } from "@/lib/database";
import { signInUser } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { name?: string; username?: string; password?: string }
    | null;

  const name = cleanText(body?.name ?? "quantum_cupcake");
  const username = cleanUsername(body?.username ?? "");
  const password = body?.password ?? "";

  if (!username || !password || password.length < 6) {
    return NextResponse.json(
      { error: "Use a username and a password with at least 6 characters." },
      { status: 400 },
    );
  }

  if (getUserByUsername(username)) {
    return NextResponse.json(
      { error: "That username is already taken." },
      { status: 409 },
    );
  }

  const user = createUser(name, username, password);
  if (!user) {
    return NextResponse.json(
      { error: "Account could not be created." },
      { status: 500 },
    );
  }

  await signInUser(user.id);
  return NextResponse.json({ user });
}

function cleanUsername(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9_]/g, "").slice(0, 28);
}

function cleanText(value: string) {
  return value.trim().replace(/\s+/g, " ").slice(0, 80);
}
