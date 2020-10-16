import { gameState, saveScore } from "../utils/gameState";
import { Level } from "./levelScene";
import { createAnimations } from "../utils/animations";
import { mouseOverEffect } from "../utils/mouserover";

export class Intro extends Level {
  constructor() {
    super("Intro");
  }

  create() {
    gameState.artboard = this.add.image(248, 300, "artboard").setScale(0.7);
    gameState.optionButton = this.add.image(250, 240, "options").setScale(0.4);
    gameState.leaderboard = this.add
      .image(250, 310, "leaderboard")
      .setScale(0.4);
    gameState.playButton = this.add.sprite(250, 470, "play").setScale(0.4);
    gameState.credits = this.add.sprite(250, 380, "credits").setScale(0.4);
    this.add.text(110, 170, "Ready to play? " + gameState.playerName, {
      fontSize: "15px",
      fill: "#000000"
    });

    this.add.text(220, 60, "THE", { fontSize: "25px", fill: "#000000" });
    this.add.text(170, 85, "ADVENTURES", { fontSize: "25px", fill: "#000000" });
    this.add.text(190, 110, "OF CUSH", { fontSize: "25px", fill: "#000000" });
    gameState.playButton.setInteractive({ useHandCursor: true });
    gameState.optionButton.setInteractive({ useHandCursor: true });
    gameState.leaderboard.setInteractive({ useHandCursor: true });
    gameState.credits.setInteractive({ useHandCursor: true });
    mouseOverEffect(gameState.playButton, this);
    mouseOverEffect(gameState.optionButton, this);
    mouseOverEffect(gameState.leaderboard, this);
    mouseOverEffect(gameState.credits, this);

    gameState.playButton.on("pointerup", () => {
      this.scene.stop(this.levelKey);
      this.scene.start(this.nextLevel[this.levelKey]);
      gameState.score = 0;
      saveScore;
    });

    gameState.credits.on("pointerup", () => {
      this.scene.stop(this.levelKey);
      this.scene.start("Credits");
    });

    createAnimations(this);
  }

  update() {
    gameState.playButton.anims.play("playbutton", true);
  }
}
