import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { InteractoModule } from 'interacto-angular';
import { PartialPointOrTouchTypedBinder, UndoableCommand } from 'interacto';

import { TileComponent } from '../tile-component/tile-component';
import { NomMap } from '../nom-map/nom-map';
import { ScoreCircle } from '../score-circle/score-circle';
import { TileMenu } from '../tile-menu/tile-menu';
import { UndoRedo } from '../undo-redo/undo-redo';
import {Router} from '@angular/router';

import { BackendService } from '../../service/backend-service';
import { GameService } from '../../service/game-service';
// import { Subscription } from 'rxjs';
import { MapModel } from '../../models/map-model';
import { TileModel } from '../../models/tile-model';
import { AnimalModel } from '../../models/animal-model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    TileComponent,
    NomMap,
    ScoreCircle,
    TileMenu,
    UndoRedo,
    InteractoModule
  ],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map {

  private backendService = inject(BackendService);
  private gameService = inject(GameService);
  private router = inject(Router);


  protected readonly title = signal('Web2 frontend');

  @ViewChild('cursorImg', { static: false })
  cursorImg!: ElementRef<HTMLImageElement>;

  protected clickChange(
    binder: PartialPointOrTouchTypedBinder,
    x: number,
    y: number
  ): void {
    binder
      .toProduce(() => new Change(x, y, this.gameService, this.backendService))
      .bind();
  }

  public get currentMap() {
    return this.backendService.currentMap();
  }

  get animal() {
    return this.gameService.animalSelected();
  }

  public get status() {
    return this.gameService.isGameOver();
  }

  public get mapName() {
    return this.backendService.currentMap().name;
  }

  public get playerName() {
    return this.gameService.playerName;
  }

  public get finalScore() {
    return this.gameService.finalScore;
  }



  onMouseMove(event: MouseEvent): void {
    if (!this.cursorImg || !this.animal) return;
    const img = this.cursorImg.nativeElement;
    img.style.left = event.clientX + 'px';
    img.style.top = event.clientY + 'px';
  }
}


/* =========================================================
   SNAPSHOT INTERFACE
   ========================================================= */

interface GameSnapshot {
  tile: TileModel;
  score: number;
  turn: number;
  scoreLimit: number;
  //availableAnimals: Record<string, number>;
  selectedAnimal: AnimalModel | undefined;
}

export class Change extends UndoableCommand {

  private snapshot!: GameSnapshot;

  constructor(
    private readonly x: number,
    private readonly y: number,
    private readonly gameService: GameService,
    private readonly backendService: BackendService
  ) {
    super();
  }

  execution(): void {
    const map = this.backendService.currentMap();

    this.snapshot = {
      tile: map.tiles[this.y][this.x],
      score: this.gameService.score,
      scoreLimit: this.gameService.scoreLimit,
      turn: this.gameService.turn,
      //availableAnimals: this.gameService.availableAnimals(),
      selectedAnimal: this.gameService.animalSelected()
    };

    this.gameService.placeAnimal(this.x, this.y);
    console.log("Placed animal at:", this.x, this.y);

  }

  undo(): void {
    const map = this.backendService.currentMap();

    map.tiles[this.y][this.x] = this.snapshot.tile;

    this.gameService.score = this.snapshot.score;
    this.gameService.turn = this.snapshot.turn;
    //this.gameService.availableAnimals.set(this.snapshot.availableAnimals);
    this.gameService.scoreLimit = this.snapshot.scoreLimit;
    this.gameService.animalSelected.set(this.snapshot.selectedAnimal);

    this.backendService.currentMap.set(
      new MapModel(map.name, map.tiles)
    );
  }

  redo(): void {
    this.gameService.placeAnimal(this.x, this.y);
    this.gameService.nextTurn();
  }

  returnToMenu(): void {
    this.router.navigate(['/menu']);
  }

  returnToMenu(): void {
    this.router.navigate(['/menu']);
  }
}
