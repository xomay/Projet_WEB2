import { Component } from '@angular/core';

@Component({
  selector: 'app-grille',
  imports: [],
  templateUrl: './grille.html',
  styleUrl: './grille.css'
})
export class Grille {

  protected readonly Math = Math;
  getTile(): string {
    const randomNum = Math.floor(Math.random() * 5);
    if (randomNum == 0 ) return '/water.svg';
    if (randomNum == 1 ) return '/tree.svg';
    return '/plain.svg';
  }
}
