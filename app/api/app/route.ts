import { NextResponse } from "next/server";
import {
  listBuilds,
  listEvidence,
  listMessages,
  listTasks,
} from "@/lib/database";
import { currentUser } from "@/lib/session";

export const runtime = "nodejs";

export async function GET() {
  const builds = listBuilds();
  const messages = listMessages();
  const tasks = listTasks();
  const evidence = listEvidence();

  return NextResponse.json({
    user: await currentUser(),
    builds,
    messages,
    tasks,
    evidence,
    stats: {
      activeLearners: 10526,
      employerPartners: 52,
      earningOpportunities: 4350,
      savedUpdates: messages.length,
      completedTasks: tasks.filter((task) => task.status === "done").length,
    },
  });
}
