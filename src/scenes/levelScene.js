import { gameState } from '../utils/gameState';
import { config } from '../utils/config';
import { setWeather } from '../utils/weather';
import { createStars } from '../utils/stars';
import { createParallaxBackgrounds } from '../utils/backgrounds';
import { createSnow } from '../utils/snow';
import { createAnimations } from '../utils/animations';

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
  
      this.levelSetup();
  
      this.cameras.main.setBounds(0, 0, gameState.bg3.width, gameState.bg3.height);
      this.physics.world.setBounds(0, 0, gameState.width, gameState.bg3.height + gameState.player.height);
  
      this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5)
      gameState.player.setCollideWorldBounds(true);
  
      this.physics.add.collider(gameState.player, gameState.platforms);
      this.physics.add.collider(gameState.goal, gameState.platforms);
  
      gameState.cursors = this.input.keyboard.createCursorKeys();
  
    }
  
    createPlatform(xIndex, yIndex) {
        if (typeof yIndex === 'number' && typeof xIndex === 'number') {
          gameState.platforms.create((220 * xIndex),  yIndex * 70, 'platform').setOrigin(0, 0.5).refreshBody();
        }
    }
  
    levelSetup() {
      for (const [xIndex, yIndex] of this.heights.entries()) {
        this.createPlatform(xIndex, yIndex);
      }
 
      gameState.goal = this.physics.add.sprite(gameState.width - 20, 120, 'door').setScale(.4);
  
      this.physics.add.overlap(gameState.player, gameState.goal, function() {
        this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
          if (progress > .9) {
            this.scene.stop(this.levelKey);
            this.scene.start(this.nextLevel[this.levelKey]);
          }
        });
      }, null, this);
  
      setWeather(this.weather, gameState);
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