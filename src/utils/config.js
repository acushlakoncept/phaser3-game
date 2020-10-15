import { Level1 } from "../scenes/level-one";
import { Level2 } from "../scenes/level-two";
import { Intro } from "../scenes/introScene";
import { Credits } from "../scenes/creditsScene";

export const config = {
  type: Phaser.AUTO,
  width: 800,
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
  scene: [Intro, Credits, Level1, Level2]
};
