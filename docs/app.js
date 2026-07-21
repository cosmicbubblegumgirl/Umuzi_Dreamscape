const APP_KEY = "umuzi-dreamscape-pages-v2";
const USER_KEY = "umuzi-dreamscape-users-v2";
const SESSION_KEY = "umuzi-dreamscape-session-v2";

const stickerPack = [
  ["Keep shipping", "keep-shipping.png"],
  ["Bloom. Build. Become.", "bloom-build-become.png"],
  ["Git commit: I believed in myself", "git-commit-believed.png"],
  ["Debug your doubts", "debug-your-doubts.png"],
  ["Small commits big dreams", "small-commits-big-dreams.png"],
  ["Community builds everything", "community-builds-everything.png"],
  ["Code with kindness", "code-with-kindness.png"],
  ["Ideas become reality", "ideas-become-reality.png"],
  ["Make something wonderful", "make-something-wonderful.png"],
  ["Practice makes progress", "practice-makes-progress.png"],
  ["Dream. Develop. Deliver.", "dream-develop-deliver.png"],
  ["Growth in progress", "growth-in-progress.png"],
  ["Learning over knowing", "learning-over-knowing.png"],
  ["No bugs just features", "no-bugs-just-features.png"],
  ["Train your mind", "train-your-mind.png"],
  ["A better tomorrow through tech", "better-tomorrow-through-tech.png"],
];

const projectSeeds = [
  {
    id: "nimbus-nook",
    title: "Nimbus Nook",
    owner: "Nimbus Nandi",
    initials: "NN",
    role: "Community cloud builder",
    sector: "Peer support",
    summary: "A cozy mentor-nook where learners park blockers, collect kind nudges, and find a review buddy.",
    stage: "Prototype",
    progress: 58,
    likes: 77,
    tags: ["Support", "Mentors", "Community"],
    art: "care",
    url: "./project.html?id=nimbus-nook",
  },
  {
    id: "learn-loop",
    title: "Learn Loop",
    owner: "Loop Lwazi",
    initials: "LL",
    role: "Learning flow designer",
    sector: "Skills lab",
    summary: "A study loop that turns lessons into tiny quests, reflection notes, peer review, and next-step prompts.",
    stage: "Build",
    progress: 74,
    likes: 112,
    tags: ["Learning", "Roadmap", "Quests"],
    art: "sound",
    url: "./project.html?id=learn-loop",
  },
  {
    id: "doodle-flow",
    title: "Doodle Flow",
    owner: "Doodle Dee",
    initials: "DD",
    role: "Creative interface tinkerer",
    sector: "Digital craft",
    summary: "A playful design board for sketching app ideas, pinning screenshots, and turning doodles into build steps.",
    stage: "Testing",
    progress: 69,
    likes: 98,
    tags: ["Design", "Sketches", "Prototype"],
    art: "kinara",
    url: "./project.html?id=doodle-flow",
  },
  {
    id: "ecotrack",
    title: "EcoTrack",
    owner: "quantum_cupcake",
    initials: "QC",
    role: "Frontend developer",
    sector: "Green innovation",
    summary: "A dashboard that helps students track everyday environmental choices and compare team impact.",
    stage: "Build",
    progress: 80,
    likes: 128,
    tags: ["Web app", "Sustainability", "Charts"],
    art: "eco",
    url: "./project.html?id=ecotrack",
  },
  {
    id: "soundscape",
    title: "Soundscape",
    owner: "Pixel Palesa",
    initials: "PP",
    role: "Mobile prototyper",
    sector: "Digital craft",
    summary: "A calm mobile concept that turns study sessions into focus soundboards and tidy notes.",
    stage: "Prototype",
    progress: 65,
    likes: 84,
    tags: ["Mobile", "Audio", "UI"],
    art: "sound",
    url: "./project.html?id=soundscape",
  },
  {
    id: "kinara",
    title: "Kinara",
    owner: "Sketch Sihle",
    initials: "SS",
    role: "Product designer",
    sector: "Care economy",
    summary: "A service concept matching community care workers with verified local requests.",
    stage: "Testing",
    progress: 90,
    likes: 146,
    tags: ["Brand", "Service", "Care"],
    art: "kinara",
    url: "./project.html?id=kinara",
  },
  {
    id: "routewise",
    title: "RouteWise",
    owner: "Circuit Sizwe",
    initials: "CS",
    role: "Backend learner",
    sector: "Logistics",
    summary: "A planning board for delivery teams with shift notes, route handoffs, and issue tracking.",
    stage: "Review",
    progress: 72,
    likes: 91,
    tags: ["Node", "Maps", "Operations"],
    art: "care",
    url: "./project.html?id=routewise",
  },
  {
    id: "flowforge",
    title: "FlowForge Exam Lab",
    owner: "Byte Bongi",
    initials: "BB",
    role: "Quiz-game builder",
    sector: "Learning games",
    summary: "A lightweight exam lab that turns revision into timed flows and friendly question validation.",
    stage: "Review",
    progress: 83,
    likes: 64,
    tags: ["Game", "Assessment", "Revision"],
    art: "eco",
    url: "./project.html?id=flowforge",
  },
  {
    id: "cap-simulator",
    title: "SAP CAP Simulator",
    owner: "Circuit Sizwe",
    initials: "CS",
    role: "Enterprise app explorer",
    sector: "Digital systems",
    summary: "A hands-on simulator for practicing CAP service flows, entities, and test requests.",
    stage: "Pilot",
    progress: 61,
    likes: 52,
    tags: ["SAP", "Simulator", "Services"],
    art: "care",
    url: "./project.html?id=cap-simulator",
  },
];

