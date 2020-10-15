import { Level1 } from "../scenes/level-one";
import { Level2 } from "../scenes/level-two";
import { Level3 } from "../scenes/level-three";
import { Level4 } from "../scenes/level-four";
import { Intro } from "../scenes/introScene";
import { Credits } from "../scenes/creditsScene";
import { End } from "../scenes/endScene";

export const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 600,
  fps: { target: 60 },
  backgroundColor: "fff",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 },
      enableBody: true
    }
  },
  scene: [Intro, Credits, Level1, Level2, Level3, Level4, End]
};
