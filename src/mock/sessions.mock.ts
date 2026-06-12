import { PlayerSnapshot, SavedSession } from '../app/models/session.model';

function snap(
  player_id: string,
  pac: number, sho: number, pas: number,
  dri: number, def: number, phy: number, tec: number,
  overall: number,
): PlayerSnapshot {
  return { player_id, pac, sho, pas, dri, def, phy, tec, overall };
}

const P01 = snap('p01', 78, 82, 82, 84, 72, 82, 82, 80); // Bellingham
const P02 = snap('p02', 88, 78, 74, 88, 36, 62, 85, 73); // Olise
const P03 = snap('p03', 62, 72, 91, 82, 72, 62, 90, 76); // Modric
const P04 = snap('p04', 80, 42, 66, 60, 86, 88, 62, 69); // Upamecano
const P05 = snap('p05', 74, 62, 78, 72, 86, 84, 72, 75); // Tchouameni
const P06 = snap('p06', 80, 80, 82, 92, 35, 60, 92, 74); // Neymar
const P07 = snap('p07', 70, 93, 80, 78, 42, 82, 80, 75); // Kane
const P08 = snap('p08', 72, 68, 76, 70, 74, 80, 72, 73); // Rabiot
const P09 = snap('p09', 66, 80, 82, 72, 58, 72, 78, 73); // Müller
const P10 = snap('p10', 62, 88, 90, 92, 38, 58, 95, 75); // Messi
const P11 = snap('p11', 76, 92, 72, 80, 42, 82, 80, 75); // Ronaldo
const P12 = snap('p12', 70, 68, 90, 76, 82, 72, 82, 77); // Kimmich

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
    accepted_by: 'Stefan B.',
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
    accepted_by: 'Stefan B.',
    created_at: '2026-06-12T19:35:00.000Z',
  },
];
