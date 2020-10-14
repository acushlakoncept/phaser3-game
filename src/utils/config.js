import { Level1 } from "../scenes/level-one";

export const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 600,
  fps: { target: 60 },
  backgroundColor: "b9eaff",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 },
      enableBody: true
    }
  },
  scene: [Level1]
};
