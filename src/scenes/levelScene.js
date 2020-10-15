import { gameState, saveScore } from '../utils/gameState';
import { config } from '../utils/config';
import { createStars } from '../utils/stars';
import { createParallaxBackgrounds } from '../utils/backgrounds';
import { createSnow } from '../utils/snow';
import { createAnimations } from '../utils/animations';
import { levelSetup } from '../utils/levelSetups'; 
import { animateSnowman } from '../utils/snowmanTween'; 

export class Level extends Phaser.Scene {
    constructor(key) {
      super(key);
      this.levelKey = key
      this.nextLevel = {
        'Credits': 'Intro',
        'Intro': 'Level3',
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
      this.load.spritesheet('play', './assets/play.png', { frameWidth: 400, frameHeight: 170});
      this.load.image('artboard', './assets/artboard.png');
      this.load.image('options', './assets/options.png');
      this.load.image('leaderboard', './assets/leaderboard.png');
      this.load.image('credits', './assets/credits.png');
      this.load.image('back', './assets/back.png');
      this.load.image('star', './assets/star.png');
      this.load.audio('mouseover', './assets/mouseover.wav');
      this.load.spritesheet('snowman', './assets/snowman.png', { frameWidth: 50, frameHeight: 70 });
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

      if (this.scene.key == 'Level1') {
        gameState.snowman = this.physics.add.sprite(460, 100, 'snowman');
        gameState.snowman2 = this.physics.add.sprite(1600, 100, 'snowman');
        this.physics.add.collider(gameState.snowman, gameState.platforms);
        this.physics.add.collider(gameState.snowman2, gameState.platforms);

        animateSnowman(gameState.snowman, this, 640, 1900)
        animateSnowman(gameState.snowman2, this, 1800, 1800)
      }

      if (this.scene.key == 'Level2') {
        gameState.snowman3 = this.physics.add.sprite(280, 100, 'snowman');
        gameState.snowman4 = this.physics.add.sprite(905, 100, 'snowman');
        gameState.snowman5 = this.physics.add.sprite(1350, 100, 'snowman');
        gameState.snowman6 = this.physics.add.sprite(1600, 100, 'snowman');
        this.physics.add.collider(gameState.snowman3, gameState.platforms);
        this.physics.add.collider(gameState.snowman4, gameState.platforms);
        this.physics.add.collider(gameState.snowman5, gameState.platforms);
        this.physics.add.collider(gameState.snowman6, gameState.platforms);
        animateSnowman(gameState.snowman3, this, 380, 1800)
        animateSnowman(gameState.snowman4, this, 1070, 1800)
        animateSnowman(gameState.snowman5, this, 1450, 1800)
        animateSnowman(gameState.snowman6, this, 1900, 1800)
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

      // score += 10;
      // scoreText.setText("Score: " + score);

      // if (stars.countActive(true) === 0) {
      //     stars.children.iterate(function (child) {
      //         child.enableBody(true, child.x, 0, true, true);
      //     });

          // let x =
          //     player.x < 400
          //         ? Phaser.Math.Between(400, 800)
          //         : Phaser.Math.Between(0, 400);

          // let bomb = bombs.create(x, 16, "bomb");
          // bomb.setBounce(1);
          // bomb.setCollideWorldBounds(true);
          // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      // }
  }

  getStar(player, star) {
		star.disableBody(true, true);
		// this.score += 1;
		// this.scoreText.setText('Score: ' + this.score);
		
		// if (this.stars.countActive(true) === 0)
		// {
		// 	this.stars.children.iterate(function (child) {

		// 		child.enableBody(true, child.x, child.y, true, true);

		// 	});
		// }			
	}

  }