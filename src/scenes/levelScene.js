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
      this.levelKey = key
      this.nextLevel = {
        'Credits': 'Intro',
        'Intro': 'Level4',
        'Level1': 'Level2',
        'Level2': 'Level3',
        'Level3': 'Level4',
        'Level4': 'End',
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
      this.load.spritesheet('play', './assets/play.png', { frameWidth: 400, frameHeight: 170});
      this.load.image('artboard', './assets/artboard.png');
      this.load.image('options', './assets/options.png');
      this.load.image('leaderboard', './assets/leaderboard.png');
      this.load.image('credits', './assets/credits.png');
      this.load.image('back', './assets/back.png');
      this.load.image('star', './assets/star.png');
      this.load.audio('mouseover', './assets/mouseover.wav');
      this.load.spritesheet('snowman', './assets/snowman.png', { frameWidth: 50, frameHeight: 70 });
      this.load.image("bomb", "assets/bomb.png");
      this.load.html('nameform', 'assets/inputform.html');


      // this.load.on('progress', function (value) {
      //     console.log(value * 100);
      // });
                  
      // this.load.on('fileprogress', function (file) {
      //     console.log(file.src);
      // });
      
      // this.load.on('complete', function () {
      //     console.log('complete');
      // });
    }
  
    create() {
      gameState.active = true
  
      gameState.bgColor = this.add.rectangle(0, 0, config.width, config.height, 0x00ffbb).setOrigin(0, 0);
      createStars(gameState, this);
      createParallaxBackgrounds(gameState, this);
      gameState.scoreText = this.add.text(16, 16, "score: " + gameState.score, { fontSize: "32px", fill: "#000"});
      gameState.player = this.physics.add.sprite(80, 110, 'guy').setScale(1.8);
      gameState.platforms = this.physics.add.staticGroup();
      gameState.starCoins = this.physics.add.group({
        key: "star",
        repeat: 15,
        allowGravity: false
      });
      gameState.bombs = this.physics.add.group();

      gameState.starCoins.children.iterate((child) => {
        for (let i = 0; i < 15; i++){
          let xPos = Phaser.Math.Between(100, 1800);
          let yPos = Phaser.Math.Between(80, 200);
    
          child.x = xPos;
          child.y = yPos;
          child.setOrigin(0,0);
        }
      });

     
      createAnimations(this);
      createSnow(gameState, this);
      levelSetup(this, gameState);
  
      this.cameras.main.setBounds(0, 0, gameState.bg3.width, gameState.bg3.height);
      this.physics.world.setBounds(0, 0, gameState.width, gameState.bg3.height + gameState.player.height);
  
      this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5)
      gameState.player.setCollideWorldBounds(true);
      this.physics.add.collider(gameState.player, gameState.platforms);
      this.physics.add.collider(gameState.goal, gameState.platforms);
      this.physics.add.collider(gameState.bombs, gameState.platforms);

      if (this.scene.key == 'Level1') {
        addSnowman(this, gameState.snowman, gameState.platforms, 460, 640, 1900, gameState.player, gameState.active)
        addSnowman(this, gameState.snowman2, gameState.platforms, 1600, 1800, 1800, gameState.player, gameState.active)
      }

      if (this.scene.key == 'Level2') {
        addSnowman(this, gameState.snowman3, gameState.platforms, 280, 380, 1800, gameState.player, gameState.active)
        addSnowman(this, gameState.snowman4, gameState.platforms, 905, 1070, 1800, gameState.player, gameState.active)
        addSnowman(this, gameState.snowman5, gameState.platforms, 1350, 1450, 1800, gameState.player, gameState.active)
        addSnowman(this, gameState.snowman5, gameState.platforms, 1600, 1900, 1800, gameState.player, gameState.active)
      }

      if (this.scene.key == 'Level3') {
        addSnowman(this, gameState.snowman7, gameState.platforms, 480, 620, 1600, gameState.player, gameState.active)
        addSnowman(this, gameState.snowman8, gameState.platforms, 1120, 1300, 1500, gameState.player, gameState.active)
        addSnowman(this, gameState.snowman9, gameState.platforms, 1780, 1950, 1500, gameState.player, gameState.active)
      }

      if(this.scene.key == 'Level4') {
        addBomb(this, gameState.bomb, gameState.bombs, 200, 400, gameState.player, gameState.active)
        addBomb(this, gameState.bomb2, gameState.bombs, 500, 1000, gameState.player, gameState.active)
        addBomb(this, gameState.bomb3, gameState.bombs, 800, 1500, gameState.player, gameState.active)

        addSnowman(this, gameState.snowman10, gameState.platforms, 1120, 1300, 1600, gameState.player, gameState.active)
      }

      this.physics.add.overlap(gameState.player, gameState.starCoins, this.collectStar, null, this);
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

    collectStar(player, star) {
      star.disableBody(true, true);
      this.sound.add('mouseover').play()

      gameState.score += 10;
      gameState.scoreText.setText("Score: " + gameState.score);
      saveScore();

      if (gameState.starCoins.countActive(true) === 0)
      {
        gameState.starCoins.children.iterate(function (child) {

          child.enableBody(true, child.x, child.y, true, true);

        });
      }	
  }


  }