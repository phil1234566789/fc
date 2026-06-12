export interface PlayerSnapshot {
  player_id: string;
  pac: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
  tec: number;
  overall: number;
}

export interface SavedSession {
  id: string;
  date: string; // ISO date — actual matchday, entered by admin
  team_a: PlayerSnapshot[];
  team_b: PlayerSnapshot[];
  score_a: number | null; // null until entered after the game
  score_b: number | null;
  accepted_by: string;
  created_at: string; // ISO datetime
}
