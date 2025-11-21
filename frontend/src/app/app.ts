import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Map} from './components/map/map';
import { MapModel } from './models/map-model';
import { BackendService } from './service/backend-service';
import { NomMap } from './components/nom-map/nom-map';
import { ScoreCircle } from './components/score-circle/score-circle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Map, NomMap, ScoreCircle],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Web2 frontend');
  currentMap = signal(new MapModel('My Map', [[]]));
  private backendService = inject(BackendService);

  constructor() {
    this.backendService.currentMap 
      ? this.currentMap.set(this.backendService.currentMap!) 
      : this.currentMap.set(new MapModel('My Map', [[]]));
  }
}
