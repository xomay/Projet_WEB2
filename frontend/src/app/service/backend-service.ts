import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import { MapModel } from '../models/map-model';
import {PlainTileModel, TileModel, TreeTileModel, WaterTileModel} from '../models/tile-model';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Router} from '@angular/router';

class MapFactory {
  public createMapFromDTO(dto: MapDTO): MapModel {
    const tilesArray: string[] = dto.tiles.split(',');
    const size = Math.sqrt(tilesArray.length);
    const tiles: TileModel[][] = [];
    for (let y = 0; y < size; y++) {
      const row: TileModel[] = [];
      for (let x = 0; x < size; x++) {
        const type = tilesArray[y * size + x];
        let tile;
        switch (type) {
          case 'water':
            tile = new WaterTileModel(Number(x), Number(y));
            break;
          case 'tree':
            tile = new TreeTileModel(Number(x), Number(y));
            break;
          case 'plain':
          default:
            tile = new PlainTileModel(Number(x), Number(y));
            break;
        }
        row.push(tile);
      }
      tiles.push(row);
    }
    return new MapModel(dto.name, tiles);
  }

  public createDTOFromMap(map: MapModel): MapCreateDTO {
    return {
      name: map.name,
      tiles: map.tiles.flat().map(tile => tile.getSrc()).toString()
    }
  }
}

// Map DTO
export interface MapDTO {
  id: number;
  name: string;
  tiles: string;
}

export interface MapCreateDTO {
  name: string;
  tiles: string;
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
  private maps: MapDTO[] = [];
  public currentMap: WritableSignal<MapModel>;
  protected readonly Math = Math;
  private mapFactory =  new MapFactory();
  private client = inject(HttpClient)
  private readonly router = inject(Router);

  constructor() {
    this.currentMap = signal<MapModel>(this.getRandomMap());
  }

  getRandomMap(): MapModel {
    var list = []
    for (var i = 0; i<8; i++){
      var sublist = []
      for (var j = 0; j<8; j++){
        const randomNum = Math.floor(Math.random() * 5);
        if (randomNum == 0 ) sublist.push(new WaterTileModel(j,i));
        else if (randomNum == 1 ) sublist.push(new TreeTileModel(j,i));
        else sublist.push(new PlainTileModel(j,i));
      }
      list.push(sublist);
    }
    return new MapModel([...Array(10)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join(''), list);
  }

  getMaps(): Observable<MapDTO[]> {
    /* Call to backend API  to retrieve maps */
    return this.client.get<MapDTO[]>('/api/v1/maps/');
  }

  getMapById(id: number): Observable<MapModel> {
    return this.client.get<MapDTO>(`api/v1/map/${id}`).pipe(
      map(dto => this.mapFactory.createMapFromDTO(dto))
    );
  }

  selectMap(id: number): void {
    const map = this.getMapById(id);
    map.subscribe((map: MapModel) => {
      this.currentMap.set(map);
      this.router.navigate(['/map']);
    })
  }

  selectRandomMap(): void {
    const createMap = this.mapFactory.createDTOFromMap(this.getRandomMap());
    this.client.post<MapDTO>('/api/v1/maps', createMap).subscribe({
      next: (dto: MapDTO) => {
        const activeMap = this.mapFactory.createMapFromDTO(dto);
        this.currentMap.set(activeMap);
        this.router.navigate(['/map']);
      },
      error: (err) => {
        console.error('Erreur lors de la création de la map :', err);
      }
    });
  }

  saveMap(map: MapDTO): MapDTO {
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

  deleteMap(id: number) {
    //Logic that calls the backend to delete the map with the given id
    return this.client.delete(`api/v1/map/${id}`);
  }
}
