import {Component, inject} from '@angular/core';
import {GameService} from '../../service/game-service';
import {FormsModule} from '@angular/forms';
import {BackendService} from '../../service/backend-service';
//import { BackendService } from '../../service/backend-service';
@Component({
  selector: 'app-nom-map',
  imports: [
    FormsModule
  ],
  templateUrl: './nom-map.html',
  styleUrl: './nom-map.css'
})
export class NomMap {
  public gameService = inject(GameService);
  public backendService = inject(BackendService);
}

