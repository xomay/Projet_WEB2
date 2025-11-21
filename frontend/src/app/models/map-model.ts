import { TileModel } from "./tile-model";

export class MapModel {
    public readonly name: string = '';
    public tiles: TileModel[][] = [[]];
    constructor(name: string, tiles: TileModel[][]) {
        this.name = name;
        this.tiles = tiles;
    }

    public getTile(x: number, y: number): TileModel | undefined {
        return this.tiles[y]?.[x];
    }

    public isFull(): boolean {
        return this.tiles.length >= 100;
    }
}
