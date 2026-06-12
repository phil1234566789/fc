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
  3: 'Formtief',
  4: 'Aus der Übung',
  5: 'Im Comeback',
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
    ];
  });

  protected fitnessColor = computed(() => FITNESS_COLORS[this.player().fitness]);
  protected fitnessLabel = computed(() => FITNESS_LABELS[this.player().fitness]);

  protected onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const initial = this.player().name.charAt(0).toUpperCase();
    img.src = `https://placehold.co/100x100/1a1500/c9a227?text=${initial}`;
  }
}
