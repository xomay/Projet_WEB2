import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {PlainTileModel, TileModel, TreeTileModel, WaterTileModel} from '../models/tile-model';
import {AnimalModel, BearModel, FishModel, FoxModel} from '../models/animal-model';
import {BackendService} from './backend-service';
import {MapModel} from '../models/map-model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public score: number = 0;
  public turn: number = 1;
  public scoreLimit: number = 8;
  private changedscoreSubject = new Subject<void>();
  public changedScore$ = this.changedscoreSubject.asObservable();

  public playerName: string = '';

public animalSelected : WritableSignal<AnimalModel | undefined> = signal(undefined);
  public availableAnimals: WritableSignal<Map<string, number>> = signal(new Map<string, number>([
    ['bear', 1],
    ['fish', 0],
    ['fox', 0]
  ]));

  private backendService = inject(BackendService);

  private pastStates: { score: number; turn: number }[] = [];
  private futureStates: { score: number; turn: number }[] = [];
  isGameOver: boolean = false;
  finalScore: number | null = null;

  setAnimalSelected(animal: AnimalModel): void {
    if (this.availableAnimals().get(animal.getSrc()) === undefined) return;
    else if (this.availableAnimals().get(animal.getSrc())! <= 0) return;
    this.animalSelected.set(animal);
  }

  computePoints(tile: TileModel): void {
    if (this.animalSelected() === undefined) return;
    this.resetPoints();
    const x = tile.x;
    const y = tile.y;
    switch (true) {
      case tile instanceof WaterTileModel:
        if (this.animalSelected()! instanceof FishModel) {
          const map = this.backendService.currentMap();
          map.tiles[y][x].points = this.animalSelected()!.basePoints;
          map.tiles = this.computeRadius(x, y, map.tiles);
          const newTiles = map.tiles.slice();
          this.backendService.currentMap.set(new MapModel(map.name, newTiles));
        }
        break;

      case tile instanceof PlainTileModel:
      case tile instanceof TreeTileModel:
        if (!(this.animalSelected()! instanceof FishModel)) {
          const map = this.backendService.currentMap();
          map.tiles[y][x].points = this.animalSelected()!.basePoints;
          map.tiles = this.computeRadius(x, y, map.tiles);
          const newTiles = map.tiles.slice();
          this.backendService.currentMap.set(new MapModel(map.name, newTiles));
        }
        break;
    }
  }

  resetPoints(): void {
    const map = this.backendService.currentMap();
    map.tiles.map((row) => row.map((tile: TileModel) => {tile.points = 0;}));
    this.backendService.currentMap.set(new MapModel(map.name, map.tiles));
  }

  computeRadius(x: number, y: number, tiles: TileModel[][]): TileModel[][] {
    const radius = this.animalSelected()!.radius;
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        if (dx == 0 && dy == 0) continue; // skip center tile
        const tile = tiles[y + dy]?.[x + dx];
        switch (true) {
          case tile instanceof PlainTileModel:
            if (this.animalSelected() instanceof FoxModel) {
              tiles[y + dy][x + dx].points += 7;
            }
            break;
          case tile instanceof TreeTileModel:
            if (this.animalSelected() instanceof BearModel) {
              tiles[y + dy][x + dx].points += 4;
            }
            break;
          case tile instanceof WaterTileModel:
            if (this.animalSelected() instanceof FishModel) {
              tiles[y + dy][x + dx].points += 5;
            }
            break;
          case tile instanceof FishModel:
            if (this.animalSelected() instanceof BearModel) {
              tiles[y + dy][x + dx].points += 7;
            }
            if (this.animalSelected() instanceof FishModel) {
              tiles[y + dy][x + dx].points -= 2;
            }
            break;
          case tile instanceof FoxModel:
            if (!(this.animalSelected() instanceof FishModel)) {
              tiles[y + dy][x + dx].points -= 2;
            }
            break;
          case tile instanceof BearModel:
            if (this.animalSelected() instanceof BearModel) {
              tiles[y + dy][x + dx].points -= 5;
            }
            break;
          default:
            break;
        }
      }
    }
    return tiles;
  }

  placeAnimal(x:number, y:number): void {
    if (this.animalSelected() === undefined) return;
    const tile = this.backendService.currentMap().tiles[y][x];
    switch (true){
      case tile instanceof PlainTileModel :
      case tile instanceof TreeTileModel :
        if (!(this.animalSelected()! instanceof FishModel)){
          this.backendService.currentMap().tiles[y][x] = this.animalSelected()!.clone();
          //remplacer par la gestion du score
          const scoreDelta = this.backendService.currentMap().tiles.flat().reduce((acc, tile) => acc + tile.points, 0) + this.animalSelected()!.basePoints;
          this.score += scoreDelta;
          console.log("Points gagnés : ", scoreDelta);
          this.nextTurn();
          this.minusAnimal();
        }
        break;
      case tile instanceof WaterTileModel :
        if (this.animalSelected()! instanceof FishModel) {
          this.backendService.currentMap().tiles[y][x] = this.animalSelected()!.clone();
          //remplacer par la gestion du score
          const scoreDelta = this.backendService.currentMap().tiles.flat().reduce((acc, tile) => acc + tile.points, 0) + this.animalSelected()!.basePoints;
          this.score += scoreDelta;
          this.nextTurn();
          console.log("Points gagnés : ", scoreDelta);
          this.minusAnimal();
        }
        break;
    }
    if (this.availableAnimals().get(this.animalSelected()!.getSrc())! <= 0) {
      this.animalSelected.set(undefined);
    }
    this.resetPoints();
  }

  minusAnimal(): void {
    this.availableAnimals().set(
      this.animalSelected()!.getSrc(),
      this.availableAnimals().get(this.animalSelected()!.getSrc())! - 1);
  }

  nextTurn(): void {
    if (this.isGameOver) return;
    if (this.score >= this.scoreLimit) {
    this.turn += 1;
     let limScoreTemp = 0;
    for (let i = 1; i < this.turn + 1; i++) {
      limScoreTemp += i * 8;
    }
    this.scoreLimit = limScoreTemp;
    this.changedscoreSubject.next();
    this.futureStates = []; // clear redo history when making a new move
    console.log("Tour suivant : ", this.turn, "Score limite : ", this.scoreLimit);
    this.nextTurn();
    }
    return;
  }

  endGame(): void {
    if (this.isGameOver) return;
    this.isGameOver = true;
    this.finalScore = this.score;
    // optionally keep final state in history
  }

  undo(): boolean {
    if (this.pastStates.length === 0) return false;
    const previous = this.pastStates.pop()!;
    this.futureStates.push({ score: this.score, turn: this.turn });
    this.score = previous.score;
    this.turn = previous.turn;
    this.isGameOver = false;
    this.finalScore = null;
    return true;
  }

  redo(): boolean {
    if (this.futureStates.length === 0) return false;
    const next = this.futureStates.pop()!;
    this.pastStates.push({ score: this.score, turn: this.turn });
    this.score = next.score;
    this.turn = next.turn;
    return true;
  }
}
