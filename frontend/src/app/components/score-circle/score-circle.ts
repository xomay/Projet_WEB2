import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-score-circle',
  imports: [],
  templateUrl: './score-circle.html',
  styleUrl: './score-circle.css'
})
export class ScoreCircle {
  @Input() score: number = 0;
  @Input() max: number = 30;
  @Input() turn: number = 1;

  get percentage(): number {
    return (this.score / this.max) * 100;
  }
}

