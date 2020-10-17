/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import Phaser from 'phaser';

export class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.image('platform', './assets/platform.png');
    this.load.image('snowflake', './assets/snowflake.png');
    this.load.image('door', './assets/door.png');
    this.load.spritesheet('guy', './assets/guy.png', {
      frameWidth: 16,
      frameHeight: 24,
    });
    this.load.image('bg1', './assets/mountain.png');
    this.load.image('bg2', './assets/trees.png');
    this.load.image('bg3', './assets/snowdunes.png');
    this.load.spritesheet('play', './assets/play.png', {
      frameWidth: 400,
      frameHeight: 170,
    });
    this.load.image('artboard', './assets/artboard.png');
    this.load.image('options', './assets/options.png');
    this.load.image('leaderboard', './assets/leaderboard.png');
    this.load.image('credits', './assets/credits.png');
    this.load.image('back', './assets/back.png');
    this.load.image('star', './assets/star.png');
    this.load.audio('mouseover', './assets/mouseover.wav');
    this.load.spritesheet('snowman', './assets/snowman.png', {
      frameWidth: 50,
      frameHeight: 70,
    });
    this.load.image('bomb', 'assets/bomb.png');
    this.load.html('nameform', 'assets/inputform.html');
    this.load.html('updatename', 'assets/updatename.html');
    this.load.image('arrowkeys', 'assets/left_right_keys.png');

    this.graphics = this.add.graphics();
    this.newGraphics = this.add.graphics();
    const progressBar = new Phaser.Geom.Rectangle(200, 200, 400, 50);
    const progressBarFill = new Phaser.Geom.Rectangle(205, 205, 290, 40);

    this.graphics.fillStyle(0x000000, 1);
    this.graphics.fillRectShape(progressBar);

    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(progressBarFill);

    const loadingText = this.add.text(250, 260, 'Loading: ', { fontSize: '32px', fill: '#000' });

    this.load.on('progress', this.updateBar, { newGraphics: this.newGraphics, loadingText });
    this.load.on('complete', this.complete, { scene: this.scene });
  }

  updateBar(percentage) {
    this.newGraphics.clear();
    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(205, 205, percentage * 390, 40));

    percentage *= 100;
    this.loadingText.setText(`Loading: ${percentage.toFixed(2)}%`);
  }

  complete() {
    this.scene.start('Player');
  }
}
