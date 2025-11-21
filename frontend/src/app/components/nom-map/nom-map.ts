import { Component, EventEmitter, Output } from '@angular/core';
//import { BackendService } from '../../service/backend-service';
@Component({
  selector: 'app-nom-map',
  imports: [],
  templateUrl: './nom-map.html',
  styleUrl: './nom-map.css'
})
export class NomMap {
  mapName: string = 'First Map';
  playerName: string = 'ieshu666';

  @Output() playerNameChange = new EventEmitter<string>();

  /*constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.getMapName().subscribe(name => {
      this.mapName = name;
    });
  }
*/
  onPlayerNameChange() {
    this.playerNameChange.emit(this.playerName);
  }
}

