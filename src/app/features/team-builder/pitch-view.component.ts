import { Component, computed, input, output, signal } from '@angular/core';

import { BalanceResult } from '../../services/balance.service';
import { Player, computeAge } from '../../models/player.model';
import { PitchPlayerCardComponent } from './pitch-player-card.component';
import { PlayerCardComponent } from '../../shared/player-card/player-card.component';

type StatKey = 'pac' | 'sho' | 'pas' | 'dri' | 'def' | 'phy' | 'tec' | 'overall';

interface TeamPositions {
  backs: Player[];  // most defensive — placed far from center
  mids: Player[];
  fwds: Player[];   // most attacking — placed close to center
}

interface CompareRow {
  label: string;
  a: number;
  b: number;
  aWins: boolean;
  bWins: boolean;
}

@Component({
  selector: 'app-pitch-view',
  standalone: true,
  imports: [PitchPlayerCardComponent, PlayerCardComponent],
  templateUrl: './pitch-view.component.html',
  styleUrl: './pitch-view.component.scss',
})
export class PitchViewComponent {
  result = input.required<BalanceResult>();
  reroll = output<void>();
  accept = output<void>();

  posA = computed(() => this.positionTeam(this.result().teamA));
  posB = computed(() => this.positionTeam(this.result().teamB));

  cardMode = signal<'compact' | 'detailed'>('compact');
  toggleMode(): void {
    this.cardMode.update(m => m === 'compact' ? 'detailed' : 'compact');
  }

  compareRows = computed<CompareRow[]>(() => {
    const a = this.result().teamA;
    const b = this.result().teamB;

    const statRow = (label: string, stat: StatKey): CompareRow => {
      const va = a.reduce((s, p) => s + (p[stat] as number), 0);
      const vb = b.reduce((s, p) => s + (p[stat] as number), 0);
      return { label, a: va, b: vb, aWins: va > vb, bWins: vb > va };
    };

    const ageA = Math.round(a.reduce((s, p) => s + computeAge(p.bday), 0) / a.length);
    const ageB = Math.round(b.reduce((s, p) => s + computeAge(p.bday), 0) / b.length);
    const totA = a.reduce((s, p) => s + p.pac + p.sho + p.pas + p.dri + p.def + p.phy + p.tec, 0);
    const totB = b.reduce((s, p) => s + p.pac + p.sho + p.pas + p.dri + p.def + p.phy + p.tec, 0);

    return [
      { label: 'Ø AGE', a: ageA, b: ageB, aWins: false, bWins: false },
      { label: 'TOT', a: totA, b: totB, aWins: totA > totB, bWins: totB > totA },
      statRow('OVR', 'overall'),
      statRow('PAC', 'pac'),
      statRow('SHO', 'sho'),
      statRow('PAS', 'pas'),
      statRow('DRI', 'dri'),
      statRow('DEF', 'def'),
      statRow('PHY', 'phy'),
      statRow('TEC', 'tec'),
    ];
  });

  private positionTeam(team: Player[]): TeamPositions {
    const tendency = (p: Player) => (p.pac + p.sho + p.dri) / 3 - p.def;
    const sorted = [...team].sort((a, b) => tendency(a) - tendency(b));
    return {
      backs: [sorted[0], sorted[1]],
      mids:  [sorted[2], sorted[3]],
      fwds:  [sorted[4], sorted[5]],
    };
  }
}