const seedState = {
  builds: projectSeeds,
  messages: {
    "nimbus-nook": [
      { id: "m1", author: "Nimbus Nandi", initials: "NN", text: "The buddy cards now sort blockers by urgency. The calm ones finally stay calm.", time: "09:12" },
      { id: "m2", author: "Pixel Palesa", initials: "PP", text: "The copy feels kind. I would make the review button a little more direct.", time: "09:18" },
      { id: "m3", author: "quantum_cupcake", initials: "QC", text: "Good note. I added it to today’s task list.", time: "09:26", mine: true },
    ],
    "learn-loop": [
      { id: "m4", author: "Loop Lwazi", initials: "LL", text: "Tiny quest streaks are live. Next up is the reflection prompt.", time: "10:04" },
      { id: "m5", author: "Byte Bongi", initials: "BB", text: "The progress loop reads clearly on mobile now.", time: "10:17" },
    ],
    "doodle-flow": [
      { id: "m6", author: "Doodle Dee", initials: "DD", text: "Fresh sketch drop. The storyboard wall finally feels less spaghetti and more flow.", time: "11:02" },
    ],
  },
  tasks: [
    { id: "t1", buildId: "nimbus-nook", title: "Test the mentor matching empty state", status: "todo" },
    { id: "t2", buildId: "learn-loop", title: "Write the reflection prompt for quest three", status: "todo" },
    { id: "t3", buildId: "doodle-flow", title: "Tighten keyboard controls on the canvas", status: "doing" },
    { id: "t4", buildId: "ecotrack", title: "Check chart labels on a small screen", status: "doing" },
    { id: "t5", buildId: "nimbus-nook", title: "Invite two learners to the review room", status: "done" },
    { id: "t6", buildId: "learn-loop", title: "Ship the first five lesson quests", status: "done" },
    { id: "t7", buildId: "kinara", title: "Document the care request journey", status: "done" },
  ],
  evidence: [
    { id: "e1", buildId: "ecotrack", title: "Responsive analytics dashboard", detail: "Shows information design, component states, and responsive chart decisions.", status: "Ready" },
    { id: "e2", buildId: "nimbus-nook", title: "Peer support prototype", detail: "Demonstrates user research translated into calm, practical support flows.", status: "In review" },
    { id: "e3", buildId: "learn-loop", title: "Learning quest system", detail: "Evidence of journey mapping, progression design, and learner feedback.", status: "Ready" },
    { id: "e4", buildId: "doodle-flow", title: "Interactive storyboard board", detail: "Captures keyboard interaction, rapid prototyping, and visual hierarchy.", status: "Draft" },
    { id: "e5", buildId: "kinara", title: "Care service blueprint", detail: "Documents safeguards, handoffs, and the end-to-end service model.", status: "Ready" },
    { id: "e6", buildId: "routewise", title: "Operations handoff workflow", detail: "Shows backend thinking, issue states, and team workflow design.", status: "In review" },
  ],
  activity: [
    { type: "milestone", initials: "LL", author: "Loop Lwazi", text: "moved Learn Loop into the build stage", time: "18 min ago" },
    { type: "feedback", initials: "PP", author: "Pixel Palesa", text: "left a useful mobile note on Nimbus Nook", time: "36 min ago" },
    { type: "milestone", initials: "DD", author: "Doodle Dee", text: "published a new Doodle Flow preview", time: "1 hr ago" },
    { type: "feedback", initials: "BB", author: "Byte Bongi", text: "shared testing notes on EcoTrack charts", time: "2 hrs ago" },
  ],
};

