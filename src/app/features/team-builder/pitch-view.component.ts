import { Component, computed, input, output } from '@angular/core';

import { BalanceResult } from '../../services/balance.service';
import { Player, computeAge } from '../../models/player.model';

type StatKey = 'pac' | 'sho' | 'pas' | 'dri' | 'def' | 'phy' | 'tec' | 'overall';

interface TeamPositions {
  backs: Player[];  // most defensive — placed far from center
  mids: Player[];
  fwds: Player[];   // most attacking — placed close to center
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
    const tendency = (p: Player) => (p.pac + p.sho + p.dri) / 3 - p.def;
    const sorted = [...team].sort((a, b) => tendency(a) - tendency(b));
    // sorted[0..1] = most defensive, sorted[4..5] = most attacking
    return {
      backs: [sorted[0], sorted[1]],
      mids:  [sorted[2], sorted[3]],
      fwds:  [sorted[4], sorted[5]],
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
