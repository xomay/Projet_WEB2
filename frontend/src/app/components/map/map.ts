import {Component, ElementRef, inject, signal, ViewChild} from '@angular/core';
import { MapModel } from '../../models/map-model';
import { TileComponent } from '../tile-component/tile-component';
import {NomMap} from '../nom-map/nom-map';
import {ScoreCircle} from '../score-circle/score-circle';
import {BackendService} from '../../service/backend-service';
import {TileMenu} from '../tile-menu/tile-menu';
import {GameService} from '../../service/game-service';

@Component({
  selector: 'app-map',
  imports: [TileComponent, NomMap, ScoreCircle, TileMenu],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map {

  //private tiles = [{ src: '/water.svg' }, { src: '/tree.svg' }, { src: '/plain.svg' }];
  //map = input<MapModel>(new MapModel('My Map'));
  @ViewChild('cursorImg', {static: false}) cursorImg!: ElementRef<HTMLImageElement>;
  protected readonly title = signal('Web2 frontend');
  map = signal(new MapModel('My Map', [[]]));
  private backendService = inject(BackendService);
  private gameService = inject(GameService);
  animal = this.gameService.animalSelected


  constructor() {
    this.backendService.currentMap() !== undefined
      ? this.map.set(this.backendService.currentMap()!)
      : this.map.set(new MapModel('My Map', [[]]));
  }

  onMouseMove(event: MouseEvent) {
    if (!this.cursorImg) return;
    if (this.animal() === undefined) return;
    const img = this.cursorImg.nativeElement;
    if (!img) return;
    img.style.left = event.clientX + 'px';
    img.style.top = event.clientY + 'px';
  }

  protected readonly Math = Math;
  getTile(): string {
    const randomNum = Math.floor(Math.random() * 5);
    if (randomNum == 0 ) return '/water.svg';
    if (randomNum == 1 ) return '/tree.svg';
    return '/plain.svg';
  }

  changeTile(x: number, y: number): void {
    if (this.animal() === undefined) return;
    console.log('Changing tile at', x, y, 'to', this.animal()!.getSrc());
    // this.animal()!.clone();
    switch (this.map().tiles[y][x].getSrc()){
      case 'plain' :
      case 'tree' :
        if (this.animal()!.getSrc() !== 'fish'){
          this.map().tiles[y][x] = this.animal()!.clone();
        }
        break;
      case 'water' :
        if (this.animal()!.getSrc() === 'fish'){
          this.map().tiles[y][x] = this.animal()!.clone();
        }
        break;
    }
    this.gameService.availableAnimals().set(
      this.animal()!.getSrc(),
      this.gameService.availableAnimals().get(this.animal()!.getSrc())! - 1);
    if (this.gameService.availableAnimals().get(this.animal()!.getSrc())! <= 0) {
      this.gameService.animalSelected.set(undefined);
    }
  }
}
