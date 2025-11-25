import {TileModel} from './tile-model';

export abstract class AnimalModel extends TileModel{
  public readonly basePoints: number;
  public readonly radius: number;
  constructor(src: string, x: number, y: number, basePoints: number, radius: number) {
    super(src, x, y);
    this.basePoints = basePoints;
    this.radius = radius;
  }
}

export class BearModel extends AnimalModel {
  constructor(x: number, y: number) {
    super('/bear.svg', x, y, 5, 2);
  }

  override getSrc(): string{
    return 'bear';
  }

  override clone(): TileModel {
    return new BearModel(this.x, this.y);
  }
}

export class FishModel extends AnimalModel {
  constructor(x: number, y: number) {
    super('/fish.svg', x, y, 3, 1);
  }

  override getSrc(): string{
    return 'fish';
  }

  override clone(): TileModel {
    return new FishModel(this.x, this.y);
  }
}

export class FoxModel extends AnimalModel {
  constructor(x: number, y: number) {
    super('/fox.svg', x, y, 4, 2);
  }

  override getSrc(): string{
    return 'fox';
  }

  override clone(): TileModel {
    return new FoxModel(this.x, this.y);
  }
}
