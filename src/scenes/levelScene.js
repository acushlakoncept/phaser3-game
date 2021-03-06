/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { gameState, saveScore } from '../utils/gameState';
import { config } from '../utils/config';
import { createStars } from '../utils/stars';
import { createParallaxBackgrounds } from '../utils/backgrounds';
import { createSnow } from '../utils/snow';
import { createAnimations } from '../utils/animations';
import { levelSetup } from '../utils/levelSetups';
import { addSnowman } from '../utils/addSnowman';
import { addBomb } from '../utils/addBomb';

export class Level extends Phaser.Scene {
  constructor(key) {
    super(key);
    this.levelKey = key;
    this.nextLevel = {
      Credits: 'Intro',
      Intro: 'Level1',
      Level1: 'Level2',
      Level2: 'Level3',
      Level3: 'Level4',
      Level4: 'End',
    };
  }

  create() {
    gameState.active = true;

    gameState.bgColor = this.add
      .rectangle(0, 0, config.width, config.height, 0x00ffbb)
      .setOrigin(0, 0);
    createStars(gameState, this);
    createParallaxBackgrounds(gameState, this);
    gameState.scoreText = this.add.text(16, 16, `score: ${gameState.score}`, {
      fontSize: '32px',
      fill: '#000',
    });
    gameState.player = this.physics.add.sprite(80, 110, 'guy').setScale(1.8);
    gameState.platforms = this.physics.add.staticGroup();
    gameState.starCoins = this.physics.add.group({
      key: 'star',
      repeat: 15,
      allowGravity: false,
    });
    gameState.bombs = this.physics.add.group();

    gameState.starCoins.children.iterate((child) => {
      for (let i = 0; i < 15; i += 1) {
        const xPos = Phaser.Math.Between(100, 1800);
        const yPos = Phaser.Math.Between(80, 200);

        child.x = xPos;
        child.y = yPos;
        child.setOrigin(0, 0);
      }
    });

    createAnimations(this);
    createSnow(gameState, this);
    levelSetup(this, gameState);

    this.cameras.main.setBounds(
      0,
      0,
      gameState.bg3.width,
      gameState.bg3.height,
    );
    this.physics.world.setBounds(
      0,
      0,
      gameState.width,
      gameState.bg3.height + gameState.player.height,
    );

    this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5);
    gameState.player.setCollideWorldBounds(true);
    this.physics.add.collider(gameState.player, gameState.platforms);
    this.physics.add.collider(gameState.goal, gameState.platforms);
    this.physics.add.collider(gameState.bombs, gameState.platforms);

    if (this.scene.key === 'Level1') {
      addSnowman(
        this,
        gameState.snowman,
        gameState.platforms,
        460,
        640,
        1900,
        gameState.player,
        gameState.active,
      );
      addSnowman(
        this,
        gameState.snowman2,
        gameState.platforms,
        1600,
        1800,
        1800,
        gameState.player,
        gameState.active,
      );
    }

    if (this.scene.key === 'Level2') {
      addSnowman(
        this,
        gameState.snowman3,
        gameState.platforms,
        280,
        380,
        1800,
        gameState.player,
        gameState.active,
      );
      addSnowman(
        this,
        gameState.snowman4,
        gameState.platforms,
        905,
        1070,
        1800,
        gameState.player,
        gameState.active,
      );
      addSnowman(
        this,
        gameState.snowman5,
        gameState.platforms,
        1350,
        1450,
        1800,
        gameState.player,
        gameState.active,
      );
      addSnowman(
        this,
        gameState.snowman5,
        gameState.platforms,
        1600,
        1900,
        1800,
        gameState.player,
        gameState.active,
      );
    }

    if (this.scene.key === 'Level3') {
      addSnowman(
        this,
        gameState.snowman7,
        gameState.platforms,
        480,
        620,
        1600,
        gameState.player,
        gameState.active,
      );
      addSnowman(
        this,
        gameState.snowman8,
        gameState.platforms,
        1120,
        1300,
        1500,
        gameState.player,
        gameState.active,
      );
      addSnowman(
        this,
        gameState.snowman9,
        gameState.platforms,
        1780,
        1950,
        1500,
        gameState.player,
        gameState.active,
      );
    }

    if (this.scene.key === 'Level4') {
      addBomb(
        this,
        gameState.bomb,
        gameState.bombs,
        200,
        400,
        gameState.player,
        gameState.active,
      );
      addBomb(
        this,
        gameState.bomb2,
        gameState.bombs,
        500,
        1000,
        gameState.player,
        gameState.active,
      );
      addBomb(
        this,
        gameState.bomb3,
        gameState.bombs,
        800,
        1500,
        gameState.player,
        gameState.active,
      );

      addSnowman(
        this,
        gameState.snowman10,
        gameState.platforms,
        1120,
        1300,
        1600,
        gameState.player,
        gameState.active,
      );
    }

    this.physics.add.overlap(
      gameState.player,
      gameState.starCoins,
      this.collectStar,
      null,
      this,
    );
    gameState.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (gameState.active) {
      if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(gameState.speed);
        gameState.player.anims.play('right', true);
      } else if (gameState.cursors.left.isDown) {
        gameState.player.setVelocityX(-gameState.speed);
        gameState.player.anims.play('left', true);
      } else {
        gameState.player.setVelocityX(0);
        gameState.player.anims.play('idle', true);
      }

      if (
        (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)
          || gameState.cursors.up.isDown)
        && gameState.player.body.touching.down
      ) {
        gameState.player.anims.play('jump', true);
        gameState.player.setVelocityY(-500);
      }

      if (!gameState.player.body.touching.down) {
        gameState.player.anims.play('jump', true);
      }

      if (gameState.player.y > gameState.bg3.height) {
        this.cameras.main.shake(240, 0.01, false, (_camera, progress) => {
          if (progress > 0.9) {
            this.add.text(gameState.player.x, 100, 'Game Over!', {
              fontFamily: 'Arial',
              fontSize: 36,
              color: '#000000',
            });
            setTimeout(() => {
              this.scene.stop(this.levelKey);
              this.scene.start('GameOver');
            }, 1500);
          }
        });
      }
    }
  }

  collectStar(_player, star) {
    star.disableBody(true, true);
    this.sound.add('mouseover').play();

    gameState.score += 10;
    gameState.scoreText.setText(`Score: ${gameState.score}`);
    saveScore();

    if (gameState.starCoins.countActive(true) === 0) {
      gameState.starCoins.children.iterate((child) => {
        child.enableBody(true, child.x, child.y, true, true);
      });
    }
  }
}
