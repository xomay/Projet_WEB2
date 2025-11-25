import {Injectable, signal, WritableSignal} from '@angular/core';
import {TileModel} from '../models/tile-model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public score: number = 6;
  public turn: number = 1;
  public scoreLimit: number = 20;

  public playerName: string = 'Default Player';

  public animalSelected : WritableSignal<TileModel | undefined> = signal(undefined);
  public availableAnimals: WritableSignal<Map<string, number>> = signal(new Map<string, number>([
    ['bear', 1],
    ['fish', 1],
    ['fox', 1]
  ]));

  private pastStates: { score: number; turn: number }[] = [];
  private futureStates: { score: number; turn: number }[] = [];
  isGameOver: boolean = false;
  finalScore: number | null = null;

  setAnimalSelected(animal: TileModel): void {
    if (this.availableAnimals().get(animal.getSrc()) === undefined) return;
    else if (this.availableAnimals().get(animal.getSrc())! <= 0) return;
    this.animalSelected.set(animal);
  }

  nextTurn(scoreDelta: number = 0): void {
    if (this.isGameOver) return;
    this.score += scoreDelta;
    this.turn += 1;
    this.futureStates = []; // clear redo history when making a new move
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
