import { Component, computed, input } from '@angular/core';
import { Fitness, Player } from '../../models/player.model';

const FITNESS_COLORS: Record<Fitness, string> = {
  1: '#4caf50',
  2: '#8bc34a',
  3: '#ffeb3b',
  4: '#ff9800',
  5: '#f44336',
};

const FITNESS_LABELS: Record<Fitness, string> = {
  1: 'Top Form',
  2: 'In Form',
  3: 'Low Form',
  4: 'Out of Practice',
  5: 'Making a Comeback',
};

@Component({
  selector: 'app-player-card',
  standalone: true,
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss',
})
export class PlayerCardComponent {
  player = input.required<Player>();
  gamesPlayed = input<number>();
  lastResults = input<('W' | 'D' | 'L')[]>();
  compact = input<boolean>(false);
  size = input<'sm' | 'md'>('md');

  protected total = computed(() => {
    const p = this.player();
    return p.pac + p.sho + p.pas + p.dri + p.def + p.phy + p.tec;
  });

  protected stats = computed(() => {
    const p = this.player();
    return [
      { label: 'PAC', value: p.pac },
      { label: 'SHO', value: p.sho },
      { label: 'PAS', value: p.pas },
      { label: 'DRI', value: p.dri },
      { label: 'DEF', value: p.def },
      { label: 'PHY', value: p.phy },
      { label: 'TEC', value: p.tec },
      { label: 'OVR', value: p.overall },
    ];
  });

  protected fitnessColor = computed(() => FITNESS_COLORS[this.player().fitness]);
  protected fitnessLabel = computed(() => FITNESS_LABELS[this.player().fitness]);

  protected top2Labels = computed(() => {
    const p = this.player();
    const s = [
      { label: 'PAC', value: p.pac },
      { label: 'SHO', value: p.sho },
      { label: 'PAS', value: p.pas },
      { label: 'DRI', value: p.dri },
      { label: 'DEF', value: p.def },
      { label: 'PHY', value: p.phy },
      { label: 'TEC', value: p.tec },
    ];
    return new Set(s.sort((a, b) => b.value - a.value).slice(0, 2).map(s => s.label));
  });
}
