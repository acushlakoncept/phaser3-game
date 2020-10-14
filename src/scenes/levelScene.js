import { gameState } from '../utils/gameState';
import { config } from '../utils/config';
import { createStars } from '../utils/stars';
import { createParallaxBackgrounds } from '../utils/backgrounds';
import { createSnow } from '../utils/snow';
import { createAnimations } from '../utils/animations';
import { levelSetup } from '../utils/levelSetups'; 

export class Level extends Phaser.Scene {
    constructor(key) {
      super(key);
      this.levelKey = key
      this.nextLevel = {
        'Level1': 'Level2',
        'Level2': 'Level3',
        'Level3': 'Level4',
        'Level4': 'Credits',
      }
    }
  
    preload() {
      this.load.image('platform', './assets/platform.png');
      this.load.image('snowflake', './assets/snowflake.png');
      this.load.image('door', './assets/door.png');
      this.load.spritesheet('guy', './assets/guy.png', { frameWidth: 16, frameHeight: 24})
      this.load.image('bg1', './assets/mountain.png');
      this.load.image('bg2', './assets/trees.png');
      this.load.image('bg3', './assets/snowdunes.png');
    }
  
    create() {
      gameState.active = true
  
      gameState.bgColor = this.add.rectangle(0, 0, config.width, config.height, 0x00ffbb).setOrigin(0, 0);
      createStars(gameState, this);
      createParallaxBackgrounds(gameState, this);

      gameState.player = this.physics.add.sprite(80, 110, 'guy').setScale(1.8);
      gameState.platforms = this.physics.add.staticGroup();
  
      createAnimations(this);
  
      createSnow(gameState, this);
  
      levelSetup(this, gameState);
  
      this.cameras.main.setBounds(0, 0, gameState.bg3.width, gameState.bg3.height);
      this.physics.world.setBounds(0, 0, gameState.width, gameState.bg3.height + gameState.player.height);
  
      this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5)
      gameState.player.setCollideWorldBounds(true);
  
      this.physics.add.collider(gameState.player, gameState.platforms);
      this.physics.add.collider(gameState.goal, gameState.platforms);
  
      gameState.cursors = this.input.keyboard.createCursorKeys();
  
    }
  
    update() {
      if(gameState.active){
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
  
        if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space) && gameState.player.body.touching.down) {
          gameState.player.anims.play('jump', true);
          gameState.player.setVelocityY(-500);
        }
  
        if (!gameState.player.body.touching.down){
          gameState.player.anims.play('jump', true);
        }
  
        if (gameState.player.y > gameState.bg3.height) {
          this.cameras.main.shake(240, .01, false, function(camera, progress) {
            if (progress > .9) {
              this.scene.restart(this.levelKey);
            }
          });
        }
      }
    }
  }