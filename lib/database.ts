import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { randomUUID, scryptSync, timingSafeEqual } from "node:crypto";

export type UserRecord = {
  id: string;
  name: string;
  username: string;
  createdAt: string;
};

export type BuildRecord = {
  id: string;
  ownerId: string;
  owner: string;
  title: string;
  role: string;
  sector: string;
  summary: string;
  stage: string;
  progress: number;
  likes: number;
  shares: number;
  tags: string[];
  art: "eco" | "sound" | "kinara" | "care";
  sandboxUrl: string;
  createdAt: string;
};

export type MessageRecord = {
  id: string;
  buildId: string;
  userId: string | null;
  author: string;
  text: string;
  tone: "warm" | "note" | "you";
  sticker: boolean;
  reactions: number;
  createdAt: string;
};

export type TaskRecord = {
  id: string;
  buildId: string;
  title: string;
  status: "todo" | "doing" | "done";
  createdAt: string;
};

export type EvidenceRecord = {
  id: string;
  buildId: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

type UserRow = {
  id: string;
  name: string;
  username: string;
  password_hash: string;
  created_at: string;
};

type BuildRow = {
  id: string;
  owner_id: string;
  owner: string;
  title: string;
  role: string;
  sector: string;
  summary: string;
  stage: string;
  progress: number;
  likes: number;
  shares: number;
  tags: string;
  art: BuildRecord["art"];
  sandbox_url: string;
  created_at: string;
};

type MessageRow = {
  id: string;
  build_id: string;
  user_id: string | null;
  author: string;
  text: string;
  tone: MessageRecord["tone"];
  sticker: number;
  reactions: number;
  created_at: string;
};

type TaskRow = {
  id: string;
  build_id: string;
  title: string;
  status: TaskRecord["status"];
  created_at: string;
};

type EvidenceRow = {
  id: string;
  build_id: string;
  title: string;
  completed: number;
  created_at: string;
};

const databasePath = join(process.cwd(), "data", "dreamscape.db");

declare global {
  var dreamscapeDatabase: DatabaseSync | undefined;
}

export function getDatabase() {
  if (!existsSync(dirname(databasePath))) {
    mkdirSync(dirname(databasePath), { recursive: true });
  }

  if (!globalThis.dreamscapeDatabase) {
    globalThis.dreamscapeDatabase = new DatabaseSync(databasePath);
    globalThis.dreamscapeDatabase.exec("PRAGMA foreign_keys = ON");
    createSchema(globalThis.dreamscapeDatabase);
    seedDatabase(globalThis.dreamscapeDatabase);
  }

  migrateDatabase(globalThis.dreamscapeDatabase);

  return globalThis.dreamscapeDatabase;
}

export function createUser(name: string, username: string, password: string) {
  const now = new Date().toISOString();
  const id = randomUUID();
  const passwordHash = hashPassword(password);

  getDatabase()
    .prepare(
      `INSERT INTO users (id, name, username, password_hash, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .run(id, name, username, passwordHash, now);

  return getUserById(id);
}

export function getUserById(id: string) {
  const row = getDatabase()
    .prepare("SELECT id, name, username, created_at FROM users WHERE id = ?")
    .get(id) as Omit<UserRow, "password_hash"> | undefined;

  return row ? mapUser(row) : null;
}

export function getUserByUsername(username: string) {
  return getDatabase()
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username.toLowerCase()) as UserRow | undefined;
}

export function validateUser(username: string, password: string) {
  const row = getUserByUsername(username);
  if (!row || !verifyPassword(password, row.password_hash)) return null;
  return mapUser(row);
}

export function createSession(userId: string) {
  const token = randomUUID() + randomUUID();
  const now = new Date();
  const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  getDatabase()
    .prepare(
      `INSERT INTO sessions (id, user_id, token_hash, expires_at, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .run(randomUUID(), userId, hashToken(token), expires.toISOString(), now.toISOString());

  return { token, expires };
}

export function getUserBySessionToken(token: string | undefined) {
  if (!token) return null;

  const row = getDatabase()
    .prepare(
      `SELECT users.id, users.name, users.username, users.created_at
       FROM sessions
       JOIN users ON users.id = sessions.user_id
       WHERE sessions.token_hash = ? AND sessions.expires_at > ?`,
    )
    .get(hashToken(token), new Date().toISOString()) as
    | Omit<UserRow, "password_hash">
    | undefined;

  return row ? mapUser(row) : null;
}

export function deleteSession(token: string | undefined) {
  if (!token) return;
  getDatabase()
    .prepare("DELETE FROM sessions WHERE token_hash = ?")
    .run(hashToken(token));
}

export function listBuilds() {
  const rows = getDatabase()
    .prepare(
      `SELECT builds.*, users.name AS owner
       FROM builds
       JOIN users ON users.id = builds.owner_id
       ORDER BY builds.created_at DESC`,
    )
    .all() as BuildRow[];

  return rows.map(mapBuild);
}

export function createBuild(input: {
  ownerId: string;
  title: string;
  role: string;
  sector: string;
  summary: string;
  tags: string[];
  art: BuildRecord["art"];
  sandboxUrl: string;
}) {
  const id = randomUUID();
  const now = new Date().toISOString();

  getDatabase()
    .prepare(
      `INSERT INTO builds
       (id, owner_id, title, role, sector, summary, stage, progress, likes, shares, tags, art, sandbox_url, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 'Ideation', 12, 0, 0, ?, ?, ?, ?)`,
    )
    .run(
      id,
      input.ownerId,
      input.title,
      input.role,
      input.sector,
      input.summary,
      JSON.stringify(input.tags),
      input.art,
      input.sandboxUrl,
      now,
    );

  createTask(id, "Write acceptance criteria", "todo");
  createTask(id, "Share first update", "doing");
  createEvidence(id, "Problem statement");

  return listBuilds().find((build) => build.id === id) ?? null;
}

export function updateBuild(
  buildId: string,
  input: { stage?: string; progress?: number; sandboxUrl?: string },
) {
  getDatabase()
    .prepare(
      `UPDATE builds
       SET stage = COALESCE(?, stage),
           progress = COALESCE(?, progress),
           sandbox_url = COALESCE(?, sandbox_url)
       WHERE id = ?`,
    )
    .run(input.stage ?? null, input.progress ?? null, input.sandboxUrl ?? null, buildId);

  return listBuilds().find((build) => build.id === buildId) ?? null;
}

export function likeBuild(buildId: string) {
  getDatabase()
    .prepare("UPDATE builds SET likes = likes + 1 WHERE id = ?")
    .run(buildId);
}

export function listMessages() {
  const rows = getDatabase()
    .prepare("SELECT * FROM messages ORDER BY created_at ASC")
    .all() as MessageRow[];

  return rows.map(mapMessage);
}

export function createMessage(input: {
  buildId: string;
  userId: string | null;
  author: string;
  text: string;
  tone: MessageRecord["tone"];
  sticker: boolean;
}) {
  const id = randomUUID();
  getDatabase()
    .prepare(
      `INSERT INTO messages
       (id, build_id, user_id, author, text, tone, sticker, reactions, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)`,
    )
    .run(
      id,
      input.buildId,
      input.userId,
      input.author,
      input.text,
      input.tone,
      input.sticker ? 1 : 0,
      new Date().toISOString(),
    );

  return listMessages().find((message) => message.id === id) ?? null;
}

export function reactToMessage(messageId: string) {
  getDatabase()
    .prepare("UPDATE messages SET reactions = reactions + 1 WHERE id = ?")
    .run(messageId);
}

export function listTasks() {
  const rows = getDatabase()
    .prepare("SELECT * FROM tasks ORDER BY created_at ASC")
    .all() as TaskRow[];

  return rows.map(mapTask);
}

export function createTask(
  buildId: string,
  title: string,
  status: TaskRecord["status"],
) {
  const id = randomUUID();
  getDatabase()
    .prepare(
      `INSERT INTO tasks (id, build_id, title, status, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .run(id, buildId, title, status, new Date().toISOString());

  return listTasks().find((task) => task.id === id) ?? null;
}

export function updateTask(taskId: string, status: TaskRecord["status"]) {
  getDatabase()
    .prepare("UPDATE tasks SET status = ? WHERE id = ?")
    .run(status, taskId);
}

export function listEvidence() {
  const rows = getDatabase()
    .prepare("SELECT * FROM evidence ORDER BY created_at ASC")
    .all() as EvidenceRow[];

  return rows.map(mapEvidence);
}

export function createEvidence(buildId: string, title: string) {
  const id = randomUUID();
  getDatabase()
    .prepare(
      `INSERT INTO evidence (id, build_id, title, completed, created_at)
       VALUES (?, ?, ?, 0, ?)`,
    )
    .run(id, buildId, title, new Date().toISOString());

  return listEvidence().find((item) => item.id === id) ?? null;
}

export function updateEvidence(evidenceId: string, completed: boolean) {
  getDatabase()
    .prepare("UPDATE evidence SET completed = ? WHERE id = ?")
    .run(completed ? 1 : 0, evidenceId);
}

function createSchema(database: DatabaseSync) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS builds (
      id TEXT PRIMARY KEY,
      owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      role TEXT NOT NULL,
      sector TEXT NOT NULL,
      summary TEXT NOT NULL,
      stage TEXT NOT NULL,
      progress INTEGER NOT NULL,
      likes INTEGER NOT NULL DEFAULT 0,
      shares INTEGER NOT NULL DEFAULT 0,
      tags TEXT NOT NULL,
      art TEXT NOT NULL,
      sandbox_url TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      build_id TEXT NOT NULL REFERENCES builds(id) ON DELETE CASCADE,
      user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
      author TEXT NOT NULL,
      text TEXT NOT NULL,
      tone TEXT NOT NULL,
      sticker INTEGER NOT NULL DEFAULT 0,
      reactions INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      build_id TEXT NOT NULL REFERENCES builds(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS evidence (
      id TEXT PRIMARY KEY,
      build_id TEXT NOT NULL REFERENCES builds(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );
  `);
}

function migrateDatabase(database: DatabaseSync) {
  database
    .prepare(
      `UPDATE builds
       SET sandbox_url = ''
       WHERE sandbox_url IN ('https://example.com', 'http://example.com', 'https://example.com/')`,
    )
    .run();
}

function seedDatabase(database: DatabaseSync) {
  const now = new Date().toISOString();
  const users = [
    ["quantum-cupcake", "quantum_cupcake", "quantum_cupcake"],
    ["nimbus-nandi", "Nimbus Nandi", "nimbus_nandi"],
    ["loop-lwazi", "Loop Lwazi", "loop_lwazi"],
    ["doodle-dee", "Doodle Dee", "doodle_dee"],
    ["byte-bongi", "Byte Bongi", "byte_bongi"],
    ["pixel-palesa", "Pixel Palesa", "pixel_palesa"],
    ["circuit-sizwe", "Circuit Sizwe", "circuit_sizwe"],
    ["sketch-sihle", "Sketch Sihle", "sketch_sihle"],
  ] as const;

  const userStatement = database.prepare(
      `INSERT INTO users (id, name, username, password_hash, created_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(username) DO UPDATE SET name = excluded.name`,
  );

  for (const [id, name, username] of users) {
    userStatement.run(id, name, username, hashPassword("dreamscape"), now);
  }

  const seedBuilds = [
    {
      id: "ecotrack",
      ownerUsername: "quantum_cupcake",
      title: "EcoTrack",
      role: "Frontend developer",
      sector: "Green innovation",
      summary:
        "A dashboard that helps students track everyday environmental choices and compare team impact.",
      stage: "Build",
      progress: 80,
      likes: 128,
      shares: 18,
      tags: ["Web app", "Sustainability", "Charts"],
      art: "eco",
      sandboxUrl: "",
    },
    {
      id: "soundscape",
      ownerUsername: "pixel_palesa",
      title: "Soundscape",
      role: "Mobile prototyper",
      sector: "Digital craft",
      summary:
        "A calm mobile concept that turns study sessions into focus soundboards and notes.",
      stage: "Prototype",
      progress: 65,
      likes: 84,
      shares: 9,
      tags: ["Mobile", "Audio", "UI"],
      art: "sound",
      sandboxUrl: "",
    },
    {
      id: "kinara",
      ownerUsername: "sketch_sihle",
      title: "Kinara",
      role: "Product designer",
      sector: "Care economy",
      summary:
        "A service concept for matching community care workers with verified local requests.",
      stage: "Testing",
      progress: 90,
      likes: 146,
      shares: 22,
      tags: ["Brand", "Service", "Care"],
      art: "kinara",
      sandboxUrl: "",
    },
    {
      id: "routewise",
      ownerUsername: "circuit_sizwe",
      title: "RouteWise",
      role: "Backend learner",
      sector: "Logistics",
      summary:
        "A planning board for delivery teams with shift notes, route handoffs, and issue tracking.",
      stage: "Review",
      progress: 72,
      likes: 91,
      shares: 13,
      tags: ["Node", "Maps", "Ops"],
      art: "care",
      sandboxUrl: "",
    },
    {
      id: "nimbus-nook",
      ownerUsername: "nimbus_nandi",
      title: "Nimbus Nook",
      role: "Community cloud builder",
      sector: "Peer support",
      summary:
        "A cozy mentor-nook dashboard where learners park blockers, collect kind nudges, and find a review buddy.",
      stage: "Prototype",
      progress: 58,
      likes: 77,
      shares: 11,
      tags: ["Support", "Mentors", "Community"],
      art: "care",
      sandboxUrl: "",
    },
    {
      id: "learn-loop",
      ownerUsername: "loop_lwazi",
      title: "Learn Loop",
      role: "Learning flow designer",
      sector: "Skills lab",
      summary:
        "A study loop that turns lessons into tiny quests, reflection notes, peer review, and next-step prompts.",
      stage: "Build",
      progress: 74,
      likes: 112,
      shares: 16,
      tags: ["Learning", "Roadmap", "Quests"],
      art: "sound",
      sandboxUrl: "",
    },
    {
      id: "doodle-flow",
      ownerUsername: "doodle_dee",
      title: "Doodle Flow",
      role: "Creative interface tinkerer",
      sector: "Digital craft",
      summary:
        "A playful design board for sketching app ideas, pinning screenshots, and turning doodles into build steps.",
      stage: "Testing",
      progress: 69,
      likes: 98,
      shares: 20,
      tags: ["Design", "Sketches", "Prototype"],
      art: "kinara",
      sandboxUrl: "",
    },
    {
      id: "flowforge-exam-lab",
      ownerUsername: "byte_bongi",
      title: "FlowForge Exam Lab",
      role: "Quiz-game builder",
      sector: "Learning games",
      summary:
        "Imported local project: a lightweight exam lab that turns revision into timed flows and question validation.",
      stage: "Review",
      progress: 83,
      likes: 64,
      shares: 8,
      tags: ["Imported", "Game", "Assessment"],
      art: "eco",
      sandboxUrl: "http://localhost:4173",
    },
    {
      id: "sap-cap-simulator",
      ownerUsername: "circuit_sizwe",
      title: "SAP CAP Simulator",
      role: "Enterprise app explorer",
      sector: "Digital systems",
      summary:
        "Imported local project: a SAP Business Application Studio CAP exercise simulator for hands-on practice.",
      stage: "Pilot",
      progress: 61,
      likes: 52,
      shares: 7,
      tags: ["Imported", "SAP", "Simulator"],
      art: "care",
      sandboxUrl: "http://localhost:4000",
    },
  ] as const;

  const buildStatement = database.prepare(
    `INSERT OR IGNORE INTO builds
     (id, owner_id, title, role, sector, summary, stage, progress, likes, shares, tags, art, sandbox_url, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );

  for (const build of seedBuilds) {
    const owner = database
      .prepare("SELECT id FROM users WHERE username = ?")
      .get(build.ownerUsername) as { id: string } | undefined;
    if (!owner) continue;

    buildStatement.run(
      build.id,
      owner.id,
      build.title,
      build.role,
      build.sector,
      build.summary,
      build.stage,
      build.progress,
      build.likes,
      build.shares,
      JSON.stringify(build.tags),
      build.art,
      build.sandboxUrl,
      now,
    );
  }

  const messageStatement = database.prepare(
    `INSERT INTO messages
     (id, build_id, user_id, author, text, tone, sticker, reactions, created_at)
     SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?
     WHERE NOT EXISTS (
       SELECT 1 FROM messages WHERE build_id = ? AND author = ? AND text = ?
     )`,
  );

  const seedMessages = [
    ["ecotrack", "quantum_cupcake", "quantum_cupcake", "Pushed the new metrics branch. The weekly comparison cards are ready for feedback.", "warm", 0, 8],
    ["ecotrack", null, "Loop Lwazi", "The charts read clearly. Add one sentence under the score so the trend has context.", "note", 0, 7],
    ["ecotrack", null, "Doodle Dee", "The insights panel feels polished. I can help make the empty state sparkle.", "warm", 0, 6],
    ["nimbus-nook", "nimbus_nandi", "Nimbus Nandi", "Nook update: the buddy-matching cards now sort blockers by mood and urgency.", "warm", 0, 5],
    ["learn-loop", "loop_lwazi", "Loop Lwazi", "Loop check: lesson quests now unlock reflection prompts after peer review.", "warm", 0, 9],
    ["doodle-flow", "doodle_dee", "Doodle Dee", "Fresh sketch drop. The storyboard wall finally feels less spaghetti and more flow.", "note", 0, 4],
    ["flowforge-exam-lab", "byte_bongi", "Byte Bongi", "Imported FlowForge and marked the validation test as the next review target.", "note", 0, 3],
    ["sap-cap-simulator", "circuit_sizwe", "Circuit Sizwe", "SAP simulator imported. It needs a live sandbox URL once the local server is running.", "note", 0, 3],
  ] as const;

  for (const [buildId, username, author, text, tone, sticker, reactions] of seedMessages) {
    const owner = username
      ? (database
          .prepare("SELECT id FROM users WHERE username = ?")
          .get(username) as { id: string } | undefined)
      : null;
    messageStatement.run(
      randomUUID(),
      buildId,
      owner?.id ?? null,
      author,
      text,
      tone,
      sticker,
      reactions,
      now,
      buildId,
      author,
      text,
    );
  }

  const taskStatement = database.prepare(
    `INSERT INTO tasks (id, build_id, title, status, created_at)
     SELECT ?, ?, ?, ?, ?
     WHERE NOT EXISTS (
       SELECT 1 FROM tasks WHERE build_id = ? AND title = ?
     )`,
  );

  const seedTasks = [
    ["ecotrack", "Review empty states", "todo"],
    ["ecotrack", "Test mobile dashboard", "doing"],
    ["ecotrack", "Publish update", "done"],
    ["soundscape", "Tune timer motion", "doing"],
    ["kinara", "Add trust badge copy", "done"],
    ["routewise", "Debug route conflicts", "todo"],
    ["nimbus-nook", "Embed a support-room sandbox", "doing"],
    ["learn-loop", "Add quest completion states", "todo"],
    ["doodle-flow", "Upload storyboard screenshots", "doing"],
    ["flowforge-exam-lab", "Run question validation test", "todo"],
    ["sap-cap-simulator", "Connect local simulator URL", "todo"],
  ] as const;

  for (const [buildId, title, status] of seedTasks) {
    taskStatement.run(randomUUID(), buildId, title, status, now, buildId, title);
  }

  const evidenceStatement = database.prepare(
    `INSERT INTO evidence (id, build_id, title, completed, created_at)
     SELECT ?, ?, ?, ?, ?
     WHERE NOT EXISTS (
       SELECT 1 FROM evidence WHERE build_id = ? AND title = ?
     )`,
  );

  const seedEvidence = [
    ["ecotrack", "Problem statement and acceptance criteria", 1],
    ["ecotrack", "Screenshots, sandbox link, and feature notes", 1],
    ["ecotrack", "Peer feedback and response history", 1],
    ["ecotrack", "Reflection: what changed after review", 0],
    ["nimbus-nook", "Mentor-matching user flow", 1],
    ["learn-loop", "Quest loop screenshots", 1],
    ["doodle-flow", "Sketch-to-build storyboard", 1],
    ["flowforge-exam-lab", "Imported local project path", 1],
    ["sap-cap-simulator", "Simulator setup notes", 1],
  ] as const;

  for (const [buildId, title, completed] of seedEvidence) {
    evidenceStatement.run(
      randomUUID(),
      buildId,
      title,
      completed,
      now,
      buildId,
      title,
    );
  }
}

function mapUser(row: Omit<UserRow, "password_hash">): UserRecord {
  return {
    id: row.id,
    name: row.name,
    username: row.username,
    createdAt: row.created_at,
  };
}

function mapBuild(row: BuildRow): BuildRecord {
  return {
    id: row.id,
    ownerId: row.owner_id,
    owner: row.owner,
    title: row.title,
    role: row.role,
    sector: row.sector,
    summary: row.summary,
    stage: row.stage,
    progress: row.progress,
    likes: row.likes,
    shares: row.shares,
    tags: safeJsonArray(row.tags),
    art: row.art,
    sandboxUrl: row.sandbox_url,
    createdAt: row.created_at,
  };
}

function mapMessage(row: MessageRow): MessageRecord {
  return {
    id: row.id,
    buildId: row.build_id,
    userId: row.user_id,
    author: row.author,
    text: row.text,
    tone: row.tone,
    sticker: row.sticker === 1,
    reactions: row.reactions,
    createdAt: row.created_at,
  };
}

function mapTask(row: TaskRow): TaskRecord {
  return {
    id: row.id,
    buildId: row.build_id,
    title: row.title,
    status: row.status,
    createdAt: row.created_at,
  };
}

function mapEvidence(row: EvidenceRow): EvidenceRecord {
  return {
    id: row.id,
    buildId: row.build_id,
    title: row.title,
    completed: row.completed === 1,
    createdAt: row.created_at,
  };
}

function safeJsonArray(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function hashPassword(password: string) {
  const salt = randomUUID();
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, savedHash: string) {
  const [salt, hash] = savedHash.split(":");
  if (!salt || !hash) return false;

  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function hashToken(token: string) {
  return scryptSync(token, "dreamscape-session", 64).toString("hex");
}
