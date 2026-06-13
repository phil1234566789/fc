import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { DataService } from '../../services/data.service';
import { BalanceService, BalanceResult } from '../../services/balance.service';
import { PitchViewComponent } from './pitch-view.component';
import { Player } from '../../models/player.model';

const REQUIRED = 12;

@Component({
  selector: 'app-team-builder',
  standalone: true,
  imports: [PitchViewComponent],
  templateUrl: './team-builder.component.html',
  styleUrl: './team-builder.component.scss',
})
export class TeamBuilderComponent {
  private data = inject(DataService);
  private balance = inject(BalanceService);

  players = toSignal(this.data.getPlayers(), { initialValue: [] as Player[] });

  selectedIds = signal<Set<string>>(new Set());
  selectedCount = computed(() => this.selectedIds().size);
  canGenerate = computed(() => this.selectedIds().size === REQUIRED);
  readonly required = REQUIRED;

  result = signal<BalanceResult | null>(null);

  toggle(id: string): void {
    this.selectedIds.update(set => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }

  generate(): void {
    const selected = this.players().filter(p => this.selectedIds().has(p.id));
    this.result.set(this.balance.balance(selected));
  }

  onAccept(): void {
    // F4.4 — save session
  }
}
