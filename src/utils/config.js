/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */
import { Level1 } from '../scenes/level-one';
import { Level2 } from '../scenes/level-two';
import { Level3 } from '../scenes/level-three';
import { Level4 } from '../scenes/level-four';
import { Intro } from '../scenes/introScene';
import { Credits } from '../scenes/creditsScene';
import { End } from '../scenes/endScene';
import { GameOver } from '../scenes/gameOverScene';
import { Player } from '../scenes/playerScene';
import { Options } from '../scenes/optionScene';
import { LeaderBoard } from '../scenes/leaderboardScene';

// eslint-disable-next-line import/prefer-default-export
export const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 600,
  fps: { target: 60 },
  backgroundColor: 'fff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      enableBody: true,
    },
  },
  parent: 'form',
  dom: {
    createContainer: true,
  },
  scene: [
    LeaderBoard,
    Player,
    Intro,
    Options,
    
    Credits,
    Level1,
    Level2,
    Level3,
    Level4,
    GameOver,
    End,
  ],
};
