import { Injectable } from '@angular/core';
import { GameService } from './game-service';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  score: number = 0;
  turn: number = 0;
  scoreLimit: number = 10;
  private gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
    this.updateScore();
  }

  getScore() {
    return { score: this.score, turn: this.turn, scoreLimit: this.scoreLimit };
  }

  updateScore(scoreDelta: number = 0): void {
    this.score = scoreDelta + this.gameService.score;
    this.turn = this.gameService.turn;
    this.scoreLimit = this.gameService.scoreLimit;

    /* const state = this.gameService.getState();
    if (state !== undefined) {
      this.score = state.score + scoreDelta;
      this.turn = state.turn + 1;
      this.scoreLimit = state.scoreLimit;
    } else {
      console.warn('GameService.getState() not found, cannot update score.');
    } */
  }
}
