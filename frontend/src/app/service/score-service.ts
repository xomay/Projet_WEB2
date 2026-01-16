import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  public score = signal(0);
  public turn = signal(0);
  public scoreLimit = signal(10);

  constructor() {
    this.updateScore();
  }

  updateScore(scoreDelta: number = 0): void {
    this.score.set(scoreDelta + this.score());
  }
}
