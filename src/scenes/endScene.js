/* eslint-disable import/no-cycle */
import { gameState } from '../utils/gameState';
import { Level } from './levelScene';
import { mouseOverEffect } from '../utils/mouserover';
import { postLeaderBoardData } from '../utils/leaderboardApi';

// eslint-disable-next-line import/prefer-default-export
export class End extends Level {
  constructor() {
    super('End');
  }

  create() {
    this.add.image(248, 300, 'artboard').setScale(0.7);
    gameState.backButton = this.add.image(240, 470, 'back').setScale(0.4);
    this.add.text(220, 60, 'THE', { fontSize: '25px', fill: '#000000' });
    this.add.text(170, 85, 'ADVENTURES', { fontSize: '25px', fill: '#000000' });
    this.add.text(190, 110, 'OF CUSH', { fontSize: '25px', fill: '#000000' });

    this.add.text(120, 280, '-- The End --', {
      fontSize: '35px',
      fill: '#000000',
    });

    this.add.text(135, 350, `Total Scores: ${gameState.score}`, {
      fontSize: '25px',
      fill: '#000000',
    });

    postLeaderBoardData(gameState.playerName, gameState.score);

    gameState.backButton.setInteractive({ useHandCursor: true });
    mouseOverEffect(gameState.backButton, this);

    gameState.backButton.on('pointerup', () => {
      this.scene.stop(this.levelKey);
      this.scene.start('Intro');
    });
  }

  // eslint-disable-next-line class-methods-use-this
  update() {}
}
