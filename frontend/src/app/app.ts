import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapModel } from './models/map-model';
import { BackendService } from './service/backend-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Web2 frontend');
  currentMap = signal(new MapModel('My Map', [[]]));
  private backendService = inject(BackendService);

  constructor() {
    this.backendService.currentMap() !== undefined
      ? this.currentMap.set(this.backendService.currentMap()!)
      : this.currentMap.set(new MapModel('My Map', [[]]));
  }
}
