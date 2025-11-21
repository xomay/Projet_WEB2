import { Component, input } from '@angular/core';
import { MapModel } from '../../models/map-model';
import { TileComponent } from '../tile-component/tile-component';

@Component({
  selector: 'app-map',
  imports: [TileComponent],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map {

  //private tiles = [{ src: '/water.svg' }, { src: '/tree.svg' }, { src: '/plain.svg' }];
  //map = input<MapModel>(new MapModel('My Map'));
  map = input<MapModel>();

  protected readonly Math = Math;
  getTile(): string {
    const randomNum = Math.floor(Math.random() * 5);
    if (randomNum == 0 ) return '/water.svg';
    if (randomNum == 1 ) return '/tree.svg';
    return '/plain.svg';
  }
}
