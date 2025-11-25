import {Component, ElementRef, inject, signal, ViewChild} from '@angular/core';
import { TileComponent } from '../tile-component/tile-component';
import {NomMap} from '../nom-map/nom-map';
import {ScoreCircle} from '../score-circle/score-circle';
import {BackendService} from '../../service/backend-service';
import {TileMenu} from '../tile-menu/tile-menu';
import {GameService} from '../../service/game-service';
import { UndoRedo } from '../undo-redo/undo-redo';

@Component({
  selector: 'app-map',
  imports: [TileComponent, NomMap, ScoreCircle, TileMenu, UndoRedo],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map {

  //private tiles = [{ src: '/water.svg' }, { src: '/tree.svg' }, { src: '/plain.svg' }];
  //map = input<MapModel>(new MapModel('My Map'));
  @ViewChild('cursorImg', {static: false}) cursorImg!: ElementRef<HTMLImageElement>;
  protected readonly title = signal('Web2 frontend');
  private backendService = inject(BackendService);
  private gameService = inject(GameService);

  public get currentMap() {
    return this.backendService.currentMap();
  }

  public get animal() {
    return this.gameService.animalSelected();
  }

  onMouseMove(event: MouseEvent) {
    if (!this.cursorImg) return;
    if (this.gameService.animalSelected() === undefined) return;
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
    this.gameService.placeAnimal(x, y);
  }
}
