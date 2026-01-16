import {computed, effect, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {PlainTileModel, TileModel, TreeTileModel, WaterTileModel} from '../models/tile-model';
import {AnimalModel, BearModel, FishModel, FoxModel} from '../models/animal-model';
import {BackendService} from './backend-service';
import {MapModel} from '../models/map-model';
import {ScoreService} from './score-service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public playerName: string = '';

  public animalSelected : WritableSignal<AnimalModel | undefined> = signal(undefined);
  public availableAnimals: WritableSignal<Map<string, number>> = signal(new Map<string, number>([
    ['bear', 1],
    ['fish', 0],
    ['fox', 0]
  ]));
  private tilesLeft: Signal<number> = computed(() => {
    const map = this.backendService.currentMap();
    let count = 0;
    map.tiles.forEach(row => {
      row.forEach(tile => {
        if (tile instanceof PlainTileModel || tile instanceof TreeTileModel || tile instanceof WaterTileModel) {
          count += 1;
        }
      });
    });
    return count;
  });
  private fishTilesLeft: Signal<number> = computed(() => {
    const map = this.backendService.currentMap();
    let count = 0;
    map.tiles.forEach(row => {
      row.forEach(tile => {
        if (tile instanceof WaterTileModel) {
          count += 1;
        }
      });
    });
    return count;
  });

  private backendService = inject(BackendService);
  isGameOver: WritableSignal<boolean> = signal(false);
  finalScore: number | null = null;
  private scoreService = inject(ScoreService);

  constructor() {
    // Effect to look for the end of the game when no available animals are left
    effect(() => {
      if (!this.isGameOver() && this.scoreService.score() > 0) {
        let count = 0;
        this.availableAnimals().forEach((element) => {
          count += element;
        })
        if (count === 0) {
          this.endGame();
        }
        if (count - (this.availableAnimals().get('fish') ?? 0) == 0 && this.fishTilesLeft() == 0) {
          this.endGame();
        }
      }
    });

    // Effect to end game if no more tiles are available for placement
    effect(() => {
      if (!this.isGameOver() && this.tilesLeft() === 0) {
        this.endGame();
      }
    });
  }

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
          this.scoreService.score.set(this.scoreService.score() + scoreDelta);
          this.nextTurn();
          this.minusAnimal();
        }
        break;
      case tile instanceof WaterTileModel :
        if (this.animalSelected()! instanceof FishModel) {
          this.backendService.currentMap().tiles[y][x] = this.animalSelected()!.clone();
          //remplacer par la gestion du score
          const scoreDelta = this.backendService.currentMap().tiles.flat().reduce((acc, tile) => acc + tile.points, 0) + this.animalSelected()!.basePoints;
          this.scoreService.score.set(this.scoreService.score() + scoreDelta);
          this.nextTurn();
          this.minusAnimal();
        }
        break;
    }
    this.animalSelected.set(undefined);
    this.resetPoints();
  }

  minusAnimal(): void {
    this.availableAnimals().set(
      this.animalSelected()!.getSrc(),
      this.availableAnimals().get(this.animalSelected()!.getSrc())! - 1);
  }

  nextTurn(): void {
    if (this.isGameOver()) return;
    if (this.scoreService.score() >= this.scoreService.scoreLimit()) {
      this.availableAnimals().forEach((value, key, map) => {
        map.set(key, value + 1);
      });
      this.scoreService.turn.set(this.scoreService.turn() + 1);
      let limScoreTemp = 0;
      for (let i = 1; i < this.scoreService.turn() + 1; i++) {
        limScoreTemp += i * 8;
      }
      this.scoreService.scoreLimit.set(limScoreTemp);
      this.nextTurn();
    }
    return;
  }

  endGame(): void {
    if (this.isGameOver()) return;
    this.isGameOver.set(true);
    this.finalScore = this.scoreService.score();
  }
}
