# Features

Implementation order: each phase builds on the previous. A phase is shippable on its own.

---

## Phase 1 — Project Setup

> Foundation everything else depends on. No visible UI yet.

### F1.1 — Angular Project Scaffold
- New Angular standalone project (latest)
- Routing configured
- GitHub Pages deployment pipeline (angular-cli-ghpages or gh-actions)
- Base href configured for GitHub Pages subdirectory

### F1.2 — Mock Data Layer
- All data lives in local TypeScript files (`src/mock/`)
- A `DataService` provides the data to components — same interface as a future real backend, so swapping in Supabase later is a one-file change
- Mock files:
  - `players.mock.ts` — 12+ player objects with all fields (name, image, age, fitness, PAC, SHO, PAS, DRI, DEF, PHY, TEC, overall)
  - `sessions.mock.ts` — 1–2 past saved team compositions
  - `audit-log.mock.ts` — 1–2 log entries (one edit, one delete)
- Player data: partly provided by Philip, rest generated
- No network calls, no environment variables needed

---

## Phase 1.5 — Ratings Guide

> Static reference page. No backend needed, no forms. Quick win before player management.

### F1.5 — Ratings Page
- Route `/ratings`
- Explains how OVR is calculated (simple avg of 7 stats, intentionally equal-weight for 5v5)
- Brief FIFA comparison: sub-attributes, position-weighted OVR — vs. our simplified approach
- Range descriptions (4 tiers per attribute) for all 7 attributes: PAC, SHO, PAS, DRI, DEF, PHY, TEC
- Written for hobby players — plain football language, no jargon

---

## Phase 2 — Player Management

> Core data entry. Required before any other feature is useful.

### F2.1 — Player List
- Route `/players`
- Fetches and displays all players from Supabase
- Shows: name, image, overall rating, key stats (PAC, DEF)
- Links to create / edit

### F2.2 — Create Player
- Route `/players/new`
- Form with all fields: name, image URL, age, fitness, PAC, SHO, PAS, DRI, DEF, PHY
- `overall` computed client-side as `avg(PAC, SHO, PAS, DRI, DEF, PHY, TEC)`, displayed live
- Saves to `players` table on submit

### F2.3 — Edit Player
- Route `/players/:id/edit`
- Same form as create, pre-filled
- On submit: saves updated player, writes audit log entry
- Audit log dialog: admin enters their name + reason before saving

### F2.4 — Delete Player
- Trigger from player list or edit page
- Confirmation dialog: admin enters name + reason
- Soft approach: deletes from `players`, writes audit log entry with full before-snapshot

---

## Phase 3 — Audit Log

> Read-only, depends on Phase 2 (needs real data to be useful).

### F3.1 — Audit Log Page
- Route `/audit-log`
- Fetches all entries from `audit_log`, ordered newest first
- Displays per entry: timestamp, editor name, action (update/delete), player name, reason
- Expandable row or detail view showing before/after values diff

---

## Phase 4 — Team Builder

> Most complex feature. Depends on Phase 2 (needs players).

### F4.1 — Participant Selection
- Route `/team-builder`
- Displays all players as selectable cards
- Admin selects exactly 12 (configurable default)
- Selected count shown, "Generate Teams" button enabled only when count matches

### F4.2 — Balance Algorithm (pure logic, no UI)
- Runs client-side as a service
- Input: array of 12 player objects
- Algorithm steps (in order):
  1. Compute group averages per attribute
  2. Identify top 4 PAC and top 4 DEF players
  3. Detect dominant players (appear in multiple top-4 lists) — each claims only their strongest attribute as anchor slot
  4. Assign dominant players first: strongest dominant → Team A; Team B gets compensatory anchor picks
  5. Distribute remaining anchor slots 2–2 per attribute
  6. Fill remaining spots by minimising per-attribute sum difference across all 6 stats
- Output: `{ teamA: Player[], teamB: Player[] }`
- Displayed but not used for balancing: avg age, avg fitness per team

### F4.3 — Pitch View
- Displays both teams side by side on a visual football pitch (CSS/SVG)
- Player cards auto-positioned by role tendency:
  - DEF-heavy → back row
  - PAC/SHO/DRI-heavy → front row
  - Each team: 1 GK slot, 4 field positions, 1 substitute slot
- Shows per team: attribute averages, avg age, avg fitness
- "Re-roll" button to re-run the algorithm with a different random seed
- "Accept" button to proceed to save

### F4.4 — Accept & Save Session
- Admin enters their name
- Session saved to `sessions` table:
  - `team_a`, `team_b` as player ID arrays + stat snapshots
  - `accepted_by`, `created_at`
- Confirmation screen / redirect

---

## Phase 5 — Polish (after all features work)

> Only after Phases 1–4 are complete and tested.

- Session history page — list of past saved team compositions
- Mobile-friendly layout for pitch view
- Fitness scale definition (TBD)

---

## Phase 6 — Backend (optional, only if the group wants to keep the app)

> Skip entirely if the app doesn't get traction.

### F6.1 — Supabase Setup
- Supabase project created
- Tables created via SQL migrations: `players`, `audit_log`, `sessions`
- `@supabase/supabase-js` installed
- `DataService` swapped from mock to real Supabase calls (interface stays identical)
- Environment variables: Supabase URL + anon key

### F6.2 — Player Image Upload
- Upload to Supabase Storage (replaces plain URL input in player form)

### F6.3 — Persistent Team Sessions
- Sessions saved to Supabase `sessions` table instead of in-memory
