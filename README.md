# MzansiLearn

**Offline-first learning platform for South African high school students (Grade 8-12)**

Built with Next.js, TypeScript, and PWA technology. CAPS curriculum aligned. Inspired by edX architecture.

## Features

- Offline-first PWA - works without internet
- CAPS Curriculum - aligned with South African national curriculum
- Grade 8-12 - all high school grades supported
- Interactive quizzes - MCQ with instant feedback
- Progress tracking - per subject, grade, and term
- Background sync - syncs when connectivity returns
- Multi-user - shared device support with profile switching

## Tech Stack

- **Framework:** Next.js 15 + TypeScript
- **Styling:** Tailwind CSS 4
- **Offline Storage:** IndexedDB (Dexie.js)
- **Auth:** JWT + offline profiles
- **State:** Zustand
- **PWA:** @ducanh2912/next-pwa

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    layout.tsx            # Root layout with PWA meta
    page.tsx              # Home page
    offline/              # Offline fallback page
    globals.css           # Global styles + CSS variables
  lib/                    # Core libraries
    models/               # Data models (CourseKey, blocks, grades)
    db/                   # IndexedDB layer (Dexie)
    auth/                 # Authentication (JWT, profiles)
    sync/                 # Background sync queue
    grading/              # Offline grading engine
  components/             # React components
    blocks/               # Content block components
    quiz/                 # Quiz engine components
    dashboard/            # Dashboard components
    ui/                   # Shared UI primitives
  content/                # CAPS curriculum data
    caps/                 # Subject > Grade > Term structure
  types/                  # TypeScript type definitions
```

## Architecture

MzansiLearn is inspired by Open edX but redesigned for offline-first operation in the South African context.

## License

MIT
