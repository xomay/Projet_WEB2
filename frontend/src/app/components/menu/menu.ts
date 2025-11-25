import {Component, inject, signal} from '@angular/core';
import {BackendService, MapDTO} from '../../service/backend-service';
import {GameService} from '../../service/game-service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [
    FormsModule
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})

export class Menu {
  private backendService = inject(BackendService);
  maps = signal<MapDTO[]>([]);
  public gameService = inject(GameService);

  constructor() {
    this.backendService.getMaps().subscribe(maps => {
      this.maps.set(maps);
    })
  }

  selectMap(id: number) {
    this.backendService.selectMap(id);
  }

  selectRandomMap(){
    this.backendService.selectRandomMap();
  }

  deleteMap(id:number){
    this.backendService.deleteMap(id).subscribe(()=> {
      this.backendService.getMaps().subscribe(maps => {
        this.maps.set(maps);
      })
    });
  }
}
