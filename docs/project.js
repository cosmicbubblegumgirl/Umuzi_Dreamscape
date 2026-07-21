const params = new URLSearchParams(location.search);
const projectId = params.get("id") || "nimbus-nook";
const customTitle = params.get("title");
const PROJECT_KEY = `dreamscape-project-${projectId}`;

const projects = {
  "nimbus-nook": {
    title: "Nimbus Nook",
    stage: "Prototype",
    headline: "A softer place to get unstuck.",
    summary: "Learners can name a blocker, signal how it feels, and find a review buddy without turning support into another admin queue.",
    metric: "11 min",
    metricLabel: "average time to first nudge",
    kind: "nimbus",
  },
  "learn-loop": {
    title: "Learn Loop",
    stage: "Build",
    headline: "Turn lessons into loops that stick.",
    summary: "A compact learning journey built from small quests, reflection moments, peer review, and a clear next step.",
    metric: "4 / 6",
    metricLabel: "quests completed this week",
    kind: "loop",
  },
  "doodle-flow": {
    title: "Doodle Flow",
    stage: "Testing",
    headline: "Loose ideas, useful next steps.",
    summary: "A movable sketch wall for collecting fragments, arranging a story, and turning rough thinking into a build sequence.",
    metric: "8 notes",
    metricLabel: "on today’s canvas",
    kind: "doodle",
  },
  ecotrack: {
    title: "EcoTrack",
    stage: "Build",
    headline: "Small choices, visible impact.",
    summary: "A clear view of everyday environmental actions, designed for student teams who want to compare momentum without shame or noise.",
    metric: "18.4 kg",
    metricLabel: "estimated CO₂ saved this week",
    kind: "eco",
  },
  soundscape: { title: "Soundscape", stage: "Prototype", headline: "Focus has a sound.", summary: "Build a calm study mix, add a note, and leave each session with one useful reflection.", metric: "42 min", metricLabel: "focus time today", kind: "generic" },
  kinara: { title: "Kinara", stage: "Testing", headline: "Care requests, handled with care.", summary: "A verified local matching flow for community care workers and the people who need practical support.", metric: "24", metricLabel: "verified care partners", kind: "generic" },
  routewise: { title: "RouteWise", stage: "Review", headline: "Every route gets a clean handoff.", summary: "Shift notes, delivery exceptions, and next actions stay together so teams can move without losing context.", metric: "93%", metricLabel: "handoffs completed", kind: "generic" },
  flowforge: { title: "FlowForge Exam Lab", stage: "Review", headline: "Revision that feels like momentum.", summary: "Short timed rounds, useful validation, and a calm way to see what needs another pass.", metric: "7", metricLabel: "practice flows ready", kind: "generic" },
  "cap-simulator": { title: "SAP CAP Simulator", stage: "Pilot", headline: "Practice service flows in one focused lab.", summary: "Explore entities, requests, and service behaviour through a lightweight guided simulator.", metric: "12", metricLabel: "service exercises", kind: "generic" },
};

const project = projects[projectId] || {
  title: customTitle || "Learner Project",
  stage: "Prototype",
  headline: customTitle ? `${customTitle} is taking shape.` : "A learner build in progress.",
  summary: "This new project has a live preview. The builder can replace this page with their own public URL at any time.",
  metric: "12%",
  metricLabel: "first build milestone",
  kind: "generic",
};

let saved = loadProjectState();
let toastTimer;

