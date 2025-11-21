import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Grille} from './components/grille/grille';
import {ScoreCircle} from './components/score-circle/score-circle';
  import { NomMap } from './components/nom-map/nom-map';

  @Component({
    selector: 'app-root',
    imports: [RouterOutlet, Grille, ScoreCircle, NomMap],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Web2 frontend');
}
