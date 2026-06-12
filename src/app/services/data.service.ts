import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Player, computeOverall } from '../models/player.model';
import { AuditLogEntry } from '../models/audit-log.model';
import { SavedSession } from '../models/session.model';
import { MOCK_PLAYERS } from '../../mock/players.mock';
import { MOCK_SESSIONS } from '../../mock/sessions.mock';
import { MOCK_AUDIT_LOG } from '../../mock/audit-log.mock';

@Injectable({ providedIn: 'root' })
export class DataService {
  // Deep-cloned so mutations don't affect the original mock constants
  private players: Player[] = structuredClone(MOCK_PLAYERS);
  private sessions: SavedSession[] = structuredClone(MOCK_SESSIONS);
  private auditLog: AuditLogEntry[] = structuredClone(MOCK_AUDIT_LOG);

  // ─── Players ────────────────────────────────────────────────────────────────

  getPlayers(): Observable<Player[]> {
    return of([...this.players]);
  }

  getPlayer(id: string): Observable<Player | undefined> {
    return of(this.players.find((p) => p.id === id));
  }

  createPlayer(data: Omit<Player, 'id' | 'overall'>): Observable<Player> {
    const player: Player = { ...data, id: crypto.randomUUID(), overall: computeOverall(data) };
    this.players.push(player);
    return of({ ...player });
  }

  updatePlayer(
    id: string,
    data: Omit<Player, 'id'>,
    audit: { editor_name: string; reason: string },
  ): Observable<Player> {
    const index = this.players.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Player ${id} not found`);

    const before = { ...this.players[index] };
    const updated: Player = { ...data, id, overall: computeOverall(data) };
    this.players[index] = updated;

    this.auditLog.unshift({
      id: crypto.randomUUID(),
      action: 'update',
      player_id: id,
      before,
      after: { ...updated },
      editor_name: audit.editor_name,
      reason: audit.reason,
      timestamp: new Date().toISOString(),
    });

    return of({ ...updated });
  }

  deletePlayer(id: string, audit: { editor_name: string; reason: string }): Observable<void> {
    const index = this.players.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Player ${id} not found`);

    const before = { ...this.players[index] };
    this.players.splice(index, 1);

    this.auditLog.unshift({
      id: crypto.randomUUID(),
      action: 'delete',
      player_id: id,
      before,
      after: null,
      editor_name: audit.editor_name,
      reason: audit.reason,
      timestamp: new Date().toISOString(),
    });

    return of(void 0);
  }

  // ─── Sessions ───────────────────────────────────────────────────────────────

  getSessions(): Observable<SavedSession[]> {
    return of([...this.sessions]);
  }

  saveSession(data: Omit<SavedSession, 'id' | 'created_at'>): Observable<SavedSession> {
    const session: SavedSession = {
      ...data,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };
    this.sessions.unshift(session);
    return of({ ...session });
  }

  updateSessionScore(id: string, score_a: number, score_b: number): Observable<SavedSession> {
    const index = this.sessions.findIndex((s) => s.id === id);
    if (index === -1) throw new Error(`Session ${id} not found`);

    this.sessions[index] = { ...this.sessions[index], score_a, score_b };
    return of({ ...this.sessions[index] });
  }

  // ─── Audit Log ──────────────────────────────────────────────────────────────

  getAuditLog(): Observable<AuditLogEntry[]> {
    return of([...this.auditLog]);
  }
}
