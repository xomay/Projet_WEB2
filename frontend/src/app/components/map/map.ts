import {Component, inject, signal} from '@angular/core';
import { MapModel } from '../../models/map-model';
import { TileComponent } from '../tile-component/tile-component';
import {NomMap} from '../nom-map/nom-map';
import {ScoreCircle} from '../score-circle/score-circle';
import {BackendService} from '../../service/backend-service';

@Component({
  selector: 'app-map',
  imports: [TileComponent, NomMap, ScoreCircle],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map {

  //private tiles = [{ src: '/water.svg' }, { src: '/tree.svg' }, { src: '/plain.svg' }];
  //map = input<MapModel>(new MapModel('My Map'));
  protected readonly title = signal('Web2 frontend');
  map = signal(new MapModel('My Map', [[]]));
  private backendService = inject(BackendService);


  constructor() {
    this.backendService.currentMap
      ? this.map.set(this.backendService.currentMap!)
      : this.map.set(new MapModel('My Map', [[]]));
  }

  protected readonly Math = Math;
  getTile(): string {
    const randomNum = Math.floor(Math.random() * 5);
    if (randomNum == 0 ) return '/water.svg';
    if (randomNum == 1 ) return '/tree.svg';
    return '/plain.svg';
  }
}
