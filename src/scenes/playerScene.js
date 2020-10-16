/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { gameState, setPlayer } from '../utils/gameState';
import { Level } from './levelScene';

export class Player extends Level {
  constructor() {
    super('Player');
  }

  create() {
    this.add.image(248, 300, 'artboard').setScale(0.7);
    this.add.text(220, 60, 'THE', { fontSize: '25px', fill: '#000000' });
    this.add.text(170, 85, 'ADVENTURES', { fontSize: '25px', fill: '#000000' });
    this.add.text(190, 110, 'OF CUSH', { fontSize: '25px', fill: '#000000' });

    gameState.namePrompt = this.add.text(100, 200, '-- Enter Your Name --', {
      fontSize: '25px',
      fill: '#000000',
    });

    gameState.inputForm = this.add.dom(240, 280).createFromCache('nameform');

    gameState.inputForm.addListener('click');

    const parentScene = this;

    // eslint-disable-next-line func-names
    gameState.inputForm.on('click', function (event) {
      if (event.target.name === 'playButton') {
        const inputText = this.getChildByName('name');

        if (inputText.value !== '') {
          this.removeListener('click');
          this.setVisible(false);

          gameState.playerName = inputText.value;
          setPlayer();

          parentScene.scene.stop(parentScene.levelKey);
          parentScene.scene.start('Intro');
        } else {
          this.scene.tweens.add({
            targets: gameState.namePrompt,
            alpha: 0.2,
            duration: 250,
            ease: 'Power3',
            yoyo: true,
          });
        }
      }
    });

    this.tweens.add({
      targets: gameState.inputForm,
      y: 300,
      duration: 3000,
      ease: 'Power3',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  update() {}
}
