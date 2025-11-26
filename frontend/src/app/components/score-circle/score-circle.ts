import { Component , OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreService } from '../../service/score-service';
import { inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../../service/game-service';

@Component({
  selector: 'app-score-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-circle.html',
  styleUrl: './score-circle.css'
})
export class ScoreCircle implements OnInit, OnDestroy {
  score: number = 0;
  scoreLimit: number = 0;
  turn: number = 0;
  private subscription: Subscription = new Subscription();
  public gameService = inject(GameService);
  public scoreService = inject(ScoreService);

  ngOnInit(): void {
    this.updateScore();
    
    // Suscribirse a los cambios del score
    this.subscription = this.gameService.changedScore$.subscribe(() => {
      setTimeout(() => this.updateScore(), 1000);
      this.updateScore();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateScore() {
    const state = this.scoreService.getScore();
    if (state) {
      this.score = state.score;
      this.turn = state.turn;
      this.scoreLimit = state.scoreLimit;
    }
  }

  get percentage(): number {
    return (this.score / this.scoreLimit) * 100;
  }
}