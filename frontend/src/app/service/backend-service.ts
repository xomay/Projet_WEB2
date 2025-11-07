import { Injectable } from '@angular/core';
import { MapModel } from '../models/map-model';
import { PlainTileModel, TreeTileModel, WaterTileModel } from '../models/tile-model';

// Map DTO
export interface Map {
  name: string;
  tiles: Tile[];
}

export interface Tile {
  x: number;
  y: number;
  type: string;
  piece: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private maps: Map[] = [];
  public currentMap: MapModel | null = null;
  protected readonly Math = Math;

  constructor() { 
    this.currentMap = this.getRandomMap();
  }

  getRandomMap(): MapModel {
    var list = []
    for (var i = 0; i<10; i++){
      var sublist = []
      for (var j = 0; j<10; j++){
        const randomNum = Math.floor(Math.random() * 5);
        if (randomNum == 0 ) sublist.push(new WaterTileModel(j,i));
        else if (randomNum == 1 ) sublist.push(new TreeTileModel(j,i));
        else sublist.push(new PlainTileModel(j,i));
      }
      list.push(sublist);
    }
    return new MapModel('Random Map', list);
  }

  getMaps(): Map[] {
    /* Call to backend API  to retrieve maps */
    // this.maps = this.http.get<Map[]>('/api/v1/maps/');
    // The backend should return an array of maps in DTO format
    const tiles: Tile[] = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        tiles.push({ x, y, type: 'plain', piece: '' });
      }
    }
    const tiles2: Tile[] = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        tiles2.push({ x, y, type: 'tree', piece: '' });
      }
    }
    this.maps = [
      {name: 'Map with plains', tiles: tiles },
      {name: 'Map with trees', tiles: tiles2 }
    ];
    return this.maps; //needs to be replace by a MapModel return using a MapFactory
  }

  getMapById(id: number): Map | undefined {
    // We call the backend to get the map with the given id
    // Example: map = this.http.get<Map>(`api/v1/map/{id}`);
    const tiles3: Tile[] = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        tiles3.push({ x, y, type: 'water', piece: '' });
      }
    }
    const map: Map = { name: `MapById ${id}`, tiles: tiles3 };
    return map;
  }

  saveMap(map: Map): Map {
    /* Logic that calls the backend to create a new map and assigns it an ID
    // Example: 
    this.http.post('api/v1/map/', currentMap).subscribe(response => {
    this.maps.push(response);
    this.currentMap = response;
    }); */

    //hardcoded example logic
    this.maps.push(map);
    return map;
  }

  deleteMap(id: number): boolean {
    /* Logic that calls the backend to delete the map with the given id
    // Example:
    this.http.delete(`api/v1/map/${id}`).subscribe(() => {
      this.getMaps(); // Refresh the maps list
    }); */
    //hardcoded example logic
    this.maps.splice(id, 1);
    this.getMaps();
    return true;
  }
}
