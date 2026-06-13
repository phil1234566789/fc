import { Component, computed, input, output } from '@angular/core';

import { BalanceResult } from '../../services/balance.service';
import { Player, computeAge } from '../../models/player.model';

type StatKey = 'pac' | 'sho' | 'pas' | 'dri' | 'def' | 'phy' | 'tec' | 'overall';

interface TeamPositions {
  fwds: Player[];
  defs: Player[];
  gk: Player;
  sub: Player;
}

@Component({
  selector: 'app-pitch-view',
  standalone: true,
  templateUrl: './pitch-view.component.html',
  styleUrl: './pitch-view.component.scss',
})
export class PitchViewComponent {
  result = input.required<BalanceResult>();
  reroll = output<void>();
  accept = output<void>();

  posA = computed(() => this.positionTeam(this.result().teamA));
  posB = computed(() => this.positionTeam(this.result().teamB));

  private positionTeam(team: Player[]): TeamPositions {
    const sorted = [...team].sort((a, b) => a.overall - b.overall);
    const sub = sorted[0];
    const active = sorted.slice(1);

    // Higher score = more forward tendency
    const tendency = (p: Player) => (p.pac + p.sho + p.dri) / 3 - p.def;
    active.sort((a, b) => tendency(a) - tendency(b));

    return {
      gk: active[0],
      defs: [active[1], active[2]],
      fwds: [active[3], active[4]],
      sub,
    };
  }

  shortName(name: string): string {
    return name.split(' ').pop() ?? name;
  }

  avg(team: Player[], stat: StatKey): number {
    return Math.round(team.reduce((s, p) => s + (p[stat] as number), 0) / team.length);
  }

  avgAge(team: Player[]): number {
    return Math.round(team.reduce((s, p) => s + computeAge(p.bday), 0) / team.length);
  }

  avgFitness(team: Player[]): string {
    return (team.reduce((s, p) => s + p.fitness, 0) / team.length).toFixed(1);
  }
}
