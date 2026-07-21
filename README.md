# Umuzi Dreamscape

Umuzi Dreamscape is an interactive learner community app built around project
sharing, peer feedback, live build previews, sticker reactions, learning
roadmaps, collaboration tasks, and portfolio evidence.

Live GitHub launch page:

```text
https://cosmicbubblegumgirl.github.io/Umuzi_Dreamscape/
```

Desktop browser app:

```text
Open the launch page in Chrome or Edge and choose "Install desktop app" when
the install prompt appears. The app also includes a browser fallback button.

Windows desktop launcher:
https://github.com/cosmicbubblegumgirl/Umuzi_Dreamscape/releases/download/v0.1.2/Umuzi-Dreamscape-Desktop-Browser-App.zip
```

Mobile downloads:

```text
Android APK:
https://github.com/cosmicbubblegumgirl/Umuzi_Dreamscape/releases/download/v0.1.2/Umuzi-Dreamscape-Android-debug.apk

iOS wrapper project:
https://github.com/cosmicbubblegumgirl/Umuzi_Dreamscape/releases/download/v0.1.2/Umuzi-Dreamscape-iOS-wrapper.zip
```

The interface follows the concept deck direction: warm paper textures, Umuzi
navy, leaf green, coral, lilac, and sun accents. It is designed to feel polished
enough for career development while still feeling welcoming and community-led.

## Features

- Local login and user database, seeded with `quantum_cupcake`.
- Installable desktop browser app with manifest, service worker, and app icons.
- Responsive learner workspace with desktop and mobile-style views.
- Home feed for recent builds, demo student projects, and progress snapshots.
- Build detail surface with progress editing, tags, embedded sandbox URLs, and mentor mode.
- Learning path aligned to Apply, Skills Lab, Experience Lab, Support, and
  Launch Lab.
- Project chat with reactions, messages, attachments, and real sticker artwork.
- Shared task board for moving work through To do, Doing, and Done.
- Evidence export surface for turning project progress into a portfolio story.
- Seeded demo projects include Nimbus Nook, Learn Loop, Doodle Flow, FlowForge
  Exam Lab, and SAP CAP Simulator.
- Custom Umuzi Dreamscape mark and favicon.

Local demo login:

```text
username: quantum_cupcake
password: dreamscape
```

## Running Locally

```bash
npm install
npm run dev
```

To check the production build:

```bash
npm run build
```

## Project Structure

- `app/page.tsx` contains the interactive product screen and local state.
- `app/globals.css` contains the visual system and responsive layout.
- `app/layout.tsx` contains the document metadata and app shell.
- `app/api/` contains login, app data, build, message, task, and evidence routes.
- `lib/database.ts` contains the local SQLite schema and seed data.
- `public/favicon.svg` contains the custom Dreamscape icon.
- `public/manifest.webmanifest` and `public/sw.js` power the desktop browser app.
- `public/stickers/` contains the imported sticker artwork.
- `desktop-launcher/` contains the Windows browser launcher package.
