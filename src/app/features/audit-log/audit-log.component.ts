import { Component, computed, inject } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';

import { DataService } from '../../services/data.service';
import { AuditLogEntry } from '../../models/audit-log.model';
import { toSignal } from '@angular/core/rxjs-interop';

const FITNESS_LABELS: Record<number, string> = {
  1: 'Top Form',
  2: 'In Form',
  3: 'Low Form',
  4: 'Out of Practice',
  5: 'Making a Comeback',
};

const STAT_LABELS: Partial<Record<string, string>> = {
  pac: 'PAC', sho: 'SHO', pas: 'PAS', dri: 'DRI',
  def: 'DEF', phy: 'PHY', tec: 'TEC', overall: 'OVR',
};

interface AttrChange {
  label: string;
  before: string | number;
  after: string | number;
  delta?: number;
}

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './audit-log.component.html',
  styleUrl: './audit-log.component.scss',
})
export class AuditLogComponent {
  private data = inject(DataService);

  private raw = toSignal(this.data.getAuditLog(), { initialValue: [] as AuditLogEntry[] });

  entries = computed(() =>
    [...this.raw()].sort((a, b) => b.timestamp.localeCompare(a.timestamp)),
  );

  getChanges(entry: AuditLogEntry): AttrChange[] {
    const { before, after } = entry;

    if (!after) {
      return [
        { label: 'Fitness', before: FITNESS_LABELS[before.fitness], after: '—' },
        ...(['pac', 'sho', 'pas', 'dri', 'def', 'phy', 'tec', 'overall'] as const).map(key => ({
          label: STAT_LABELS[key]!,
          before: before[key],
          after: '—' as const,
        })),
      ];
    }

    const changes: AttrChange[] = [];

    if (before.name !== after.name) {
      changes.push({ label: 'Name', before: before.name, after: after.name });
    }
    if (before.fitness !== after.fitness) {
      changes.push({
        label: 'Fitness',
        before: FITNESS_LABELS[before.fitness],
        after: FITNESS_LABELS[after.fitness],
      });
    }

    for (const key of ['pac', 'sho', 'pas', 'dri', 'def', 'phy', 'tec', 'overall'] as const) {
      if (before[key] !== after[key]) {
        const delta = after[key] - before[key];
        changes.push({ label: STAT_LABELS[key]!, before: before[key], after: after[key], delta });
      }
    }

    return changes;
  }

  deltaClass(delta?: number): string {
    if (!delta) return '';
    return delta > 0 ? 'up' : 'down';
  }

  formatDelta(delta?: number): string {
    if (!delta) return '';
    return delta > 0 ? `+${delta}` : `${delta}`;
  }
}
