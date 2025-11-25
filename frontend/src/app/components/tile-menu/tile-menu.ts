import {Component, inject} from '@angular/core';
import {GameService} from '../../service/game-service';
import {AnimalModel, BearModel, FishModel, FoxModel} from '../../models/animal-model';

@Component({
  selector: 'app-tile-menu',
  imports: [],
  templateUrl: './tile-menu.html',
  styleUrl: './tile-menu.css'
})
export class TileMenu {
  public gameService = inject(GameService);
  public bear = new BearModel(0,0);
  public fish = new FishModel(0,0);
  public fox = new FoxModel(0,0);

  setActiveAnimal(animal: AnimalModel): void {
    console.log(`Selected animal set to: ${animal.getSrc()}`);
    this.gameService.setAnimalSelected(animal);
    // Here you would typically notify other parts of your application
    // about the selected tile type, e.g., via a service or state management.
  }
}
