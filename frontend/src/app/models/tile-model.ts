export abstract class TileModel {
    public readonly src: string;
    public readonly x : number;
    public readonly y: number;
    constructor(src: string, x: number, y: number) {
        this.src = src;
        this.x = x;
        this.y = y;
    }

    abstract getSrc(): string;
}

export class WaterTileModel extends TileModel {
    constructor(x: number, y: number) {
        super('/water.svg', x, y);
    }

    override getSrc(): string{
      return 'water';
    }
}

export class TreeTileModel extends TileModel {
    constructor(x: number, y: number) {
        super('/tree.svg', x, y);
    }

    override getSrc(): string{
      return 'tree';
    }
}

export class PlainTileModel extends TileModel {
    constructor(x: number, y: number) {
        super('/plain.svg', x, y);
    }

    override getSrc(): string{
      return 'plain';
    }
}
