export abstract class TileModel {
    public readonly src: string;
    public readonly x : number;
    public readonly y: number;
    public points: number = 0;
    constructor(src: string, x: number, y: number) {
        this.src = src;
        this.x = x;
        this.y = y;
    }

    abstract getSrc(): string;
    abstract clone(): TileModel;
}

export class WaterTileModel extends TileModel {
    constructor(x: number, y: number) {
        super('/water.svg', x, y);
    }

    override getSrc(): string{
      return 'water';
    }

    override clone(): TileModel {
      return new WaterTileModel(this.x, this.y);
    }
}

export class TreeTileModel extends TileModel {
    constructor(x: number, y: number) {
        super('/tree.svg', x, y);
    }

    override getSrc(): string{
      return 'tree';
    }

    override clone(): TileModel {
      return new TreeTileModel(this.x, this.y);
    }
}

export class PlainTileModel extends TileModel {
    constructor(x: number, y: number) {
        super('/plain.svg', x, y);
    }

    override getSrc(): string{
      return 'plain';
    }

    override clone(): TileModel {
      return new PlainTileModel(this.x, this.y);
    }
}
