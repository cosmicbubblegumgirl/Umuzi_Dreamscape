import { NextResponse } from "next/server";
import { updateBuild } from "@/lib/database";
import { currentUser } from "@/lib/session";

export const runtime = "nodejs";

const stages = ["Ideation", "Prototype", "Build", "Testing", "Launch", "Review"];

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Log in first." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { stage?: string; progress?: number; sandboxUrl?: string }
    | null;
  const { id } = await context.params;
  const patch: { stage?: string; progress?: number; sandboxUrl?: string } = {};

  if (typeof body?.stage === "string") {
    patch.stage = stages.includes(body.stage) ? body.stage : "Build";
  }

  if (typeof body?.progress !== "undefined") {
    patch.progress = clamp(Number(body.progress), 0, 100);
  }

  if (typeof body?.sandboxUrl === "string") {
    const normalizedUrl = normalizeProjectUrl(body.sandboxUrl);
    if (normalizedUrl === null) {
      return NextResponse.json(
        { error: "Use a valid http or https project URL." },
        { status: 400 },
      );
    }
    patch.sandboxUrl = normalizedUrl;
  }

  const build = updateBuild(id, patch);
  if (!build) {
    return NextResponse.json({ error: "Build not found." }, { status: 404 });
  }

  return NextResponse.json({ build });
}

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, value));
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
