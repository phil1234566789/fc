import { Component, computed, input } from '@angular/core';

import { Fitness, Player } from '../../models/player.model';

const FITNESS_COLORS: Record<Fitness, string> = {
  1: '#4caf50',
  2: '#8bc34a',
  3: '#ffeb3b',
  4: '#ff9800',
  5: '#f44336',
};

@Component({
  selector: 'app-pitch-player-card',
  standalone: true,
  templateUrl: './pitch-player-card.component.html',
  styleUrl: './pitch-player-card.component.scss',
})
export class PitchPlayerCardComponent {
  player = input.required<Player>();
  mode = input<'compact' | 'detailed'>('compact');
  team = input<'a' | 'b'>('a');

  protected total = computed(() => {
    const p = this.player();
    return p.pac + p.sho + p.pas + p.dri + p.def + p.phy + p.tec;
  });

  protected top2 = computed(() =>
    [
      { label: 'PAC', value: this.player().pac },
      { label: 'SHO', value: this.player().sho },
      { label: 'PAS', value: this.player().pas },
      { label: 'DRI', value: this.player().dri },
      { label: 'DEF', value: this.player().def },
      { label: 'PHY', value: this.player().phy },
      { label: 'TEC', value: this.player().tec },
    ].sort((a, b) => b.value - a.value).slice(0, 2),
  );

  protected allStats = computed(() => [
    { label: 'PAC', value: this.player().pac },
    { label: 'SHO', value: this.player().sho },
    { label: 'PAS', value: this.player().pas },
    { label: 'DRI', value: this.player().dri },
    { label: 'DEF', value: this.player().def },
    { label: 'PHY', value: this.player().phy },
    { label: 'TEC', value: this.player().tec },
  ]);

  protected fitnessColor = computed(() => FITNESS_COLORS[this.player().fitness]);

  protected shortName = computed(() => this.player().name.split(' ').pop() ?? this.player().name);
}
