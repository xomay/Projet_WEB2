import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Grille} from './components/grille/grille';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Grille],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Web2 frontend');
}
