import {Component, inject, input} from '@angular/core';
import { TileModel } from '../../models/tile-model';
import {GameService} from '../../service/game-service';

@Component({
  selector: 'app-tile-component',
  imports: [],
  templateUrl: './tile-component.html',
  styleUrl: './tile-component.css'
})
export class TileComponent {
  tile = input<TileModel>();
  private gameService = inject(GameService);

  computePoints(): void {
    if (this.tile === undefined) return;
    this.gameService.computePoints(this.tile()!);
  }
}
