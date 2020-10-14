import { Level } from './levelScene';

export class Level1 extends Level {
    constructor() {
      super('Level1')
      this.heights = [4, 7, 5, null, 5, 4, null, 4, 4];
      this.weather = 'afternoon';
    }
  }