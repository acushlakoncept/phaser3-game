import { gameState } from '../utils/gameState';
import { Level } from './levelScene';
import { mouseOverEffect } from '../utils/mouserover';

export class GameOver extends Level {
    constructor() {
      super('GameOver');  
    }

    create() {
        this.add.image(248, 300, 'artboard').setScale(.7);
        this.add.text(220, 60, 'THE', { fontSize: '25px', fill: '#000000' });
        this.add.text(170, 85, 'ADVENTURES', { fontSize: '25px', fill: '#000000' });
        this.add.text(190, 110, 'OF CUSH', { fontSize: '25px', fill: '#000000' });

        this.add.text(100, 180, '-- Game Over --', { fontSize: '35px', fill: '#000000' });

        this.add.text(135, 230, 'Total Scores: ' + gameState.score, { fontSize: '25px', fill: '#000000' });

        gameState.replay = this.add.text(130, 280, '[+] Play Again', { fontSize: '20px', fill: '#000000' });
        gameState.mainMenu = this.add.text(130, 320, '[+] Back to Main Menu', { fontSize: '20px', fill: '#000000' });

        gameState.replay.setInteractive({ useHandCursor: true  });
        gameState.mainMenu.setInteractive({ useHandCursor: true  });
        mouseOverEffect(gameState.replay, this)
        mouseOverEffect(gameState.mainMenu, this)

        gameState.replay.on('pointerup', () => {
            this.scene.stop(this.levelKey);
            this.scene.start('Level1');
        })

        gameState.mainMenu.on('pointerup', () => {
            this.scene.stop(this.levelKey);
            this.scene.start('Intro');
        })

    }

    update() {

    }
}