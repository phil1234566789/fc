import { PlayerSnapshot, SavedSession } from '../app/models/session.model';

function snap(
  player_id: string,
  pac: number, sho: number, pas: number,
  dri: number, def: number, phy: number, tec: number,
  overall: number,
): PlayerSnapshot {
  return { player_id, pac, sho, pas, dri, def, phy, tec, overall };
}

// Snapshots per player (current stats at time of each session)
const P01 = snap('p01', 82, 78, 80, 79, 76, 80, 81, 79);
const P02 = snap('p02', 90, 82, 65, 85, 45, 72, 70, 73);
const P03 = snap('p03', 68, 65, 86, 74, 60, 65, 82, 71);
const P04 = snap('p04', 60, 50, 70, 58, 88, 82, 62, 67);
const P05 = snap('p05', 72, 68, 72, 65, 70, 88, 65, 71);
const P06 = snap('p06', 65, 72, 78, 80, 55, 60, 88, 71);
const P07 = snap('p07', 78, 88, 68, 78, 42, 68, 72, 71);
const P08 = snap('p08', 64, 48, 65, 55, 84, 78, 58, 65);
const P09 = snap('p09', 70, 70, 74, 68, 62, 70, 72, 69);
const P10 = snap('p10', 85, 72, 70, 82, 48, 65, 74, 71);
const P11 = snap('p11', 62, 65, 74, 60, 78, 75, 70, 69);
const P12 = snap('p12', 55, 45, 68, 52, 82, 84, 62, 64);

export const MOCK_SESSIONS: SavedSession[] = [
  // ── Session 1 · 2026-05-01 · A 2:1 B ────────────────────────────────────
  {
    id: 's00',
    date: '2026-05-01',
    team_a: [P01, P02, P03, P08, P09, P12],
    team_b: [P04, P05, P06, P07, P10, P11],
    score_a: 2,
    score_b: 1,
    accepted_by: 'Marco F.',
    created_at: '2026-05-01T19:30:00.000Z',
  },
  // ── Session 2 · 2026-05-15 · A 3:2 B ────────────────────────────────────
  {
    id: 's01',
    date: '2026-05-15',
    team_a: [P01, P02, P04, P07, P09, P11],
    team_b: [P03, P05, P06, P08, P10, P12],
    score_a: 3,
    score_b: 2,
    accepted_by: 'Marco F.',
    created_at: '2026-05-15T19:45:00.000Z',
  },
  // ── Session 3 · 2026-05-29 · A 1:1 B ────────────────────────────────────
  {
    id: 's02',
    date: '2026-05-29',
    team_a: [P01, P03, P05, P08, P10, P12],
    team_b: [P02, P04, P06, P07, P09, P11],
    score_a: 1,
    score_b: 1,
    accepted_by: 'Stefan H.',
    created_at: '2026-05-29T19:30:00.000Z',
  },
  // ── Session 4 · 2026-06-05 · A 1:3 B ────────────────────────────────────
  {
    id: 's03',
    date: '2026-06-05',
    team_a: [P02, P03, P06, P08, P09, P12],
    team_b: [P01, P04, P05, P07, P10, P11],
    score_a: 1,
    score_b: 3,
    accepted_by: 'Nico L.',
    created_at: '2026-06-05T19:40:00.000Z',
  },
  // ── Session 5 · 2026-06-12 · A 2:1 B ────────────────────────────────────
  {
    id: 's04',
    date: '2026-06-12',
    team_a: [P01, P05, P06, P07, P11, P12],
    team_b: [P02, P03, P04, P08, P09, P10],
    score_a: 2,
    score_b: 1,
    accepted_by: 'Stefan H.',
    created_at: '2026-06-12T19:35:00.000Z',
  },
];