let appState = loadState();
let activeUser = null;
let activeView = "home";
let activeBuildFilter = "all";
let searchTerm = "";
let activeChatId = "nimbus-nook";
let activeSandboxId = "nimbus-nook";
let authMode = "signin";
let installPrompt = null;
let toastTimer = null;

const byId = (id) => document.getElementById(id);
const authScreen = byId("auth-screen");
const appShell = byId("app-shell");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(APP_KEY));
    if (saved?.builds && saved?.tasks && saved?.messages) return saved;
  } catch {
    // A clean seed is more useful than a broken workspace.
  }
  return clone(seedState);
}

function saveState() {
  localStorage.setItem(APP_KEY, JSON.stringify(appState));
}

function loadUsers() {
  const demoUser = { username: "quantum_cupcake", password: "dreamscape", displayName: "quantum_cupcake" };
  try {
    const users = JSON.parse(localStorage.getItem(USER_KEY));
    if (Array.isArray(users) && users.length) {
      if (!users.some((user) => user.username === demoUser.username)) users.unshift(demoUser);
      return users;
    }
  } catch {
    // Fall through to the built-in demo profile.
  }
  return [demoUser];
}

function saveUsers(users) {
  localStorage.setItem(USER_KEY, JSON.stringify(users));
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function initials(name = "") {
  return name
    .split(/[\s_-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "UD";
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function showToast(message) {
  const toast = byId("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function setAuthMode(mode) {
  authMode = mode;
  document.querySelectorAll("[data-auth-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.authMode === mode);
    button.setAttribute("aria-selected", String(button.dataset.authMode === mode));
  });
  document.querySelectorAll(".register-field").forEach((field) => {
    field.hidden = mode !== "register";
  });
  const password = document.querySelector('#auth-form [name="password"]');
  password.autocomplete = mode === "register" ? "new-password" : "current-password";
  byId("auth-error").textContent = "";
}

function signIn(user) {
  activeUser = user;
  sessionStorage.setItem(SESSION_KEY, user.username);
  authScreen.hidden = true;
  appShell.hidden = false;
  byId("profile-name").textContent = user.displayName;
  byId("welcome-name").textContent = user.displayName;
  byId("profile-avatar").textContent = initials(user.displayName);
  renderAll();
  navigate(location.hash.slice(1) || "home", false);
}

function signOut() {
  sessionStorage.removeItem(SESSION_KEY);
  activeUser = null;
  appShell.hidden = true;
  authScreen.hidden = false;
  byId("auth-form").reset();
  setAuthMode("signin");
}

function handleAuth(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const username = String(formData.get("username") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const displayName = String(formData.get("displayName") || "").trim();
  const error = byId("auth-error");
  const users = loadUsers();

  if (!username || !password) {
    error.textContent = "Add your username and password to continue.";
    return;
  }

  if (authMode === "register") {
    if (!displayName) {
      error.textContent = "Add a display name for your learner profile.";
      return;
    }
    if (password.length < 6) {
      error.textContent = "Use at least six characters for the password.";
      return;
    }
    if (users.some((user) => user.username === username)) {
      error.textContent = "That username already exists in this browser.";
      return;
    }
    const user = { username, password, displayName };
    users.push(user);
    saveUsers(users);
    signIn(user);
    showToast("Your learner profile is ready.");
    return;
  }

  const user = users.find((candidate) => candidate.username === username && candidate.password === password);
  if (!user) {
    error.textContent = "Those details do not match a profile in this browser.";
    return;
  }
  signIn(user);
}

function navigate(view, updateHash = true) {
  const validView = document.querySelector(`[data-view="${CSS.escape(view)}"]`) ? view : "home";
  activeView = validView;
  document.querySelectorAll(".view").forEach((section) => {
    const active = section.dataset.view === validView;
    section.hidden = !active;
    section.classList.toggle("active", active);
  });
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.nav === validView);
  });
  byId("sidebar").classList.remove("open");
  if (updateHash) history.replaceState(null, "", `#${validView}`);
  if (validView === "sandbox") renderSandbox();
  if (validView === "chat") requestAnimationFrame(scrollMessages);
  byId("main-content").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAll() {
  renderMetrics();
  renderFocus();
  renderActivity();
  renderBuilds();
  renderSandboxProjects();
  renderRooms();
  renderMessages();
  renderStickerTray();
  renderTaskProjectOptions();
  renderTasks();
  renderEvidence();
}

function renderMetrics() {
  byId("metric-builds").textContent = appState.builds.length;
  byId("metric-tasks").textContent = appState.tasks.filter((task) => task.status === "done").length;
  byId("metric-feedback").textContent = Object.values(appState.messages).flat().length + 26;
  byId("metric-evidence").textContent = appState.evidence.length;
}

function findBuild(id) {
  return appState.builds.find((build) => build.id === id) || appState.builds[0];
}

function tagMarkup(tags) {
  return tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
}

function renderFocus() {
  const build = appState.builds.find((item) => item.owner === "quantum_cupcake") || appState.builds[0];
  byId("focus-build").innerHTML = `
    <article class="focus-card">
      <div>
        <span class="stage-badge">${escapeHtml(build.stage)} · ${escapeHtml(build.sector)}</span>
        <h3>${escapeHtml(build.title)}</h3>
        <p>${escapeHtml(build.summary)}</p>
        <div class="focus-meta">${tagMarkup(build.tags)}</div>
        <button class="button button-secondary" type="button" data-open-sandbox="${escapeHtml(build.id)}">Open live preview ↗</button>
      </div>
      <div class="progress-panel">
        <span class="progress-ring" style="--progress:${build.progress}" data-progress="${build.progress}"></span>
        <small>Build progress</small>
      </div>
    </article>`;
}

function renderActivity(filter = "all") {
  const entries = appState.activity.filter((item) => filter === "all" || item.type === filter);
  byId("activity-list").innerHTML = entries.map((item) => `
    <article class="activity-item">
      <span class="avatar">${escapeHtml(item.initials)}</span>
      <div><strong>${escapeHtml(item.author)}</strong><p>${escapeHtml(item.text)}</p></div>
      <time>${escapeHtml(item.time)}</time>
    </article>`).join("");
}

function filteredBuilds() {
  const term = searchTerm.toLowerCase();
  return appState.builds.filter((build) => {
    const matchesStage = activeBuildFilter === "all" || build.stage === activeBuildFilter;
    const haystack = [build.title, build.owner, build.sector, build.summary, ...build.tags].join(" ").toLowerCase();
    return matchesStage && (!term || haystack.includes(term));
  });
}

function renderBuilds() {
  const builds = filteredBuilds();
  byId("build-result-count").textContent = `${builds.length} project${builds.length === 1 ? "" : "s"}`;
  byId("build-grid").innerHTML = builds.length ? builds.map((build) => `
    <article class="build-card">
      <div class="build-art ${escapeHtml(build.art)}">
        <span>${escapeHtml(build.stage)}</span>
        <span>${escapeHtml(build.sector)}</span>
      </div>
      <div class="build-card-body">
        <h2>${escapeHtml(build.title)}</h2>
        <span class="build-owner">by ${escapeHtml(build.owner)}</span>
        <p class="build-summary">${escapeHtml(build.summary)}</p>
        <div class="tag-row">${tagMarkup(build.tags)}</div>
        <div class="build-card-footer">
          <span class="mini-progress"><i style="--progress:${build.progress}%"></i>${build.progress}%</span>
          <button type="button" data-like-build="${escapeHtml(build.id)}">♥ ${build.likes}</button>
          <button type="button" data-open-sandbox="${escapeHtml(build.id)}">Preview ↗</button>
        </div>
      </div>
    </article>`).join("") : `<p>No builds match that search yet.</p>`;
}

function renderSandboxProjects() {
  const featured = appState.builds.slice(0, 6);
  byId("sandbox-projects").innerHTML = featured.map((build) => `
    <button class="${build.id === activeSandboxId ? "active" : ""}" type="button" data-sandbox-project="${escapeHtml(build.id)}">
      <span>${escapeHtml(build.initials || initials(build.title))}</span>
      <span><strong>${escapeHtml(build.title)}</strong><small>${escapeHtml(build.stage)} · ${build.progress}%</small></span>
    </button>`).join("") + `
    <button class="add-url-button" type="button" data-focus-address>＋ Paste another URL</button>`;
}

function validProjectUrl(value) {
  try {
    const url = new URL(value, location.href);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    return url.href;
  } catch {
    return null;
  }
}

function openSandbox(buildId) {
  const build = findBuild(buildId);
  activeSandboxId = build.id;
  renderSandboxProjects();
  setSandboxUrl(build.url || `./project.html?id=${encodeURIComponent(build.id)}`, build.title);
  navigate("sandbox");
}

function setSandboxUrl(value, title = "Custom project") {
  const resolved = validProjectUrl(value);
  if (!resolved) {
    showToast("Use a complete http or https project URL.");
    return;
  }
  const frame = byId("sandbox-frame");
  const loading = byId("sandbox-loading");
  loading.hidden = false;
  frame.src = resolved;
  byId("sandbox-url").value = resolved;
  byId("sandbox-open").href = resolved;
  byId("sandbox-title").textContent = title;
}

function renderSandbox() {
  const build = findBuild(activeSandboxId);
  const frame = byId("sandbox-frame");
  if (!frame.src) setSandboxUrl(build.url || `./project.html?id=${encodeURIComponent(build.id)}`, build.title);
}

function roomBuilds() {
  return ["nimbus-nook", "learn-loop", "doodle-flow", "ecotrack"].map(findBuild).filter(Boolean);
}

function renderRooms() {
  byId("room-list").innerHTML = roomBuilds().map((build, index) => {
    const lastMessage = (appState.messages[build.id] || []).at(-1);
    return `<button class="room-button ${build.id === activeChatId ? "active" : ""}" type="button" data-chat-room="${escapeHtml(build.id)}">
      <span class="avatar">${escapeHtml(build.initials || initials(build.title))}</span>
      <span><strong>${escapeHtml(build.title)}</strong><small>${escapeHtml(lastMessage?.text || "Start the project conversation")}</small></span>
      ${index < 3 ? '<span class="unread-dot" aria-label="Unread"></span>' : ""}
    </button>`;
  }).join("");
}

function renderMessages() {
  const build = findBuild(activeChatId);
  const messages = appState.messages[build.id] || [];
  byId("chat-title").textContent = build.title;
  byId("chat-avatar").textContent = build.initials || initials(build.title);
  byId("message-list").innerHTML = messages.map((message) => `
    <article class="message ${message.mine ? "mine" : ""}">
      <span class="avatar">${escapeHtml(message.initials || initials(message.author))}</span>
      <div class="message-bubble">
        <strong>${escapeHtml(message.author)}</strong>
        ${message.sticker ? `<img class="message-sticker" src="./stickers/${escapeHtml(message.sticker)}" alt="${escapeHtml(message.text)}" />` : `<p>${escapeHtml(message.text)}</p>`}
        <time>${escapeHtml(message.time)}</time>
      </div>
    </article>`).join("");
  scrollMessages();
}

function scrollMessages() {
  const list = byId("message-list");
  list.scrollTop = list.scrollHeight;
}

function renderStickerTray() {
  byId("sticker-tray").innerHTML = stickerPack.map(([label, image]) => `
    <button class="sticker-button" type="button" data-send-sticker="${escapeHtml(image)}" data-sticker-label="${escapeHtml(label)}" title="${escapeHtml(label)}">
      <img src="./stickers/${escapeHtml(image)}" alt="${escapeHtml(label)}" />
    </button>`).join("");
}

function addMessage(text, sticker = "") {
  if (!text.trim()) return;
  const now = new Date();
  const message = {
    id: uid("message"),
    author: activeUser.displayName,
    initials: initials(activeUser.displayName),
    text: text.trim(),
    time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    mine: true,
    ...(sticker ? { sticker } : {}),
  };
  appState.messages[activeChatId] = [...(appState.messages[activeChatId] || []), message];
  saveState();
  renderRooms();
  renderMessages();
}

function renderTaskProjectOptions() {
  byId("task-project").innerHTML = appState.builds.map((build) => `<option value="${escapeHtml(build.id)}">${escapeHtml(build.title)}</option>`).join("");
}

function renderTasks() {
  const columns = [
    ["todo", "To do"],
    ["doing", "In progress"],
    ["done", "Done"],
  ];
  byId("task-board").innerHTML = columns.map(([status, label]) => {
    const tasks = appState.tasks.filter((task) => task.status === status);
    return `<section class="task-column" data-task-column="${status}">
      <header><strong>${label}</strong><span>${tasks.length}</span></header>
      <div class="task-list">${tasks.map((task) => {
        const build = findBuild(task.buildId);
        return `<article class="task-card">
          <p>${escapeHtml(task.title)}</p>
          <small>${escapeHtml(build.title)}</small>
          <div class="task-actions">
            ${status !== "todo" ? `<button type="button" data-move-task="${escapeHtml(task.id)}" data-direction="back" aria-label="Move task back">←</button>` : ""}
            ${status !== "done" ? `<button type="button" data-move-task="${escapeHtml(task.id)}" data-direction="next" aria-label="Move task forward">→</button>` : ""}
            <button type="button" data-delete-task="${escapeHtml(task.id)}" aria-label="Delete task">×</button>
          </div>
        </article>`;
      }).join("")}</div>
    </section>`;
  }).join("");
  renderMetrics();
}

function moveTask(id, direction) {
  const order = ["todo", "doing", "done"];
  const task = appState.tasks.find((item) => item.id === id);
  if (!task) return;
  const current = order.indexOf(task.status);
  task.status = order[Math.max(0, Math.min(order.length - 1, current + (direction === "next" ? 1 : -1)))];
  saveState();
  renderTasks();
}

function renderEvidence() {
  byId("evidence-grid").innerHTML = appState.evidence.map((item) => {
    const build = findBuild(item.buildId);
    return `<article class="evidence-card">
      <span>◇</span>
      <div><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.detail)}</p></div>
      <div><span class="tag">${escapeHtml(build.title)}</span> <span class="evidence-status">${escapeHtml(item.status)}</span></div>
    </article>`;
  }).join("");
}

function exportEvidence() {
  const lines = [
    "UMUZI DREAMSCAPE — PORTFOLIO EVIDENCE",
    `Learner: ${activeUser.displayName}`,
    `Exported: ${new Date().toLocaleDateString()}`,
    "",
    ...appState.evidence.flatMap((item, index) => {
      const build = findBuild(item.buildId);
      return [`${index + 1}. ${item.title}`, `Project: ${build.title}`, `Status: ${item.status}`, item.detail, ""];
    }),
    "Independent concept demo for learning and portfolio exploration.",
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "umuzi-dreamscape-evidence.txt";
  link.click();
  URL.revokeObjectURL(link.href);
  showToast("Evidence summary downloaded.");
}

function createBuild(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const title = String(data.get("title") || "").trim();
  const summary = String(data.get("summary") || "").trim();
  if (!title || !summary) return;
  const id = uid("build");
  const build = {
    id,
    title,
    owner: activeUser.displayName,
    initials: initials(activeUser.displayName),
    role: "Learner builder",
    sector: String(data.get("sector") || "Digital project").trim() || "Digital project",
    summary,
    stage: String(data.get("stage") || "Prototype"),
    progress: 12,
    likes: 0,
    tags: ["New build", "Learner project"],
    art: ["eco", "sound", "kinara", "care"][appState.builds.length % 4],
    url: String(data.get("url") || "").trim() || `./project.html?id=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}`,
  };
  appState.builds.unshift(build);
  appState.messages[id] = [];
  appState.activity.unshift({ type: "milestone", initials: build.initials, author: build.owner, text: `started a new build called ${build.title}`, time: "just now" });
  saveState();
  form.reset();
  byId("build-dialog").close();
  activeBuildFilter = "all";
  searchTerm = "";
  byId("global-search").value = "";
  renderAll();
  navigate("builds");
  showToast(`${build.title} is ready for its first update.`);
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-nav]");
  if (nav) {
    event.preventDefault();
    navigate(nav.dataset.nav);
    return;
  }

  const sandboxLink = event.target.closest("[data-open-sandbox]");
  if (sandboxLink) {
    openSandbox(sandboxLink.dataset.openSandbox);
    return;
  }

  const sandboxProject = event.target.closest("[data-sandbox-project]");
  if (sandboxProject) {
    const build = findBuild(sandboxProject.dataset.sandboxProject);
    activeSandboxId = build.id;
    renderSandboxProjects();
    setSandboxUrl(build.url, build.title);
    return;
  }

  if (event.target.closest("[data-focus-address]")) {
    byId("sandbox-url").focus();
    byId("sandbox-url").select();
    return;
  }

  const like = event.target.closest("[data-like-build]");
  if (like) {
    const build = findBuild(like.dataset.likeBuild);
    build.likes += 1;
    saveState();
    renderBuilds();
    showToast(`You cheered ${build.title}.`);
    return;
  }

  const chatRoom = event.target.closest("[data-chat-room]");
  if (chatRoom) {
    activeChatId = chatRoom.dataset.chatRoom;
    renderRooms();
    renderMessages();
    return;
  }

  const sticker = event.target.closest("[data-send-sticker]");
  if (sticker) {
    addMessage(sticker.dataset.stickerLabel, sticker.dataset.sendSticker);
    byId("sticker-tray").hidden = true;
    showToast("Sticker sent to the project room.");
    return;
  }

  const move = event.target.closest("[data-move-task]");
  if (move) {
    moveTask(move.dataset.moveTask, move.dataset.direction);
    return;
  }

  const remove = event.target.closest("[data-delete-task]");
  if (remove) {
    appState.tasks = appState.tasks.filter((task) => task.id !== remove.dataset.deleteTask);
    saveState();
    renderTasks();
    showToast("Task removed.");
    return;
  }

  const feedFilter = event.target.closest("[data-feed-filter]");
  if (feedFilter) {
    document.querySelectorAll("[data-feed-filter]").forEach((button) => button.classList.toggle("active", button === feedFilter));
    renderActivity(feedFilter.dataset.feedFilter);
    return;
  }

  const buildFilter = event.target.closest("[data-build-filter]");
  if (buildFilter) {
    activeBuildFilter = buildFilter.dataset.buildFilter;
    document.querySelectorAll("[data-build-filter]").forEach((button) => button.classList.toggle("active", button === buildFilter));
    renderBuilds();
    return;
  }

  if (event.target.closest("[data-open-build-modal]")) {
    byId("build-dialog").showModal();
  }
});

document.querySelectorAll("[data-auth-mode]").forEach((button) => button.addEventListener("click", () => setAuthMode(button.dataset.authMode)));
byId("auth-form").addEventListener("submit", handleAuth);
byId("demo-login").addEventListener("click", () => signIn(loadUsers().find((user) => user.username === "quantum_cupcake")));
byId("sign-out").addEventListener("click", signOut);
byId("mobile-menu").addEventListener("click", () => byId("sidebar").classList.toggle("open"));
byId("build-form").addEventListener("submit", createBuild);
byId("close-build-dialog").addEventListener("click", () => byId("build-dialog").close());
byId("export-evidence").addEventListener("click", exportEvidence);

byId("global-search").addEventListener("input", (event) => {
  searchTerm = event.target.value.trim();
  renderBuilds();
  if (searchTerm && activeView !== "builds") navigate("builds");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    byId("global-search").focus();
  }
  if (event.key === "Escape") byId("sidebar").classList.remove("open");
});

byId("sandbox-frame").addEventListener("load", () => {
  byId("sandbox-loading").hidden = true;
});

byId("sandbox-url").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    activeSandboxId = "";
    renderSandboxProjects();
    setSandboxUrl(event.currentTarget.value);
  }
});

byId("sandbox-reload").addEventListener("click", () => {
  const frame = byId("sandbox-frame");
  byId("sandbox-loading").hidden = false;
  frame.src = frame.src;
});

byId("sticker-toggle").addEventListener("click", () => {
  const tray = byId("sticker-tray");
  tray.hidden = !tray.hidden;
});

byId("chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = byId("chat-input");
  addMessage(input.value);
  input.value = "";
});

byId("task-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = byId("task-input");
  appState.tasks.unshift({ id: uid("task"), buildId: byId("task-project").value, title: input.value.trim(), status: "todo" });
  input.value = "";
  saveState();
  renderTasks();
  showToast("Task added to the board.");
});

window.addEventListener("hashchange", () => {
  if (activeUser) navigate(location.hash.slice(1) || "home", false);
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
});

byId("install-app").addEventListener("click", async () => {
  if (installPrompt) {
    await installPrompt.prompt();
    installPrompt = null;
    return;
  }
  showToast("Use your browser menu and choose Install app or Add to home screen.");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => undefined));
}

const savedUsername = sessionStorage.getItem(SESSION_KEY);
const savedUser = loadUsers().find((user) => user.username === savedUsername);
if (savedUser) signIn(savedUser);
