import { Player } from './player.model';

export type AuditAction = 'update' | 'delete';

export interface AuditLogEntry {
  id: string;
  editor_name: string;
  action: AuditAction;
  player_id: string;
  before: Player;
  after: Player | null; // null on delete
  reason: string;
  timestamp: string; // ISO datetime
}
