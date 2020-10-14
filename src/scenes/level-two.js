import { Level } from './levelScene';

export class Level2 extends Level {
    constructor() {
      super('Level2')
      this.heights = [5, 4, null, 4, 6, 4, 6, 5, 5];
      this.weather = 'twilight';
    }
  }