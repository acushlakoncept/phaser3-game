import { Level } from './levelScene';

class Level3 extends Level {
    constructor() {
      super('Level3')
      this.heights = [6, null, 6, 4, 6, 4, 5, null, 4];
      this.weather = 'night';
    }
  }
  