/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { gameState } from '../utils/gameState';
import { Level } from './levelScene';
import { mouseOverEffect } from '../utils/mouserover';

export class Credits extends Level {
  constructor() {
    super('Credits');
  }

  create() {
    this.add.image(248, 300, 'artboard').setScale(0.7);
    gameState.backButton = this.add.image(240, 470, 'back').setScale(0.4);
    this.add.text(220, 60, 'THE', { fontSize: '25px', fill: '#000000' });
    this.add.text(170, 85, 'ADVENTURES', { fontSize: '25px', fill: '#000000' });
    this.add.text(190, 110, 'OF CUSH', { fontSize: '25px', fill: '#000000' });

    this.add.text(80, 180, 'Created by Uduak Essien', {
      fontSize: '25px',
      fill: '#000000',
    });
    this.add.text(85, 220, 'JavaScript Capstone Project', {
      fontSize: '20px',
      fill: '#000000',
    });
    this.add.text(190, 250, '@Microverseinc', {
      fontSize: '15px',
      fill: '#000000',
    });
    this.add.text(120, 280, 'Acknowledgements', {
      fontSize: '25px',
      fill: '#000000',
    });

    this.add.text(170, 320, '[+] Phaser 3', {
      fontSize: '20px',
      fill: '#000000',
    });
    this.add.text(170, 360, '[+] OpenGameArt', {
      fontSize: '20px',
      fill: '#000000',
    });
    this.add.text(170, 400, '[+] CodeAcademy', {
      fontSize: '20px',
      fill: '#000000',
    });

    gameState.backButton.setInteractive({ useHandCursor: true });
    mouseOverEffect(gameState.backButton, this);

    gameState.backButton.on('pointerup', () => {
      this.scene.stop(this.levelKey);
      this.scene.start(this.nextLevel[this.levelKey]);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  update() {}
}
