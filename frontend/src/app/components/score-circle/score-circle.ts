import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreService } from '../../service/score-service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-score-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-circle.html',
  styleUrl: './score-circle.css'
})
export class ScoreCircle {
  public scoreService = inject(ScoreService);

  get score(): number {
    return this.scoreService.score();
  }

  get scoreLimit(): number {
    return this.scoreService.scoreLimit();
  }

  get turn(): number {
    return this.scoreService.turn();
  }

  get percentage(): number {
    return (this.scoreService.score() / this.scoreService.scoreLimit()) * 100;
  }
}
