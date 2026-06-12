export type Fitness = 1 | 2 | 3 | 4 | 5;

export interface Player {
  id: string;
  name: string;
  image: string;
  bday: string; // ISO date — never display raw, use computeAge()
  fitness: Fitness;
  pac: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
  tec: number;
  overall: number; // computed: Math.round(avg of 7 stats above)
}

export function computeOverall(
  stats: Pick<Player, 'pac' | 'sho' | 'pas' | 'dri' | 'def' | 'phy' | 'tec'>,
): number {
  return Math.round(
    (stats.pac + stats.sho + stats.pas + stats.dri + stats.def + stats.phy + stats.tec) / 7,
  );
}

export function computeAge(bday: string): number {
  const birth = new Date(bday);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}
