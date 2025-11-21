import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreService } from '../../service/score-service';

@Component({
  selector: 'app-score-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-circle.html',
  styleUrl: './score-circle.css'
})
export class ScoreCircle {
  score: number = 0;
  scoreLimit: number = 30;
  turn: number = 1;
  scoreService: ScoreService;
  constructor(scoreService: ScoreService) {
    this.scoreService = scoreService;
  }

  ngOnInit(): void {
    const state = this.scoreService.getScore?.();
    if (state !== undefined) {
      this.assignFromState(state, s => {
        this.score = s.score ?? this.score;
        this.scoreLimit = s.scoreLimit ?? this.scoreLimit;
        this.turn = s.turn ?? this.turn;
      });
    }
  }

  private assignFromState(
    value: any,
    setter: (s: { score?: number; turn?: number; scoreLimit?: number }) => void
  ) {
    if (value && typeof value.subscribe === 'function') {
      value.subscribe((v: any) => setter(v));
    } else {
      setter(value);
    }
  }

  get percentage(): number {
    return (this.score / this.scoreLimit) * 100;
  }
}