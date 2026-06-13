import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';

type StatKey = 'pac' | 'sho' | 'pas' | 'dri' | 'def' | 'phy' | 'tec';

export interface BalanceResult {
  teamA: Player[];
  teamB: Player[];
}

const ALL_STATS: StatKey[] = ['pac', 'sho', 'pas', 'dri', 'def', 'phy', 'tec'];
const ANCHOR_ATTRS: StatKey[] = ['pac', 'def'];
const TOP_N = 4;

@Injectable({ providedIn: 'root' })
export class BalanceService {

  balance(players: Player[]): BalanceResult {
    const assigned = new Set<string>();
    const teamA: Player[] = [];
    const teamB: Player[] = [];

    // Shuffle first so tie-breaking in sorts is random — same group, different teams each run
    players = this.shuffle(players);

    // Step 1: Top N players per anchor attribute (PAC + DEF)
    const topPac = this.topN(players, 'pac', TOP_N);
    const topDef = this.topN(players, 'def', TOP_N);
    const topPacIds = new Set(topPac.map(p => p.id));
    const topDefIds = new Set(topDef.map(p => p.id));

    // Step 2: Dominant players = appear in both top-N lists
    const dominants = players
      .filter(p => topPacIds.has(p.id) && topDefIds.has(p.id))
      .sort((a, b) => b.overall - a.overall);

    // Step 3: Assign dominant players
    if (dominants.length > 0) {
      // Strongest dominant → Team A
      this.assign(dominants[0], teamA, assigned);

      // Team B gets the best remaining player in each of the dominant's anchor attributes
      for (const attr of ANCHOR_ATTRS) {
        const best = this.bestUnassigned(players, attr, assigned);
        if (best && teamB.length < 6) this.assign(best, teamB, assigned);
      }

      // Any additional dominants → smaller team
      for (const d of dominants.slice(1)) {
        if (!assigned.has(d.id)) {
          this.assign(d, teamA.length <= teamB.length ? teamA : teamB, assigned);
        }
      }
    }

    // Step 4: Remaining anchor players split alternately
    const anchorIds = new Set([...topPacIds, ...topDefIds]);
    const remainingAnchors = players
      .filter(p => anchorIds.has(p.id) && !assigned.has(p.id))
      .sort((a, b) => b.overall - a.overall);

    for (const player of remainingAnchors) {
      const target = teamA.length <= teamB.length ? teamA : teamB;
      if (target.length < 6) this.assign(player, target, assigned);
    }

    // Step 5: Fill remaining by minimising total stat-sum difference
    const remaining = players
      .filter(p => !assigned.has(p.id))
      .sort((a, b) => b.overall - a.overall);

    for (const player of remaining) {
      if (teamA.length >= 6) {
        this.assign(player, teamB, assigned);
      } else if (teamB.length >= 6) {
        this.assign(player, teamA, assigned);
      } else {
        this.assign(player, this.totalSum(teamA) <= this.totalSum(teamB) ? teamA : teamB, assigned);
      }
    }

    // Step 6: Balance unfit players (fitness >= 4) across teams
    this.balanceFitness(teamA, teamB);

    return { teamA, teamB };
  }

  private balanceFitness(teamA: Player[], teamB: Player[]): void {
    const isUnfit = (p: Player) => p.fitness >= 4;

    for (let i = 0; i < 3; i++) {
      const unfitA = teamA.filter(isUnfit);
      const unfitB = teamB.filter(isUnfit);
      if (Math.abs(unfitA.length - unfitB.length) <= 1) break;

      // Heavy team has more unfit players — swap one of theirs with a fit player from the other
      const [heavy, light] = unfitA.length > unfitB.length ? [teamA, teamB] : [teamB, teamA];
      const unfitPool = heavy.filter(isUnfit);
      const fitPool = light.filter(p => !isUnfit(p));
      if (!unfitPool.length || !fitPool.length) break;

      // Pick the swap that minimises the change in stat-sum difference
      let best: { hi: number; li: number; delta: number } | null = null;

      for (const hu of unfitPool) {
        for (const lf of fitPool) {
          const delta = Math.abs(
            (this.totalSum(heavy) - this.playerSum(hu) + this.playerSum(lf)) -
            (this.totalSum(light) - this.playerSum(lf) + this.playerSum(hu)),
          );
          if (!best || delta < best.delta) {
            best = { hi: heavy.indexOf(hu), li: light.indexOf(lf), delta };
          }
        }
      }

      if (!best) break;
      [heavy[best.hi], light[best.li]] = [light[best.li], heavy[best.hi]];
    }
  }

  private playerSum(p: Player): number {
    return ALL_STATS.reduce((sum, s) => sum + p[s], 0);
  }

  private shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  private topN(players: Player[], stat: StatKey, n: number): Player[] {
    return [...players].sort((a, b) => b[stat] - a[stat]).slice(0, n);
  }

  private bestUnassigned(players: Player[], stat: StatKey, assigned: Set<string>): Player | undefined {
    return [...players]
      .filter(p => !assigned.has(p.id))
      .sort((a, b) => b[stat] - a[stat])[0];
  }

  private totalSum(team: Player[]): number {
    return ALL_STATS.reduce((total, s) => total + team.reduce((sum, p) => sum + p[s], 0), 0);
  }

  private assign(player: Player, team: Player[], assigned: Set<string>): void {
    team.push(player);
    assigned.add(player.id);
  }
}
