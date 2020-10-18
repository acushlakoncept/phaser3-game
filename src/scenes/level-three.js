/* eslint-disable import/no-cycle */
import { Level } from './levelScene';

// eslint-disable-next-line import/prefer-default-export
export class Level3 extends Level {
  constructor() {
    super('Level3');
    this.heights = [6, null, 6, 4, 6, 4, 5, null, 4];
    this.weather = 'night';
  }
}
