import { gameState } from '../utils/gameState';
import { Level } from './levelScene';

export class Intro extends Level {
    constructor() {
      super('Intro');  
    }

    create() {
        gameState.Title = this.add.text(120, 200, 'THE ADVENTURES OF CUSH', { fontSize: '15px', fill: '#000000' });
        gameState.Title.setInteractive({ useHandCursor: true  });
        gameState.Title.on('pointerup', () => {
            this.scene.stop(this.levelKey);
            this.scene.start(this.nextLevel[this.levelKey]);
        })
    }
}