import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { GameService } from './game-service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  score: number = 0;
  turn: number = 0;
  scoreLimit: number = 10;
  public gameService = inject(GameService);
  private subscription: Subscription;

  constructor() {
    this.updateScore();
    this.subscription = this.gameService.changedScore$.subscribe(() => {
      this.updateScore();
    });
  }

  getScore() {
    return { score: this.score, turn: this.turn, scoreLimit: this.scoreLimit };
  }

  updateScore(scoreDelta: number = 0): void {
    this.score = scoreDelta + this.gameService.score();
    this.turn = this.gameService.turn;
    this.scoreLimit = this.gameService.scoreLimit;
  }

  hello(){
    console.log("Hello from ScoreService" + this.subscription);
  }
}
