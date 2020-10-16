/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { gameState } from '../utils/gameState';
import { Level } from './levelScene';
import { mouseOverEffect } from '../utils/mouserover';
import { fetchLeaderBoardData } from '../utils/leaderboardApi';

export class LeaderBoard extends Level {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    this.add.image(248, 300, 'artboard').setScale(0.7);
    gameState.backButton = this.add.image(240, 470, 'back').setScale(0.4);
    this.add.text(220, 60, 'THE', { fontSize: '25px', fill: '#000000' });
    this.add.text(170, 85, 'ADVENTURES', { fontSize: '25px', fill: '#000000' });
    this.add.text(190, 110, 'OF CUSH', { fontSize: '25px', fill: '#000000' });

    this.add.text(150, 170, 'Top 10 Winners', {
      fontSize: '25px',
      fill: '#000000',
    });

    fetchLeaderBoardData();

    for (let i = 0; i < 10; i += 1) {
      this.add.text(150, 220 + (i * 20), `${i + 1}. ${gameState.board[i][0]} - ${gameState.board[i][1]}`, { fontSize: '15px', fill: '#000000' });
    }

    gameState.backButton.setInteractive({ useHandCursor: true });
    mouseOverEffect(gameState.backButton, this);

    gameState.backButton.on('pointerup', () => {
      this.scene.stop(this.levelKey);
      this.scene.start('Intro');
    });
  }

  update() {}
}
