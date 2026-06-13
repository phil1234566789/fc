import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { DataService } from '../../services/data.service';
import { Player } from '../../models/player.model';

const REQUIRED = 12;

@Component({
  selector: 'app-team-builder',
  standalone: true,
  templateUrl: './team-builder.component.html',
  styleUrl: './team-builder.component.scss',
})
export class TeamBuilderComponent {
  private data = inject(DataService);

  players = toSignal(this.data.getPlayers(), { initialValue: [] as Player[] });

  selectedIds = signal<Set<string>>(new Set());
  selectedCount = computed(() => this.selectedIds().size);
  canGenerate = computed(() => this.selectedIds().size === REQUIRED);
  readonly required = REQUIRED;

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
    // F4.2 — balance algorithm
  }
}
