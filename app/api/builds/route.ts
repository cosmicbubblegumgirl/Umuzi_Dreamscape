import { NextResponse } from "next/server";
import { createBuild } from "@/lib/database";
import { currentUser } from "@/lib/session";

export const runtime = "nodejs";

const artOptions = ["eco", "sound", "kinara", "care"] as const;

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Log in first." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | {
        title?: string;
        role?: string;
        sector?: string;
        summary?: string;
        tags?: string;
        art?: string;
        sandboxUrl?: string;
      }
    | null;

  const title = cleanText(body?.title ?? "", 60);
  const summary = cleanText(body?.summary ?? "", 220);
  const role = cleanText(body?.role ?? "Learner builder", 60);
  const sector = cleanText(body?.sector ?? "Digital project", 60);
  const art = artOptions.includes(body?.art as (typeof artOptions)[number])
    ? (body?.art as (typeof artOptions)[number])
    : "eco";

  if (!title || !summary) {
    return NextResponse.json(
      { error: "Add a title and summary for the build." },
      { status: 400 },
    );
  }

  const sandboxUrl = normalizeProjectUrl(body?.sandboxUrl ?? "");
  if (sandboxUrl === null) {
    return NextResponse.json(
      { error: "Use a valid http or https project URL." },
      { status: 400 },
    );
  }

  const build = createBuild({
    ownerId: user.id,
    title,
    role,
    sector,
    summary,
    tags: splitTags(body?.tags ?? ""),
    art,
    sandboxUrl,
  });

  return NextResponse.json({ build }, { status: 201 });
}

function cleanText(value: string, maxLength: number) {
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function splitTags(value: string) {
  return value
    .split(",")
    .map((tag) => cleanText(tag, 24))
    .filter(Boolean)
    .slice(0, 5);
}

function normalizeProjectUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const hasProtocol = /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed);
  const localish = /^(localhost|127\.|10\.|172\.(1[6-9]|2\d|3[0-1])\.|192\.168\.|\[?::1\]?)/i.test(
    trimmed,
  );
  const candidate = hasProtocol ? trimmed : `${localish ? "http" : "https"}://${trimmed}`;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}
