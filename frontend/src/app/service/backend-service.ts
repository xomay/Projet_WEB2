import { Injectable } from '@angular/core';

// Map DTO
export interface Map {
  id: number;
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
  private currentMap: Map | null = null;

  getMaps(): Map[] {
    /* Call to backend API  to retrieve maps */
    // this.maps = this.http.get<Map[]>('/api/maps');
    const tiles: Tile[] = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        tiles.push({ x, y, type: 'plain', piece: '' });
      }
    }
    const tiles2: Tile[] = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        tiles2.push({ x, y, type: 'free', piece: '' });
      }
    }
    this.maps = [
      { id: 1, name: 'Map 1', tiles: tiles },
      { id: 2, name: 'Map 2', tiles: tiles2 }
    ];
    return this.maps;
  }

  /**
   * Retrieve a map by id.
   * Returns undefined if not found.
   */
  getMapById(id: number): Map | undefined {
    this.getMaps(); // Ensure maps are loaded
    return this.maps.find(m => m.id === id);
  }

  saveMap(map: Map): Map {
    if (map.id != 0) {
      const idx = this.maps.findIndex(m => m.id === map.id);
      if (idx !== -1) {
        this.maps[idx] = map;
        this.currentMap = map;
        return map;
      }
    }

    
    /* Logic that calls the backend to create a new map and assigns it an ID
    // Example: 
    this.http.post('/api/maps', map).subscribe(response => {
    map.id = response.id;
    this.maps.push(map);
    this.currentMap = map;
    }); */

    //hardcoded example logic
    this.getMaps(); // Ensure maps are loaded
    map.id = this.maps.length; // Simple ID assignment for example purposes
    this.currentMap = map;
    this.maps.push(map);
    return map;
  }
}
