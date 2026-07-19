"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import {
  Award,
  Bell,
  Bookmark,
  Camera,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Code2,
  Compass,
  Download,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  Heart,
  Home as HomeIcon,
  LayoutDashboard,
  Laptop,
  LogOut,
  MessageCircle,
  MessageSquare,
  MonitorSmartphone,
  Paperclip,
  Play,
  Plus,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type SurfaceKey = "feed" | "build" | "learn" | "chat" | "tasks" | "evidence";

type DesktopInstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

type UserRecord = {
  id: string;
  name: string;
  username: string;
  createdAt: string;
};

type BuildRecord = {
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

type MessageRecord = {
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

type TaskRecord = {
  id: string;
  buildId: string;
  title: string;
  status: "todo" | "doing" | "done";
  createdAt: string;
};

type EvidenceRecord = {
  id: string;
  buildId: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

type AppData = {
  user: UserRecord | null;
  builds: BuildRecord[];
  messages: MessageRecord[];
  tasks: TaskRecord[];
  evidence: EvidenceRecord[];
  stats: {
    activeLearners: number;
    employerPartners: number;
    earningOpportunities: number;
    savedUpdates: number;
    completedTasks: number;
  };
};

const emptyData: AppData = {
  user: null,
  builds: [],
  messages: [],
  tasks: [],
  evidence: [],
  stats: {
    activeLearners: 0,
    employerPartners: 0,
    earningOpportunities: 0,
    savedUpdates: 0,
    completedTasks: 0,
  },
};

const surfaces: Array<{ key: SurfaceKey; label: string; icon: LucideIcon }> = [
  { key: "feed", label: "Home", icon: HomeIcon },
  { key: "build", label: "Builds", icon: LayoutDashboard },
  { key: "learn", label: "Learn", icon: Compass },
  { key: "chat", label: "Chat", icon: MessageCircle },
  { key: "tasks", label: "Tasks", icon: ClipboardList },
  { key: "evidence", label: "Evidence", icon: Award },
];

const stickerPack = [
  { label: "Umuzi community", image: "/stickers/umuzi-community.png" },
  { label: "Bloom. Build. Become.", image: "/stickers/bloom-build-become.png" },
  { label: "Code laptop", image: "/stickers/code-laptop.png" },
  { label: "Build what matters", image: "/stickers/build-what-matters.png" },
  { label: "Keep learning", image: "/stickers/keep-learning.png" },
  {
    label: "Git commit: I believed in myself",
    image: "/stickers/git-commit-believed.png",
  },
  { label: "Learning over knowing", image: "/stickers/learning-over-knowing.png" },
  { label: "Coffee. Code. Create.", image: "/stickers/coffee-code-create.png" },
  { label: "404 giving up not found", image: "/stickers/giving-up-not-found.png" },
  { label: "Keep shipping", image: "/stickers/keep-shipping.png" },
  {
    label: "Enable human potential",
    image: "/stickers/enable-human-potential.png",
  },
  {
    label: "Community builds everything",
    image: "/stickers/community-builds-everything.png",
  },
  { label: "Screen code plant", image: "/stickers/screen-code-plant.png" },
  {
    label: "To do: code learn impact",
    image: "/stickers/todo-code-learn-impact.png",
  },
  {
    label: "While alive learn grow repeat",
    image: "/stickers/while-alive-learn-grow-repeat.png",
  },
  { label: "Growth in progress", image: "/stickers/growth-in-progress.png" },
  { label: "Umuzi paint", image: "/stickers/umuzi-paint.png" },
  { label: "Train your mind", image: "/stickers/train-your-mind.png" },
  {
    label: "Eat code sleep repeat",
    image: "/stickers/eat-code-sleep-repeat.png",
  },
  { label: "Const future bright", image: "/stickers/const-future-bright.png" },
  { label: "Debug your doubts", image: "/stickers/debug-your-doubts.png" },
  { label: "Code with kindness", image: "/stickers/code-with-kindness.png" },
  {
    label: "Currently compiling confidence",
    image: "/stickers/compiling-confidence.png",
  },
  {
    label: "Small commits big dreams",
    image: "/stickers/small-commits-big-dreams.png",
  },
  { label: "Ideas become reality", image: "/stickers/ideas-become-reality.png" },
  { label: "SAP build the future", image: "/stickers/sap-build-the-future.png" },
  { label: "Side hustle loading", image: "/stickers/side-hustle-loading.png" },
  { label: "Security builds trust", image: "/stickers/security-builds-trust.png" },
  {
    label: "No bugs just features",
    image: "/stickers/no-bugs-just-features.png",
  },
  { label: "Scan to connect with Umuzi", image: "/stickers/scan-to-connect.png" },
  {
    label: "Passion plus purpose equals impact",
    image: "/stickers/passion-purpose-impact.png",
  },
  {
    label: "Frontend creates experiences",
    image: "/stickers/frontend-creates-experiences.png",
  },
  { label: "Design with empathy", image: "/stickers/design-with-empathy.png" },
  {
    label: "Sudo believe in yourself",
    image: "/stickers/sudo-believe-in-yourself.png",
  },
  {
    label: "Make something wonderful",
    image: "/stickers/make-something-wonderful.png",
  },
  {
    label: "A better tomorrow through tech",
    image: "/stickers/better-tomorrow-through-tech.png",
  },
  {
    label: "Code. Create. Contribute.",
    image: "/stickers/code-create-contribute.png",
  },
  {
    label: "In the clouds building solutions",
    image: "/stickers/cloud-building-solutions.png",
  },
  { label: "Practice makes progress", image: "/stickers/practice-makes-progress.png" },
  { label: "Stay focused", image: "/stickers/stay-focused.png" },
  { label: "Grow together", image: "/stickers/grow-together.png" },
  {
    label: "Dream. Develop. Deliver.",
    image: "/stickers/dream-develop-deliver.png",
  },
];

const roadmap = [
  {
    title: "Apply + Get Assessed",
    detail: "Create learner profile and interests",
    icon: ShieldCheck,
    state: "Complete",
  },
  {
    title: "Skills Lab",
    detail: "Post learning exercises and first projects",
    icon: Code2,
    state: "Complete",
  },
  {
    title: "Experience Lab",
    detail: "Showcase real-world projects and impact gigs",
    icon: FlaskConical,
    state: "In progress",
  },
  {
    title: "Community + Support",
    detail: "Get peer feedback, mentor advice, and stickers",
    icon: UsersRound,
    state: "Active",
  },
  {
    title: "Launch Lab",
    detail: "Export evidence for CVs, interviews, and placement",
    icon: Rocket,
    state: "Next",
  },
];

const resources: Array<{
  title: string;
  icon: LucideIcon;
  detail: string;
}> = [
  {
    title: "Learning Hub",
    icon: GraduationCap,
    detail: "Guides, walkthroughs, and tutorials",
  },
  {
    title: "Mentor lanes",
    icon: UsersRound,
    detail: "Focused review from trusted mentors",
  },
  {
    title: "Tools & Assets",
    icon: Wrench,
    detail: "Checklists, prompts, and build kits",
  },
];

const stages = ["Ideation", "Prototype", "Build", "Testing", "Launch", "Review"];
const taskStatuses: TaskRecord["status"][] = ["todo", "doing", "done"];
const mobileReleaseTag = "v0.1.1";
const mobileReleaseBase =
  "https://github.com/cosmicbubblegumgirl/Umuzi_Dreamscape/releases";
const desktopWebUrl = "https://cosmicbubblegumgirl.github.io/Umuzi_Dreamscape/";
const mobileDownloads = [
  {
    label: "Android APK",
    size: "4.1 MB",
    detail: "Debug APK for Android testing",
    href: `${mobileReleaseBase}/download/${mobileReleaseTag}/Umuzi-Dreamscape-Android-debug.apk`,
  },
  {
    label: "iOS wrapper",
    size: "221 KB",
    detail: "Capacitor wrapper for Xcode",
    href: `${mobileReleaseBase}/download/${mobileReleaseTag}/Umuzi-Dreamscape-iOS-wrapper.zip`,
  },
];
const mobileReleaseUrl = `${mobileReleaseBase}/tag/${mobileReleaseTag}`;

export default function Home() {
  const [data, setData] = useState<AppData>(emptyData);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [activeSurface, setActiveSurface] = useState<SurfaceKey>("feed");
  const [selectedBuildId, setSelectedBuildId] = useState("");
  const [draft, setDraft] = useState("");
  const [taskDraft, setTaskDraft] = useState("");
  const [evidenceDraft, setEvidenceDraft] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [mentorMode, setMentorMode] = useState(false);
  const [sandboxRunning, setSandboxRunning] = useState(true);
  const [showCreateBuild, setShowCreateBuild] = useState(false);
  const [status, setStatus] = useState("Ready to build");
  const [authError, setAuthError] = useState("");
  const [desktopInstallPrompt, setDesktopInstallPrompt] =
    useState<DesktopInstallPrompt | null>(null);
  const [desktopInstallReady, setDesktopInstallReady] = useState(false);
  const [newBuild, setNewBuild] = useState({
    title: "",
    role: "Learner builder",
    sector: "Digital project",
    summary: "",
    tags: "Web app, Portfolio",
    art: "eco",
    sandboxUrl: "",
  });
  const [authForm, setAuthForm] = useState({
    mode: "login" as "login" | "register",
    name: "quantum_cupcake",
    username: "quantum_cupcake",
    password: "dreamscape",
  });

  const loadApp = useCallback(async () => {
    const response = await fetch("/api/app", { cache: "no-store" });
    const nextData = (await response.json()) as AppData;
    setData(nextData);
    setLoaded(true);
    setSelectedBuildId((current) => current || nextData.builds[0]?.id || "");
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadApp(), 0);
    return () => window.clearTimeout(timer);
  }, [loadApp]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }

    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDesktopInstallPrompt(event as DesktopInstallPrompt);
      setDesktopInstallReady(true);
    };

    const handleInstalled = () => {
      setDesktopInstallPrompt(null);
      setDesktopInstallReady(false);
      setStatus("Desktop app installed");
    };

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const selectedBuild = useMemo(() => {
    return (
      data.builds.find((build) => build.id === selectedBuildId) ??
      data.builds[0] ??
      null
    );
  }, [data.builds, selectedBuildId]);

  const activeMessages = useMemo(() => {
    if (!selectedBuild) return [];
    return data.messages.filter((message) => message.buildId === selectedBuild.id);
  }, [data.messages, selectedBuild]);

  const activeTasks = useMemo(() => {
    if (!selectedBuild) return [];
    return data.tasks.filter((task) => task.buildId === selectedBuild.id);
  }, [data.tasks, selectedBuild]);

  const activeEvidence = useMemo(() => {
    if (!selectedBuild) return [];
    return data.evidence.filter((item) => item.buildId === selectedBuild.id);
  }, [data.evidence, selectedBuild]);

  const filteredBuilds = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return data.builds;

    return data.builds.filter((build) => {
      return [
        build.title,
        build.owner,
        build.sector,
        build.summary,
        build.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [data.builds, searchTerm]);

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setAuthError("");

    const endpoint =
      authForm.mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const response = await postJson(endpoint, authForm);

    if (!response.ok) {
      setAuthError(response.error ?? "Something went wrong.");
      setBusy(false);
      return;
    }

    await loadApp();
    setStatus(`Welcome back, ${authForm.username}`);
    setBusy(false);
  }

  async function signOut() {
    await postJson("/api/auth/logout", {});
    await loadApp();
    setStatus("Signed out");
  }

  async function openDesktopApp() {
    if (desktopInstallPrompt) {
      await desktopInstallPrompt.prompt();
      const choice = await desktopInstallPrompt.userChoice.catch(() => null);
      setDesktopInstallPrompt(null);
      setDesktopInstallReady(false);
      setStatus(
        choice?.outcome === "accepted"
          ? "Desktop app install started"
          : "Desktop install dismissed",
      );
      return;
    }

    window.open(desktopWebUrl, "_blank", "noopener,noreferrer");
    setStatus("Desktop browser app opened");
  }

  function chooseBuild(buildId: string, nextSurface: SurfaceKey = "build") {
    setSelectedBuildId(buildId);
    setActiveSurface(nextSurface);
    setStatus("Build opened");
  }

  async function createNewBuild(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const response = await postJson("/api/builds", newBuild);

    if (response.ok) {
      await loadApp();
      const build = response.build as BuildRecord | undefined;
      if (build) setSelectedBuildId(build.id);
      setActiveSurface("build");
      setShowCreateBuild(false);
      setNewBuild({
        title: "",
        role: "Learner builder",
        sector: "Digital project",
        summary: "",
        tags: "Web app, Portfolio",
        art: "eco",
        sandboxUrl: "",
      });
      setStatus("New build saved");
    } else {
      setStatus(response.error ?? "Build could not be saved");
    }

    setBusy(false);
  }

  async function updateBuild(stage: string, progress: number) {
    if (!selectedBuild) return;
    setBusy(true);
    const response = await fetch(`/api/builds/${selectedBuild.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage, progress }),
    });
    if (response.ok) {
      await loadApp();
      setStatus("Progress saved");
    }
    setBusy(false);
  }

  async function updateSandboxUrl(sandboxUrl: string) {
    if (!selectedBuild) return;
    setBusy(true);
    const response = await fetch(`/api/builds/${selectedBuild.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sandboxUrl }),
    });
    const body = await response.json().catch(() => ({}));
    if (response.ok) {
      await loadApp();
      setStatus(sandboxUrl.trim() ? "Project URL saved" : "Project URL cleared");
    } else {
      setStatus(body.error ?? "Project URL could not be saved");
    }
    setBusy(false);
  }

  async function likeSelectedBuild() {
    if (!selectedBuild) return;
    await postJson(`/api/builds/${selectedBuild.id}/like`, {});
    await loadApp();
    setStatus("Build liked");
  }

  async function postMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedBuild || !draft.trim()) return;

    const response = await postJson("/api/messages", {
      buildId: selectedBuild.id,
      text: draft,
      sticker: false,
    });

    if (response.ok) {
      setDraft("");
      await loadApp();
      setStatus("Update saved to the project thread");
    }
  }

  async function sendSticker(label: string) {
    if (!selectedBuild) return;
    const response = await postJson("/api/messages", {
      buildId: selectedBuild.id,
      text: label,
      sticker: true,
    });

    if (response.ok) {
      await loadApp();
      setActiveSurface("chat");
      setStatus(`Sticker sent: ${label}`);
    }
  }

  async function reactToMessage(messageId: string) {
    await postJson(`/api/messages/${messageId}/react`, {});
    await loadApp();
    setStatus("Reaction saved");
  }

  async function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedBuild || !taskDraft.trim()) return;

    const response = await postJson("/api/tasks", {
      buildId: selectedBuild.id,
      title: taskDraft,
    });

    if (response.ok) {
      setTaskDraft("");
      await loadApp();
      setStatus("Task added");
    }
  }

  async function moveTask(taskId: string, statusValue: TaskRecord["status"]) {
    await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: statusValue }),
    });
    await loadApp();
    setStatus("Task updated");
  }

  async function addEvidence(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedBuild || !evidenceDraft.trim()) return;

    const response = await postJson("/api/evidence", {
      buildId: selectedBuild.id,
      title: evidenceDraft,
    });

    if (response.ok) {
      setEvidenceDraft("");
      await loadApp();
      setStatus("Evidence item added");
    }
  }

  async function toggleEvidence(item: EvidenceRecord) {
    await fetch(`/api/evidence/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !item.completed }),
    });
    await loadApp();
    setStatus("Evidence checklist updated");
  }

  function exportEvidence() {
    if (!selectedBuild) return;

    const lines = [
      "Umuzi Dreamscape evidence bundle",
      `Creator: ${data.user?.name ?? "quantum_cupcake"}`,
      `Build: ${selectedBuild.title}`,
      `Stage: ${selectedBuild.stage}`,
      `Progress: ${selectedBuild.progress}%`,
      "",
      selectedBuild.summary,
      "",
      "Evidence",
      ...activeEvidence.map((item) => {
        return `${item.completed ? "[x]" : "[ ]"} ${item.title}`;
      }),
      "",
      "Recent updates",
      ...activeMessages.slice(-5).map((message) => {
        return `- ${message.author}: ${message.text}`;
      }),
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedBuild.title.toLowerCase()}-evidence.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Evidence bundle exported");
  }

  if (!loaded) {
    return (
      <main className="dreamscape-shell loading-shell">
        <DreamMark />
        <p>Loading Umuzi Dreamscape...</p>
      </main>
    );
  }

  if (!data.user) {
    return (
      <AuthScreen
        authError={authError}
        authForm={authForm}
        busy={busy}
        onAuthChange={setAuthForm}
        onSubmit={submitAuth}
      />
    );
  }

  return (
    <main className="dreamscape-shell">
      <header className="topbar">
        <a className="brand" href="#workspace" aria-label="Umuzi Dreamscape">
          <DreamMark />
          <span>
            <strong>Umuzi</strong>
            <em>Dreamscape</em>
          </span>
        </a>

        <nav className="surface-tabs" aria-label="Primary">
          {surfaces.map(({ key, label, icon: Icon }) => (
            <button
              className={activeSurface === key ? "active" : ""}
              key={key}
              onClick={() => setActiveSurface(key)}
              type="button"
              aria-pressed={activeSurface === key}
              title={label}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="topbar-actions">
          <label className="search-pill">
            <Search size={16} />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search builds"
            />
          </label>
          <button
            className="icon-button notification"
            type="button"
            aria-label="Notifications"
            onClick={() => setStatus("3 new review signals")}
          >
            <Bell size={18} />
          </button>
          <button className="profile-chip" type="button" title={data.user.name}>
            <span>{initials(data.user.name)}</span>
            <span>{data.user.name}</span>
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label="Sign out"
            onClick={signOut}
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <section className="workspace" id="workspace">
        <aside className="phone-wrap" aria-label="Learner mobile preview">
          {selectedBuild && (
            <PhonePreview
              activeSurface={activeSurface}
              build={selectedBuild}
              messages={activeMessages}
              tasks={activeTasks}
              user={data.user}
              onSurfaceChange={setActiveSurface}
            />
          )}
        </aside>

        <section className="stage-panel" aria-live="polite">
          {activeSurface === "feed" && (
            <FeedSurface
              builds={filteredBuilds}
              busy={busy}
              newBuild={newBuild}
              selectedBuildId={selectedBuild?.id ?? ""}
              showCreateBuild={showCreateBuild}
              onChooseBuild={chooseBuild}
              onCreateBuild={createNewBuild}
              onNewBuildChange={setNewBuild}
              onToggleCreate={() => setShowCreateBuild((value) => !value)}
            />
          )}

          {activeSurface === "build" && selectedBuild && (
            <BuildSurface
              key={`${selectedBuild.id}-${selectedBuild.stage}-${selectedBuild.progress}-${selectedBuild.sandboxUrl}`}
              build={selectedBuild}
              busy={busy}
              mentorMode={mentorMode}
              sandboxRunning={sandboxRunning}
              onLike={likeSelectedBuild}
              onMentorToggle={() => {
                setMentorMode((value) => !value);
                setStatus(mentorMode ? "Learner view active" : "Mentor view active");
              }}
              onOpenChat={() => setActiveSurface("chat")}
              onProgressChange={updateBuild}
              onSandboxUrlChange={updateSandboxUrl}
              onSandboxToggle={() => {
                setSandboxRunning((value) => !value);
                setStatus(
                  sandboxRunning
                    ? "Sandbox paused for review"
                    : "Sandbox preview running",
                );
              }}
            />
          )}

          {activeSurface === "learn" && <LearnSurface />}

          {activeSurface === "chat" && selectedBuild && (
            <ChatSurface
              build={selectedBuild}
              draft={draft}
              messages={activeMessages}
              onDraftChange={setDraft}
              onPostMessage={postMessage}
              onReact={reactToMessage}
              onSticker={sendSticker}
            />
          )}

          {activeSurface === "tasks" && selectedBuild && (
            <TaskSurface
              build={selectedBuild}
              taskDraft={taskDraft}
              tasks={activeTasks}
              onAddTask={addTask}
              onMoveTask={moveTask}
              onTaskDraftChange={setTaskDraft}
            />
          )}

          {activeSurface === "evidence" && selectedBuild && (
            <EvidenceSurface
              build={selectedBuild}
              evidence={activeEvidence}
              evidenceDraft={evidenceDraft}
              mentorMode={mentorMode}
              onAddEvidence={addEvidence}
              onEvidenceDraftChange={setEvidenceDraft}
              onExport={exportEvidence}
              onToggleEvidence={toggleEvidence}
            />
          )}
        </section>

        <aside className="insight-rail">
          <div className="rail-card status-card">
            <div>
              <span className="eyebrow">Learner pulse</span>
              <h2>{data.user.name}</h2>
            </div>
            <Sparkles size={22} />
            <p>{status}</p>
            <div className="heat-row" aria-label="Current streak">
              {Array.from({ length: 7 }).map((_, index) => (
                <span
                  key={index}
                  className={index < 6 ? "hot" : ""}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <div className="rail-card sticker-card">
            <div className="rail-heading">
              <span className="eyebrow">Sticker shelf</span>
              <MessageSquare size={18} />
            </div>
            <div className="sticker-grid">
              {stickerPack.slice(0, 4).map((sticker) => (
                <button
                  className="image-sticker-button"
                  key={sticker.label}
                  type="button"
                  onClick={() => sendSticker(sticker.label)}
                >
                  <Image
                    src={sticker.image}
                    alt={sticker.label}
                    width={106}
                    height={96}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="rail-card download-card">
            <div className="download-heading">
              <div>
                <span className="eyebrow">Mobile builds</span>
                <h2>Download wrappers</h2>
              </div>
              <MonitorSmartphone size={20} />
            </div>
            <div className="download-list">
              {mobileDownloads.map((download, index) => (
                <a
                  className={index === 0 ? "download-link primary" : "download-link"}
                  href={download.href}
                  key={download.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Download size={16} />
                  <span>
                    {download.label}
                    <small>{download.detail}</small>
                  </span>
                  <em>{download.size}</em>
                </a>
              ))}
            </div>
            <a
              className="release-note"
              href={mobileReleaseUrl}
              rel="noreferrer"
              target="_blank"
            >
              View release {mobileReleaseTag}
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="rail-card desktop-card">
            <div className="download-heading">
              <div>
                <span className="eyebrow">Desktop app</span>
                <h2>Browser-based workspace</h2>
              </div>
              <Laptop size={20} />
            </div>
            <p>
              Install Umuzi Dreamscape as a standalone desktop web app, or open
              the hosted browser version in a new window.
            </p>
            <button
              className="desktop-install-button"
              type="button"
              onClick={openDesktopApp}
            >
              <Laptop size={16} />
              {desktopInstallReady ? "Install desktop app" : "Open desktop app"}
            </button>
            <a
              className="release-note"
              href={desktopWebUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open live browser app
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="rail-card metrics-card">
            <span className="eyebrow">Community context</span>
            <dl>
              <div>
                <dt>{data.stats.activeLearners.toLocaleString()}</dt>
                <dd>active learners</dd>
              </div>
              <div>
                <dt>{data.stats.completedTasks}</dt>
                <dd>completed tasks</dd>
              </div>
              <div>
                <dt>{data.stats.savedUpdates}</dt>
                <dd>saved updates</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>

      <footer className="site-footer">
        <span>Umuzi Dreamscape</span>
        <span className="footer-disclaimer">
          Independent concept demo for learning and portfolio exploration. No
          affiliation or endorsement is implied.
        </span>
        <span className="mobile-downloads" aria-label="Mobile app downloads">
          {mobileDownloads.map((download) => (
            <a
              key={download.label}
              href={download.href}
              rel="noreferrer"
              target="_blank"
            >
              <Download size={14} />
              {download.label}
            </a>
          ))}
        </span>
        <span>quantum_cupcake</span>
      </footer>
    </main>
  );
}

function AuthScreen({
  authError,
  authForm,
  busy,
  onAuthChange,
  onSubmit,
}: {
  authError: string;
  authForm: {
    mode: "login" | "register";
    name: string;
    username: string;
    password: string;
  };
  busy: boolean;
  onAuthChange: (value: {
    mode: "login" | "register";
    name: string;
    username: string;
    password: string;
  }) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <main className="dreamscape-shell auth-shell">
      <section className="auth-card">
        <div className="auth-copy">
          <DreamMark />
          <span className="eyebrow">Umuzi Dreamscape</span>
          <h1>Welcome, quantum_cupcake.</h1>
          <p>
            Sign in to save builds, write project updates, manage tasks, send
            stickers, and export portfolio evidence from your local workspace.
          </p>
          <div className="auth-highlights">
            <span>Build feed</span>
            <span>Project chat</span>
            <span>Evidence export</span>
          </div>
        </div>

        <form className="auth-form" onSubmit={onSubmit}>
          <div className="mode-switch">
            <button
              className={authForm.mode === "login" ? "active" : ""}
              type="button"
              onClick={() => onAuthChange({ ...authForm, mode: "login" })}
            >
              Login
            </button>
            <button
              className={authForm.mode === "register" ? "active" : ""}
              type="button"
              onClick={() => onAuthChange({ ...authForm, mode: "register" })}
            >
              Create account
            </button>
          </div>

          {authForm.mode === "register" && (
            <label>
              Name
              <input
                value={authForm.name}
                onChange={(event) =>
                  onAuthChange({ ...authForm, name: event.target.value })
                }
              />
            </label>
          )}

          <label>
            Username
            <input
              value={authForm.username}
              onChange={(event) =>
                onAuthChange({ ...authForm, username: event.target.value })
              }
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={authForm.password}
              onChange={(event) =>
                onAuthChange({ ...authForm, password: event.target.value })
              }
            />
          </label>

          {authError && <p className="form-error">{authError}</p>}

          <button className="wide-action" type="submit" disabled={busy}>
            {busy ? "Working..." : "Enter Dreamscape"}
            <ChevronRight size={16} />
          </button>

          <p className="demo-note">
            Demo login: quantum_cupcake / dreamscape
          </p>
        </form>
      </section>
    </main>
  );
}

function FeedSurface({
  builds,
  busy,
  newBuild,
  selectedBuildId,
  showCreateBuild,
  onChooseBuild,
  onCreateBuild,
  onNewBuildChange,
  onToggleCreate,
}: {
  builds: BuildRecord[];
  busy: boolean;
  newBuild: {
    title: string;
    role: string;
    sector: string;
    summary: string;
    tags: string;
    art: string;
    sandboxUrl: string;
  };
  selectedBuildId: string;
  showCreateBuild: boolean;
  onChooseBuild: (buildId: string) => void;
  onCreateBuild: (event: FormEvent<HTMLFormElement>) => void;
  onNewBuildChange: (value: typeof newBuild) => void;
  onToggleCreate: () => void;
}) {
  return (
    <div className="surface-grid">
      <div className="surface-copy">
        <span className="eyebrow">Home feed</span>
        <h1>Build ideas. Share progress. Grow together.</h1>
        <p>
          A working learner community space where project posts, messages,
          reactions, tasks, and evidence are saved to the local database.
        </p>
      </div>

      <div className="feed-actions">
        <button className="wide-action" type="button" onClick={onToggleCreate}>
          <Plus size={16} />
          {showCreateBuild ? "Close build form" : "Create a build"}
        </button>
      </div>

      {showCreateBuild && (
        <form className="build-form" onSubmit={onCreateBuild}>
          <label>
            Title
            <input
              value={newBuild.title}
              onChange={(event) =>
                onNewBuildChange({ ...newBuild, title: event.target.value })
              }
              placeholder="Community garden tracker"
            />
          </label>
          <label>
            Role
            <input
              value={newBuild.role}
              onChange={(event) =>
                onNewBuildChange({ ...newBuild, role: event.target.value })
              }
            />
          </label>
          <label>
            Sector
            <input
              value={newBuild.sector}
              onChange={(event) =>
                onNewBuildChange({ ...newBuild, sector: event.target.value })
              }
            />
          </label>
          <label>
            Tags
            <input
              value={newBuild.tags}
              onChange={(event) =>
                onNewBuildChange({ ...newBuild, tags: event.target.value })
              }
            />
          </label>
          <label>
            Artwork
            <select
              value={newBuild.art}
              onChange={(event) =>
                onNewBuildChange({ ...newBuild, art: event.target.value })
              }
            >
              <option value="eco">Eco</option>
              <option value="sound">Sound</option>
              <option value="kinara">Kinara</option>
              <option value="care">Care</option>
            </select>
          </label>
          <label>
            Sandbox URL
            <input
              value={newBuild.sandboxUrl}
              onChange={(event) =>
                onNewBuildChange({ ...newBuild, sandboxUrl: event.target.value })
              }
              placeholder="https://..."
            />
          </label>
          <label className="full-field">
            Summary
            <textarea
              value={newBuild.summary}
              onChange={(event) =>
                onNewBuildChange({ ...newBuild, summary: event.target.value })
              }
              placeholder="What does this build help people do?"
            />
          </label>
          <button className="wide-action full-field" type="submit" disabled={busy}>
            Save build
          </button>
        </form>
      )}

      <div className="build-list">
        {builds.map((build) => (
          <button
            className={`build-card ${
              selectedBuildId === build.id ? "selected" : ""
            }`}
            key={build.id}
            onClick={() => onChooseBuild(build.id)}
            type="button"
          >
            <BuildArtwork art={build.art} />
            <span className="build-card-body">
              <span className="build-title-row">
                <strong>{build.title}</strong>
                <ChevronRight size={18} />
              </span>
              <span>{build.summary}</span>
              <span className="progress-track">
                <span style={{ width: `${build.progress}%` }} />
              </span>
              <span className="build-meta">
                <span>{build.stage}</span>
                <span>{build.progress}%</span>
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BuildSurface({
  build,
  busy,
  mentorMode,
  sandboxRunning,
  onLike,
  onMentorToggle,
  onOpenChat,
  onProgressChange,
  onSandboxUrlChange,
  onSandboxToggle,
}: {
  build: BuildRecord;
  busy: boolean;
  mentorMode: boolean;
  sandboxRunning: boolean;
  onLike: () => void;
  onMentorToggle: () => void;
  onOpenChat: () => void;
  onProgressChange: (stage: string, progress: number) => void;
  onSandboxUrlChange: (sandboxUrl: string) => void;
  onSandboxToggle: () => void;
}) {
  const [progress, setProgress] = useState(build.progress);
  const [stage, setStage] = useState(build.stage);
  const [sandboxDraft, setSandboxDraft] = useState(build.sandboxUrl);
  const [sandboxState, setSandboxState] = useState<
    "idle" | "checking" | "ready" | "offline"
  >("idle");

  useEffect(() => {
    if (!sandboxRunning || !isHttpUrl(build.sandboxUrl)) {
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 3500);

    fetch(build.sandboxUrl, {
      cache: "no-store",
      mode: "no-cors",
      signal: controller.signal,
    })
      .then(() => setSandboxState("ready"))
      .catch(() => setSandboxState("offline"))
      .finally(() => window.clearTimeout(timeout));

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [build.sandboxUrl, sandboxRunning]);

  const canOpenProject = isHttpUrl(build.sandboxUrl);
  const activeSandboxState =
    sandboxRunning && canOpenProject && sandboxState === "idle"
      ? "checking"
      : sandboxState;
  const showSandboxFrame = sandboxRunning && activeSandboxState === "ready";

  return (
    <div className="build-detail">
      <div className="project-hero">
        <BuildArtwork art={build.art} />
        <div>
          <span className="eyebrow">{build.sector}</span>
          <h1>{build.title}</h1>
          <p>{build.summary}</p>
          <div className="tag-row">
            {build.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="project-actions">
            <button type="button" onClick={onLike}>
              <Heart size={16} />
              {build.likes}
            </button>
            <button type="button" onClick={onOpenChat}>
              <MessageCircle size={16} />
              Open chat
            </button>
          </div>
        </div>
      </div>

      <div className="progress-module">
        <div className="module-heading">
          <div>
            <span className="eyebrow">Project progress</span>
            <h2>{progress}% complete</h2>
          </div>
          <button type="button" onClick={onMentorToggle}>
            {mentorMode ? "Learner view" : "Mentor view"}
          </button>
        </div>

        <div className="progress-editor">
          <label>
            Stage
            <select
              value={stage}
              onChange={(event) => setStage(event.target.value)}
            >
              {stages.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Progress
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(event) => setProgress(Number(event.target.value))}
            />
          </label>
          <button
            className="wide-action"
            type="button"
            disabled={busy}
            onClick={() => onProgressChange(stage, progress)}
          >
            Save progress
          </button>
        </div>
      </div>

      <div className="sandbox-card">
        <div className="module-heading">
          <div>
            <span className="eyebrow">Live sandbox</span>
            <h2>
              {sandboxHeading(build.sandboxUrl, sandboxRunning, activeSandboxState)}
            </h2>
            <p className="sandbox-copy">
              {sandboxCopy(build.sandboxUrl, sandboxRunning, activeSandboxState)}
            </p>
          </div>
          <div className="sandbox-actions">
            {canOpenProject && (
              <a href={build.sandboxUrl} target="_blank" rel="noreferrer">
                <ExternalLink size={16} />
                Open live
              </a>
            )}
            <button type="button" onClick={onSandboxToggle}>
              <Play size={16} />
              {sandboxRunning ? "Pause" : "Run"}
            </button>
          </div>
        </div>

        <form
          className="sandbox-url-form"
          onSubmit={(event) => {
            event.preventDefault();
            onSandboxUrlChange(sandboxDraft);
          }}
        >
          <label>
            Project URL
            <input
              value={sandboxDraft}
              onChange={(event) => setSandboxDraft(event.target.value)}
              placeholder="https://your-live-project.app"
            />
          </label>
          <button className="wide-action" type="submit" disabled={busy}>
            Save URL
          </button>
        </form>

        <div className={`sandbox-screen ${sandboxRunning ? "running" : ""}`}>
          <div className="mini-browser-bar">
            <span />
            <span />
            <span />
            <strong title={build.sandboxUrl || "No project URL yet"}>
              {build.sandboxUrl || "Add a project URL to start the sandbox"}
            </strong>
            <em>{sandboxStateLabel(activeSandboxState)}</em>
          </div>
          {showSandboxFrame ? (
            <iframe
              key={build.sandboxUrl}
              className="sandbox-frame"
              src={build.sandboxUrl}
              title={`${build.title} sandbox`}
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
            />
          ) : (
            <div className={`mini-dashboard sandbox-${activeSandboxState}`}>
              <div>
                <strong>{build.title}</strong>
                <small>
                  {sandboxPlaceholder(
                    build.sandboxUrl,
                    sandboxRunning,
                    activeSandboxState,
                  )}
                </small>
              </div>
              <div className="mini-chart">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="task-strip">
                <span>Upload URL</span>
                <span>Peer preview</span>
                <span>Debug together</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LearnSurface() {
  return (
    <div className="learn-layout">
      <div className="surface-copy">
        <span className="eyebrow">Learning-to-earning path</span>
        <h1>Every build has a next step.</h1>
        <p>
          Dreamscape maps learner progress from assessment and skills practice
          into real projects, community support, and placement-ready evidence.
        </p>
      </div>

      <div className="roadmap">
        {roadmap.map(({ title, detail, icon: Icon, state }, index) => (
          <article className="roadmap-step" key={title}>
            <span className="step-number">{index + 1}</span>
            <Icon size={22} />
            <div>
              <h2>{title}</h2>
              <p>{detail}</p>
            </div>
            <strong>{state}</strong>
          </article>
        ))}
      </div>

      <div className="resource-grid">
        {resources.map(({ title, icon: ResourceIcon, detail }) => (
          <article className="resource-card" key={title}>
            <ResourceIcon size={22} />
            <h2>{title}</h2>
            <p>{detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ChatSurface({
  build,
  messages,
  draft,
  onDraftChange,
  onPostMessage,
  onReact,
  onSticker,
}: {
  build: BuildRecord;
  messages: MessageRecord[];
  draft: string;
  onDraftChange: (value: string) => void;
  onPostMessage: (event: FormEvent<HTMLFormElement>) => void;
  onReact: (messageId: string) => void;
  onSticker: (label: string) => void;
}) {
  return (
    <div className="chat-layout">
      <div className="chat-header">
        <div>
          <span className="eyebrow">Project chat</span>
          <h1>{build.title} Team</h1>
        </div>
        <span>{messages.length + 5} members online</span>
      </div>

      <div className="message-stack">
        {messages.map((message) => (
          <article
            className={`message ${message.tone} ${
              message.sticker ? "sticker-message" : ""
            }`}
            key={message.id}
          >
            <span className="avatar">{message.author.slice(0, 1)}</span>
            <div>
              <div className="message-meta">
                <strong>{message.author}</strong>
                <span>{relativeTime(message.createdAt)}</span>
              </div>
              {message.sticker && stickerImage(message.text) ? (
                <Image
                  className="chat-sticker"
                  src={stickerImage(message.text)}
                  alt={message.text}
                  width={160}
                  height={140}
                />
              ) : (
                <p>{message.text}</p>
              )}
              <button type="button" onClick={() => onReact(message.id)}>
                <Heart size={14} />
                {message.reactions}
              </button>
            </div>
          </article>
        ))}
      </div>

      <form className="composer" onSubmit={onPostMessage}>
        <button type="button" aria-label="Attach a file">
          <Paperclip size={18} />
        </button>
        <button type="button" aria-label="Attach a screenshot">
          <Camera size={18} />
        </button>
        <input
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder="Share an update or ask for feedback..."
        />
        <button type="submit" aria-label="Send message">
          <Send size={18} />
        </button>
      </form>

      <div className="sticker-rack" aria-label="Sticker reactions">
        {stickerPack.map((sticker) => (
          <button
            className="image-sticker-button"
            key={sticker.label}
            type="button"
            onClick={() => onSticker(sticker.label)}
          >
            <Image
              src={sticker.image}
              alt={sticker.label}
              width={106}
              height={96}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function TaskSurface({
  build,
  taskDraft,
  tasks,
  onAddTask,
  onMoveTask,
  onTaskDraftChange,
}: {
  build: BuildRecord;
  taskDraft: string;
  tasks: TaskRecord[];
  onAddTask: (event: FormEvent<HTMLFormElement>) => void;
  onMoveTask: (taskId: string, status: TaskRecord["status"]) => void;
  onTaskDraftChange: (value: string) => void;
}) {
  return (
    <div className="task-layout">
      <div className="surface-copy">
        <span className="eyebrow">Collaboration board</span>
        <h1>{build.title} tasks</h1>
        <p>
          Move tasks from idea to review to done. Every update is saved to the
          local project database.
        </p>
      </div>

      <form className="inline-form" onSubmit={onAddTask}>
        <input
          value={taskDraft}
          onChange={(event) => onTaskDraftChange(event.target.value)}
          placeholder="Add a task for the team"
        />
        <button className="wide-action" type="submit">
          Add task
        </button>
      </form>

      <div className="task-board">
        {taskStatuses.map((status) => (
          <section className="task-column" key={status}>
            <h2>{statusLabel(status)}</h2>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <article className="task-card" key={task.id}>
                  <p>{task.title}</p>
                  <div>
                    {taskStatuses.map((nextStatus) => (
                      <button
                        className={nextStatus === task.status ? "active" : ""}
                        key={nextStatus}
                        type="button"
                        onClick={() => onMoveTask(task.id, nextStatus)}
                      >
                        {statusLabel(nextStatus)}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
          </section>
        ))}
      </div>
    </div>
  );
}

function EvidenceSurface({
  build,
  evidence,
  evidenceDraft,
  mentorMode,
  onAddEvidence,
  onEvidenceDraftChange,
  onExport,
  onToggleEvidence,
}: {
  build: BuildRecord;
  evidence: EvidenceRecord[];
  evidenceDraft: string;
  mentorMode: boolean;
  onAddEvidence: (event: FormEvent<HTMLFormElement>) => void;
  onEvidenceDraftChange: (value: string) => void;
  onExport: () => void;
  onToggleEvidence: (item: EvidenceRecord) => void;
}) {
  return (
    <div className="evidence-layout">
      <div className="surface-copy">
        <span className="eyebrow">Portfolio evidence</span>
        <h1>Turn messy progress into a clear story.</h1>
        <p>
          Each update becomes a timestamped record of decisions, feedback,
          iteration, and mentor-ready proof of skill.
        </p>
      </div>

      <article className="evidence-card">
        <div className="evidence-header">
          <BuildArtwork art={build.art} />
          <div>
            <h2>{build.title} evidence bundle</h2>
            <p>
              Owner: {build.owner} | Stage: {build.stage} | Progress:{" "}
              {build.progress}%
            </p>
          </div>
        </div>

        <div className="evidence-list">
          {evidence.map((item) => (
            <button
              className={item.completed ? "complete" : ""}
              key={item.id}
              type="button"
              onClick={() => onToggleEvidence(item)}
            >
              <CheckCircle2 size={18} />
              {item.title}
            </button>
          ))}
          {mentorMode && (
            <span>
              <CheckCircle2 size={18} />
              Mentor assessment notes and placement signal
            </span>
          )}
        </div>

        <form className="inline-form" onSubmit={onAddEvidence}>
          <input
            value={evidenceDraft}
            onChange={(event) => onEvidenceDraftChange(event.target.value)}
            placeholder="Add evidence item"
          />
          <button className="wide-action" type="submit">
            Add evidence
          </button>
        </form>

        <button className="wide-action" type="button" onClick={onExport}>
          Export showcase
          <Download size={16} />
        </button>
      </article>

      <div className="outcome-grid">
        <article>
          <MonitorSmartphone size={22} />
          <h2>Real-world readiness</h2>
          <p>Attach links, acceptance criteria, retrospectives, and demos.</p>
        </article>
        <article>
          <Bookmark size={22} />
          <h2>Placement support</h2>
          <p>Help programme teams find strong stories for interviews.</p>
        </article>
        <article>
          <ExternalLink size={22} />
          <h2>Public profile</h2>
          <p>Publish selected builds as a polished learner showcase.</p>
        </article>
      </div>
    </div>
  );
}

function PhonePreview({
  activeSurface,
  build,
  messages,
  tasks,
  user,
  onSurfaceChange,
}: {
  activeSurface: SurfaceKey;
  build: BuildRecord;
  messages: MessageRecord[];
  tasks: TaskRecord[];
  user: UserRecord;
  onSurfaceChange: (key: SurfaceKey) => void;
}) {
  return (
    <div className="phone">
      <div className="phone-status">
        <span>9:41</span>
        <span className="signal">
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className="phone-head">
        <strong>Umuzi</strong>
        <span />
      </div>

      <div className="phone-content">
        {activeSurface === "chat" ? (
          <div className="phone-chat">
            <h2>{build.title} Team</h2>
            {messages.slice(-3).map((message) => (
              <p key={`${message.id}-phone`}>
                <strong>{message.author}:</strong> {message.text}
              </p>
            ))}
          </div>
        ) : activeSurface === "tasks" ? (
          <div className="phone-chat">
            <h2>Shared tasks</h2>
            {tasks.slice(0, 4).map((task) => (
              <p key={`${task.id}-phone`}>
                <strong>{statusLabel(task.status)}:</strong> {task.title}
              </p>
            ))}
          </div>
        ) : (
          <>
            <div className="phone-welcome">
              <span>Hey, {user.name}</span>
              <small>What will you build today?</small>
            </div>
            <div className="phone-stats">
              <span>
                <strong>12</strong>
                days
              </span>
              <span>
                <strong>{tasks.filter((task) => task.status === "done").length}</strong>
                tasks done
              </span>
            </div>
            <div className="phone-build">
              <BuildArtwork art={build.art} />
              <h2>{build.title}</h2>
              <p>{build.summary}</p>
              <div className="progress-track">
                <span style={{ width: `${build.progress}%` }} />
              </div>
            </div>
          </>
        )}
      </div>

      <nav className="phone-nav" aria-label="Mobile preview">
        {surfaces.slice(0, 5).map(({ key, label, icon: Icon }) => (
          <button
            className={activeSurface === key ? "active" : ""}
            key={key}
            onClick={() => onSurfaceChange(key)}
            type="button"
            aria-label={label}
          >
            <Icon size={17} />
          </button>
        ))}
        <button type="button" aria-label="New build">
          <Plus size={18} />
        </button>
      </nav>
    </div>
  );
}

function DreamMark() {
  return (
    <span className="dream-mark" aria-hidden="true">
      <span className="mark-arch" />
      <span className="mark-step one" />
      <span className="mark-step two" />
      <span className="mark-step three" />
      <span className="mark-sun" />
      <span className="mark-leaf" />
    </span>
  );
}

function BuildArtwork({ art }: { art: BuildRecord["art"] }) {
  return (
    <span className={`build-art ${art}`} aria-hidden="true">
      <span className="shape main" />
      <span className="shape sun" />
      <span className="shape leaf" />
      <span className="shape grid" />
      <span className="shape stroke" />
    </span>
  );
}

async function postJson(path: string, payload: unknown) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => ({}));
  return { ...body, ok: response.ok };
}

function initials(name: string) {
  return name
    .split(/[\s_]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function relativeTime(value: string) {
  const then = new Date(value).getTime();
  const diff = Date.now() - then;
  const minutes = Math.max(0, Math.round(diff / 60000));
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function statusLabel(status: TaskRecord["status"]) {
  if (status === "todo") return "To do";
  if (status === "doing") return "Doing";
  return "Done";
}

function stickerImage(label: string) {
  return stickerPack.find((sticker) => sticker.label === label)?.image ?? "";
}

function sandboxHeading(
  url: string,
  running: boolean,
  state: "idle" | "checking" | "ready" | "offline",
) {
  if (!isHttpUrl(url)) return "Add a live project URL";
  if (!running) return "Review paused";
  if (state === "ready") return "Preview running";
  if (state === "checking") return "Checking project";
  return "Project not reachable";
}

function sandboxCopy(
  url: string,
  running: boolean,
  state: "idle" | "checking" | "ready" | "offline",
) {
  if (!isHttpUrl(url)) {
    return "Paste a hosted app URL or a running local preview to embed it here.";
  }
  if (!running) return "Restart the sandbox when you are ready to preview changes.";
  if (state === "ready") {
    return "The project is live in the embedded preview. Use Open live if the site blocks framing.";
  }
  if (state === "checking") return "Dreamscape is checking the project before loading it.";
  return "Start the local server or save a hosted URL that the browser can reach.";
}

function sandboxPlaceholder(
  url: string,
  running: boolean,
  state: "idle" | "checking" | "ready" | "offline",
) {
  if (!isHttpUrl(url)) return "Save the live site URL for this project.";
  if (!running) return "Preview is paused so the workspace stays calm.";
  if (state === "checking") return "Checking the live URL before embedding.";
  if (state === "offline") {
    return "The saved URL is not responding from this browser right now.";
  }
  return "The preview will appear here when the project responds.";
}

function sandboxStateLabel(state: "idle" | "checking" | "ready" | "offline") {
  if (state === "checking") return "checking";
  if (state === "ready") return "live";
  if (state === "offline") return "offline";
  return "ready";
}

function isHttpUrl(value: string) {
  return /^https?:\/\//i.test(value);
}
