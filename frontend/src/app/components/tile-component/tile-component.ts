import { Component, input } from '@angular/core';
import { TileModel } from '../../models/tile-model';

@Component({
  selector: 'app-tile-component',
  imports: [],
  templateUrl: './tile-component.html',
  styleUrl: './tile-component.css'
})
export class TileComponent {
  tile = input<TileModel>();
}
