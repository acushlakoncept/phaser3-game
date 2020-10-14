import { gameState } from '../utils/gameState';
import { config } from '../utils/config';

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
      this.load.spritesheet('campfire', 'https://content.codecademy.com/courses/learn-phaser/Codey%20Tundra/campfire.png',
        { frameWidth: 32, frameHeight: 32});
      this.load.spritesheet('codey', './assets/codey.png', { frameWidth: 72, frameHeight: 90})

      this.load.spritesheet('guy', './assets/guy.png', { frameWidth: 16, frameHeight: 24})
  
      this.load.image('bg1', './assets/mountain.png');
      this.load.image('bg2', './assets/trees.png');
      this.load.image('bg3', './assets/snowdunes.png');
    }
  
    create() {
      gameState.active = true
  
      gameState.bgColor = this.add.rectangle(0, 0, config.width, config.height, 0x00ffbb).setOrigin(0, 0);
      this.createStars();
      this.createParallaxBackgrounds();
  
    //   gameState.player = this.physics.add.sprite(125, 110, 'codey').setScale(.5);
    //   gameState.door = this.physics.add.sprite(125, 110, 'door').setScale(.4);
      gameState.player = this.physics.add.sprite(80, 110, 'guy').setScale(1.8);
      gameState.platforms = this.physics.add.staticGroup();
  
      this.createAnimations();
  
      this.createSnow();
  
      this.levelSetup();
  
      this.cameras.main.setBounds(0, 0, gameState.bg3.width, gameState.bg3.height);
      this.physics.world.setBounds(0, 0, gameState.width, gameState.bg3.height + gameState.player.height);
  
      this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5)
      gameState.player.setCollideWorldBounds(true);
  
      this.physics.add.collider(gameState.player, gameState.platforms);
    //   this.physics.add.collider(gameState.door, gameState.platforms);
      this.physics.add.collider(gameState.goal, gameState.platforms);
  
      gameState.cursors = this.input.keyboard.createCursorKeys();
  
    }
  
    createPlatform(xIndex, yIndex) {
      // Creates a platform evenly spaced along the two indices.
      // If either is not a number it won't make a platform
        if (typeof yIndex === 'number' && typeof xIndex === 'number') {
          gameState.platforms.create((220 * xIndex),  yIndex * 70, 'platform').setOrigin(0, 0.5).refreshBody();
        }
    }
  
    createSnow() {
      gameState.particles = this.add.particles('snowflake');
  
      gameState.emitter = gameState.particles.createEmitter({
        x: {min: 0, max: config.width * 2 },
        y: -5,
        lifespan: 2000,
        speedX: { min:-5, max: -200 },
        speedY: { min: 200, max: 400 },
        scale: { start: 0.6, end: 0 },
        quantity: 10,
        blendMode: 'ADD'
      })
  
      gameState.emitter.setScrollFactor(0);
    }
  
    createAnimations() {

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('guy', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('guy', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('guy', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
  
      this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('guy', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      })
  
    //   this.anims.create({
    //     key: 'fire',
    //     frames: this.anims.generateFrameNumbers('campfire'),
    //     frameRate: 10,
    //     repeat: -1
    //   })
    }
  
    createParallaxBackgrounds() {
      gameState.bg1 = this.add.image(0, 0, 'bg1');
      gameState.bg2 = this.add.image(0, 0, 'bg2');
      gameState.bg3 = this.add.image(0, 0, 'bg3');
  
      gameState.bg1.setOrigin(0, 0);
      gameState.bg2.setOrigin(0, 0);
      gameState.bg3.setOrigin(0, 0);
  
      const game_width = parseFloat(gameState.bg3.getBounds().width)
      gameState.width = game_width;
      const window_width = config.width
  
      const bg1_width = gameState.bg1.getBounds().width
      const bg2_width = gameState.bg2.getBounds().width
      const bg3_width = gameState.bg3.getBounds().width
  
      gameState.bgColor .setScrollFactor(0);
      gameState.bg1.setScrollFactor((bg1_width - window_width) / (game_width - window_width));
      gameState.bg2.setScrollFactor((bg2_width - window_width) / (game_width - window_width));
    }
  
    levelSetup() {
      for (const [xIndex, yIndex] of this.heights.entries()) {
        this.createPlatform(xIndex, yIndex);
      }
  
      // Create the door at the end of the level
      gameState.goal = this.physics.add.sprite(gameState.width - 40, 100, 'door');
  
      this.physics.add.overlap(gameState.player, gameState.goal, function() {
        this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
          if (progress > .9) {
            this.scene.stop(this.levelKey);
            this.scene.start(this.nextLevel[this.levelKey]);
          }
        });
      }, null, this);
  
      this.setWeather(this.weather);
    }
  
    update() {
      if(gameState.active){
        // gameState.goal.anims.play('door', true);
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
    createStars() {
      gameState.stars = [];
      function getStarPoints() {
        const color = 0xffffff;
        return {
          x: Math.floor(Math.random() * 900),
          y: Math.floor(Math.random() * config.height * .5),
          radius: Math.floor(Math.random() * 3),
          color,
        }
      }
      for (let i = 0; i < 200; i++) {
        const { x, y, radius, color} = getStarPoints();
        const star = this.add.circle(x, y, radius, color)
        star.setScrollFactor(Math.random() * .1);
        gameState.stars.push(star)
      }
    }
  
    setWeather(weather) {
      const weathers = {
  
        'morning': {
          'color': 0xecdccc,
          'snow':  1,
          'wind':  20,
          'bgColor': 0xF8c3aC,
        },
  
        'afternoon': {
          'color': 0xffffff,
          'snow':  1,
          'wind': 80,
          'bgColor': 0x0571FF,
        },
  
        'twilight': {
          'color': 0xccaacc,
          'bgColor': 0x18235C,
          'snow':  10,
          'wind': 200,
        },
  
        'night': {
          'color': 0x555555,
          'bgColor': 0x000000,
          'snow':  0,
          'wind': 0,
        },
      }
      let { color, bgColor, snow, wind } = weathers[weather];
      gameState.bg1.setTint(color);
      gameState.bg2.setTint(color);
      gameState.bg3.setTint(color);
      gameState.bgColor.fillColor = bgColor;
      gameState.emitter.setQuantity(snow);
      gameState.emitter.setSpeedX(-wind);
      gameState.player.setTint(color);
      for (let platform of gameState.platforms.getChildren()) {
        platform.setTint(color);
      }
      if (weather === 'night') {
        gameState.stars.forEach(star => star.setVisible(true));
      } else {
        gameState.stars.forEach(star => star.setVisible(false));
      }
  
      return
    }
  }