function loadProjectState() {
  try {
    return JSON.parse(localStorage.getItem(PROJECT_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProjectState() {
  localStorage.setItem(PROJECT_KEY, JSON.stringify(saved));
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  const toast = document.getElementById("project-toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function hero() {
  return `<section class="project-hero">
    <div><h1>${escapeHtml(project.headline)}</h1><p>${escapeHtml(project.summary)}</p></div>
    <div class="hero-metric"><strong>${escapeHtml(project.metric)}</strong><small>${escapeHtml(project.metricLabel)}</small></div>
  </section>`;
}

function renderNimbus() {
  const blockers = saved.blockers || [
    { id: "b1", title: "The empty state feels too cold", detail: "Need a warmer invitation before learners post their first blocker.", mood: "Thinking", resolved: false },
    { id: "b2", title: "Buddy matches need context", detail: "Show skills and current capacity before someone accepts a review.", mood: "Needs eyes", resolved: false },
    { id: "b3", title: "Mobile composer jumps", detail: "The keyboard pushes the message field off screen on small devices.", mood: "In motion", resolved: true },
  ];
  saved.blockers = blockers;
  const cardMarkup = blockers.map((blocker) => `<article class="blocker-card ${blocker.resolved ? "resolved" : ""}">
    <span class="card-kicker">${blocker.resolved ? "Cleared" : "Open blocker"}</span>
    <h3>${escapeHtml(blocker.title)}</h3><p>${escapeHtml(blocker.detail)}</p>
    <footer><span class="mood">${escapeHtml(blocker.mood)}</span><button type="button" data-toggle-blocker="${blocker.id}">${blocker.resolved ? "Reopen" : "Mark clear"}</button></footer>
  </article>`).join("");
  document.getElementById("project-app").innerHTML = `${hero()}
    <section><div class="section-heading"><div><h2>Blocker garden</h2><p>Make the stuck part visible, then invite one useful nudge.</p></div><button class="primary" type="button" data-new-blocker>＋ Park a blocker</button></div>
    <div class="nook-grid">${cardMarkup}</div>
    <div class="buddy-strip"><strong>Review buddies online:</strong><span class="buddy"><i></i> Pixel Palesa</span><span class="buddy"><i></i> Loop Lwazi</span><span class="buddy"><i></i> Byte Bongi</span></div></section>`;
}

function renderLoop() {
  const quests = saved.quests || [
    { id: "q1", title: "Map the learner’s first five minutes", detail: "Notice every question, pause, and confidence wobble.", done: true },
    { id: "q2", title: "Build the smallest working loop", detail: "Lesson, tiny action, reflection, and a clear next step.", done: true },
    { id: "q3", title: "Ask one peer to try it cold", detail: "No walkthrough. Watch where the language stops helping.", done: false },
    { id: "q4", title: "Rewrite one confusing moment", detail: "Keep the change small enough to test today.", done: false },
    { id: "q5", title: "Share the learning note", detail: "What changed, why it changed, and what remains uncertain.", done: false },
    { id: "q6", title: "Choose tomorrow’s loop", detail: "Leave yourself a kind and specific starting point.", done: false },
  ];
  saved.quests = quests;
  const done = quests.filter((quest) => quest.done).length;
  document.getElementById("project-app").innerHTML = `${hero()}
    <section><div class="section-heading"><div><h2>This week’s learning loop</h2><p>${done} of ${quests.length} quests complete. Click a card to move the loop.</p></div><strong>${Math.round((done / quests.length) * 100)}%</strong></div>
    <div class="quest-progress"><span style="width:${(done / quests.length) * 100}%"></span></div>
    <div class="quest-grid">${quests.map((quest, index) => `<article class="quest-card ${quest.done ? "done" : ""}"><span class="quest-number">${quest.done ? "✓" : index + 1}</span><h3>${escapeHtml(quest.title)}</h3><p>${escapeHtml(quest.detail)}</p><footer><span class="mood">${quest.done ? "Complete" : "Ready"}</span><button type="button" data-toggle-quest="${quest.id}">${quest.done ? "Undo" : "Complete"}</button></footer></article>`).join("")}</div></section>`;
}

function renderDoodle() {
  const notes = saved.notes || [
    { id: "n1", text: "What if project feedback felt more like passing a sketchbook?", x: 6, y: 8 },
    { id: "n2", text: "Keep the sandbox visible while comments arrive.", x: 37, y: 16 },
    { id: "n3", text: "Stickers can carry tone when words feel too formal.", x: 67, y: 7 },
    { id: "n4", text: "Evidence should grow from real project moments.", x: 20, y: 49 },
    { id: "n5", text: "Try a calm mobile bottom navigation.", x: 57, y: 56 },
  ];
  saved.notes = notes;
  document.getElementById("project-app").innerHTML = `${hero()}
    <section><div class="section-heading"><div><h2>Storyboard wall</h2><p>Drag notes into a sequence or add another thought.</p></div></div>
    <div class="doodle-toolbar"><button class="primary" type="button" data-new-note>＋ New note</button><button type="button" data-tidy-notes>Tidy board</button><button type="button" data-clear-notes>Clear</button></div>
    <div class="doodle-board" id="doodle-board">${notes.map((note, index) => `<article class="doodle-note" data-note-id="${note.id}" style="left:${note.x}%;top:${note.y}%"><p>${escapeHtml(note.text)}</p><small>Idea ${index + 1} · drag me</small></article>`).join("")}</div></section>`;
  bindDoodleDrag();
}

function renderEco() {
  const values = saved.values || [42, 58, 52, 74, 68, 86, 78];
  document.getElementById("project-app").innerHTML = `${hero()}
    <section class="eco-summary"><article class="metric-card"><span class="card-kicker">Team streak</span><strong>12 days</strong><small>Three learners checked in today</small></article><article class="metric-card"><span class="card-kicker">Top habit</span><strong>Refill</strong><small>64 single-use bottles avoided</small></article></section>
    <section class="chart-panel"><div class="section-heading"><div><h2>Team impact pulse</h2><p>Select a day to log one more positive action.</p></div><button type="button" data-reset-chart>Reset week</button></div><div class="bar-chart">${values.map((value, index) => `<button type="button" data-chart-day="${index}" style="--height:${value}%" aria-label="Add action to day ${index + 1}"><span>${["M", "T", "W", "T", "F", "S", "S"][index]}</span></button>`).join("")}</div></section>`;
}

function renderGeneric() {
  const steps = saved.steps || [false, false, false];
  saved.steps = steps;
  const titles = ["Open the working flow", "Test one real scenario", "Write the next learning note"];
  document.getElementById("project-app").innerHTML = `${hero()}
    <section><div class="section-heading"><div><h2>Current build path</h2><p>A compact working preview for this learner project.</p></div></div>
    <div class="generic-grid">${titles.map((title, index) => `<article class="generic-card"><span class="card-kicker">Step ${index + 1}</span><h3>${escapeHtml(title)}</h3><p>${index === 0 ? "Explore the central interaction and notice where the flow feels clear." : index === 1 ? "Use realistic details and record any friction worth fixing." : "Capture the decision, the evidence, and the next question."}</p><button class="${steps[index] ? "" : "primary"}" type="button" data-toggle-step="${index}">${steps[index] ? "Completed ✓" : "Mark complete"}</button></article>`).join("")}</div></section>`;
}

function render() {
  document.title = `${project.title} · Umuzi Dreamscape`;
  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-stage").textContent = project.stage;
  if (project.kind === "nimbus") renderNimbus();
  else if (project.kind === "loop") renderLoop();
  else if (project.kind === "doodle") renderDoodle();
  else if (project.kind === "eco") renderEco();
  else renderGeneric();
}

function openModal(title, placeholder, onSave) {
  const layer = document.createElement("div");
  layer.className = "modal-layer";
  layer.innerHTML = `<form class="modal-card"><h2>${escapeHtml(title)}</h2><textarea required placeholder="${escapeHtml(placeholder)}"></textarea><div class="modal-actions"><button type="button" data-close-modal>Cancel</button><button class="primary" type="submit">Save</button></div></form>`;
  document.body.append(layer);
  layer.querySelector("textarea").focus();
  layer.querySelector("[data-close-modal]").addEventListener("click", () => layer.remove());
  layer.addEventListener("click", (event) => { if (event.target === layer) layer.remove(); });
  layer.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    onSave(layer.querySelector("textarea").value.trim());
    layer.remove();
  });
}

function bindDoodleDrag() {
  document.querySelectorAll(".doodle-note").forEach((note) => {
    note.addEventListener("pointerdown", (event) => {
      const board = document.getElementById("doodle-board");
      const boardRect = board.getBoundingClientRect();
      const noteRect = note.getBoundingClientRect();
      const offsetX = event.clientX - noteRect.left;
      const offsetY = event.clientY - noteRect.top;
      note.setPointerCapture(event.pointerId);

      const move = (moveEvent) => {
        const left = Math.max(0, Math.min(boardRect.width - noteRect.width, moveEvent.clientX - boardRect.left - offsetX));
        const top = Math.max(0, Math.min(boardRect.height - noteRect.height, moveEvent.clientY - boardRect.top - offsetY));
        note.style.left = `${left}px`;
        note.style.top = `${top}px`;
      };

      const end = () => {
        const item = saved.notes.find((entry) => entry.id === note.dataset.noteId);
        item.x = ((note.offsetLeft / board.clientWidth) * 100).toFixed(2);
        item.y = ((note.offsetTop / board.clientHeight) * 100).toFixed(2);
        saveProjectState();
        note.removeEventListener("pointermove", move);
        note.removeEventListener("pointerup", end);
      };

      note.addEventListener("pointermove", move);
      note.addEventListener("pointerup", end);
    });
  });
}

document.addEventListener("click", (event) => {
  const blocker = event.target.closest("[data-toggle-blocker]");
  if (blocker) {
    const item = saved.blockers.find((entry) => entry.id === blocker.dataset.toggleBlocker);
    item.resolved = !item.resolved;
    saveProjectState();
    renderNimbus();
    showToast(item.resolved ? "Blocker cleared." : "Blocker reopened.");
    return;
  }

  if (event.target.closest("[data-new-blocker]")) {
    openModal("Park a blocker", "What is getting in the way?", (text) => {
      saved.blockers.push({ id: `b-${Date.now()}`, title: text, detail: "Ready for a kind second pair of eyes.", mood: "Needs eyes", resolved: false });
      saveProjectState();
      renderNimbus();
      showToast("Blocker parked in the nook.");
    });
    return;
  }

  const quest = event.target.closest("[data-toggle-quest]");
  if (quest) {
    const item = saved.quests.find((entry) => entry.id === quest.dataset.toggleQuest);
    item.done = !item.done;
    saveProjectState();
    renderLoop();
    showToast(item.done ? "Quest complete." : "Quest moved back into the loop.");
    return;
  }

  if (event.target.closest("[data-new-note]")) {
    openModal("Add a board note", "Catch the thought before it gets polished away.", (text) => {
      saved.notes.push({ id: `n-${Date.now()}`, text, x: 8 + Math.random() * 55, y: 10 + Math.random() * 55 });
      saveProjectState();
      renderDoodle();
      showToast("Note added to the board.");
    });
    return;
  }

  if (event.target.closest("[data-tidy-notes]")) {
    saved.notes.forEach((note, index) => { note.x = 5 + (index % 3) * 31; note.y = 7 + Math.floor(index / 3) * 36; });
    saveProjectState();
    renderDoodle();
    showToast("Board tidied.");
    return;
  }

  if (event.target.closest("[data-clear-notes]")) {
    saved.notes = [];
    saveProjectState();
    renderDoodle();
    showToast("Canvas cleared.");
    return;
  }

  const chartDay = event.target.closest("[data-chart-day]");
  if (chartDay) {
    const index = Number(chartDay.dataset.chartDay);
    saved.values[index] = Math.min(100, saved.values[index] + 6);
    saveProjectState();
    renderEco();
    showToast("Positive action logged.");
    return;
  }

  if (event.target.closest("[data-reset-chart]")) {
    saved.values = [42, 58, 52, 74, 68, 86, 78];
    saveProjectState();
    renderEco();
    return;
  }

  const step = event.target.closest("[data-toggle-step]");
  if (step) {
    const index = Number(step.dataset.toggleStep);
    saved.steps[index] = !saved.steps[index];
    saveProjectState();
    renderGeneric();
    showToast(saved.steps[index] ? "Step complete." : "Step reopened.");
  }
});

render();
