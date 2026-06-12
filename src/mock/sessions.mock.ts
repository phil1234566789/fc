import { SavedSession } from '../app/models/session.model';

export const MOCK_SESSIONS: SavedSession[] = [
  {
    id: 's01',
    date: '2026-05-15',
    team_a: [
      { player_id: 'p01', pac: 82, sho: 78, pas: 80, dri: 79, def: 76, phy: 80, tec: 81, overall: 79 },
      { player_id: 'p02', pac: 90, sho: 82, pas: 65, dri: 85, def: 45, phy: 72, tec: 70, overall: 73 },
      { player_id: 'p04', pac: 60, sho: 50, pas: 70, dri: 58, def: 88, phy: 82, tec: 62, overall: 67 },
      { player_id: 'p07', pac: 78, sho: 88, pas: 68, dri: 78, def: 42, phy: 68, tec: 72, overall: 71 },
      { player_id: 'p09', pac: 70, sho: 70, pas: 74, dri: 68, def: 62, phy: 70, tec: 72, overall: 69 },
      { player_id: 'p11', pac: 62, sho: 60, pas: 74, dri: 60, def: 78, phy: 75, tec: 70, overall: 68 },
    ],
    team_b: [
      { player_id: 'p03', pac: 68, sho: 65, pas: 86, dri: 74, def: 60, phy: 65, tec: 82, overall: 71 },
      { player_id: 'p05', pac: 72, sho: 68, pas: 72, dri: 65, def: 70, phy: 88, tec: 65, overall: 71 },
      { player_id: 'p06', pac: 65, sho: 72, pas: 78, dri: 80, def: 55, phy: 60, tec: 88, overall: 71 },
      { player_id: 'p08', pac: 64, sho: 48, pas: 65, dri: 55, def: 84, phy: 78, tec: 58, overall: 65 },
      { player_id: 'p10', pac: 85, sho: 72, pas: 70, dri: 82, def: 48, phy: 65, tec: 74, overall: 71 },
      { player_id: 'p12', pac: 55, sho: 45, pas: 68, dri: 52, def: 82, phy: 84, tec: 62, overall: 64 },
    ],
    score_a: 3,
    score_b: 2,
    accepted_by: 'Marco F.',
    created_at: '2026-05-15T19:45:00.000Z',
  },
  {
    id: 's02',
    date: '2026-05-29',
    team_a: [
      { player_id: 'p01', pac: 82, sho: 78, pas: 80, dri: 79, def: 76, phy: 80, tec: 81, overall: 79 },
      { player_id: 'p03', pac: 68, sho: 65, pas: 86, dri: 74, def: 60, phy: 65, tec: 82, overall: 71 },
      { player_id: 'p05', pac: 72, sho: 68, pas: 72, dri: 65, def: 70, phy: 88, tec: 65, overall: 71 },
      { player_id: 'p08', pac: 64, sho: 48, pas: 65, dri: 55, def: 84, phy: 78, tec: 58, overall: 65 },
      { player_id: 'p10', pac: 85, sho: 72, pas: 70, dri: 82, def: 48, phy: 65, tec: 74, overall: 71 },
      { player_id: 'p12', pac: 55, sho: 45, pas: 68, dri: 52, def: 82, phy: 84, tec: 62, overall: 64 },
    ],
    team_b: [
      { player_id: 'p02', pac: 90, sho: 82, pas: 65, dri: 85, def: 45, phy: 72, tec: 70, overall: 73 },
      { player_id: 'p04', pac: 60, sho: 50, pas: 70, dri: 58, def: 88, phy: 82, tec: 62, overall: 67 },
      { player_id: 'p06', pac: 65, sho: 72, pas: 78, dri: 80, def: 55, phy: 60, tec: 88, overall: 71 },
      { player_id: 'p07', pac: 78, sho: 88, pas: 68, dri: 78, def: 42, phy: 68, tec: 72, overall: 71 },
      { player_id: 'p09', pac: 70, sho: 70, pas: 74, dri: 68, def: 62, phy: 70, tec: 72, overall: 69 },
      { player_id: 'p11', pac: 62, sho: 60, pas: 74, dri: 60, def: 78, phy: 75, tec: 70, overall: 68 },
    ],
    score_a: null,
    score_b: null,
    accepted_by: 'Stefan H.',
    created_at: '2026-05-29T19:30:00.000Z',
  },
];
