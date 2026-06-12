import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Player } from '../../models/player.model';
import { SavedSession } from '../../models/session.model';
import { DataService } from '../../services/data.service';
import { PlayerCardComponent } from '../../shared/player-card/player-card.component';

interface PlayerViewModel {
  player: Player;
  gamesPlayed: number;
  lastResults: ('W' | 'D' | 'L')[];
}

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink, PlayerCardComponent],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.scss',
})
export class PlayersListComponent {
  private data = inject(DataService);

  selectedVm = signal<PlayerViewModel | null>(null);

  viewModels$ = forkJoin({
    players: this.data.getPlayers(),
    sessions: this.data.getSessions(),
  }).pipe(
    map(({ players, sessions }) =>
      players
        .map((player) => ({
          player,
          gamesPlayed: this.countGamesPlayed(player.id, sessions),
          lastResults: this.getLastResults(player.id, sessions),
        }))
        .sort((a, b) => {
          if (b.gamesPlayed !== a.gamesPlayed) return b.gamesPlayed - a.gamesPlayed;
          return a.player.name.localeCompare(b.player.name);
        }),
    ),
  );

  openModal(vm: PlayerViewModel): void {
    this.selectedVm.set(vm);
  }

  closeModal(): void {
    this.selectedVm.set(null);
  }

  onImgError(event: Event, name: string): void {
    (event.target as HTMLImageElement).src =
      `https://placehold.co/44x44/1a1500/c9a227?text=${name.charAt(0).toUpperCase()}`;
  }

  private countGamesPlayed(playerId: string, sessions: SavedSession[]): number {
    return sessions.filter(
      (s) =>
        s.team_a.some((p) => p.player_id === playerId) ||
        s.team_b.some((p) => p.player_id === playerId),
    ).length;
  }

  private getLastResults(playerId: string, sessions: SavedSession[]): ('W' | 'D' | 'L')[] {
    return [...sessions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter(
        (s) =>
          s.score_a !== null &&
          s.score_b !== null &&
          (s.team_a.some((p) => p.player_id === playerId) ||
            s.team_b.some((p) => p.player_id === playerId)),
      )
      .slice(0, 5)
      .map((s) => {
        const inTeamA = s.team_a.some((p) => p.player_id === playerId);
        const myScore = inTeamA ? s.score_a! : s.score_b!;
        const oppScore = inTeamA ? s.score_b! : s.score_a!;
        if (myScore === oppScore) return 'D';
        return myScore > oppScore ? 'W' : 'L';
      });
  }
}
