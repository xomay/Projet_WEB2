export abstract class TileModel {
    public readonly src: string;
    public readonly x : number;
    public readonly y: number;
    constructor(src: string, x: number, y: number) {
        this.src = src;
        this.x = x;
        this.y = y;
    }
}

export class WaterTileModel extends TileModel {
    constructor(x: number, y: number) {
        super('/water.svg', x, y);
    }
}

export class TreeTileModel extends TileModel {
    constructor(x: number, y: number) {
        super('/tree.svg', x, y);
    }
}

export class PlainTileModel extends TileModel {
    constructor(x: number, y: number) {
        super('/plain.svg', x, y);
    }
}
