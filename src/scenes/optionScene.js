import { gameState, setPlayer } from "../utils/gameState";
import { Level } from "./levelScene";
import { config } from "../utils/config";
import { mouseOverEffect } from "../utils/mouserover";

export class Options extends Level {
  constructor() {
    super("Options");
  }

  create() {
    this.add.image(248, 300, "artboard").setScale(0.7);
    gameState.backButton = this.add.image(240, 470, "back").setScale(0.4);
    this.add.text(220, 60, "THE", { fontSize: "25px", fill: "#000000" });
    this.add.text(170, 85, "ADVENTURES", { fontSize: "25px", fill: "#000000" });
    this.add.text(190, 110, "OF CUSH", { fontSize: "25px", fill: "#000000" });

    gameState.namePrompt = this.add.text(150, 170, "Instructions", {
      fontSize: "25px",
      fill: "#000000"
    });

    this.add.image(config.width/2, 250, "arrowkeys").setScale(0.3);
    this.add.text(80, 300, "Use left and right arrow keys to move character", { fontSize: "12px", fill: "#000000" });
    this.add.text(80, 320, "Use space bar or up arrow key for jumping", { fontSize: "12px", fill: "#000000" });
    gameState.playerText = this.add.text(120, 360, "Your Name: " + gameState.playerName, { fontSize: "15px", fill: "#000000" });

    

    gameState.updateName = this.add.dom(240, 380).createFromCache("updatename");

    gameState.updateName.addListener("click");

    let parentScene = this;

    gameState.updateName.on("click", function (event) {
      if (event.target.name === "updateName") {
        let inputText = this.getChildByName("name");

        if (inputText.value !== "") {
          this.removeListener("click");
          this.setVisible(false);

          gameState.playerName = inputText.value;
          setPlayer();

          parentScene.scene.restart(parentScene.levelKey);
        } else {
          this.scene.tweens.add({
            targets: gameState.playerText,
            alpha: 0.2,
            duration: 250,
            ease: "Power3",
            yoyo: true
          });
        }
      }
    });

    this.tweens.add({
      targets: gameState.updateName,
      y: 400,
      duration: 3000,
      ease: "Power3"
    });


    gameState.backButton.setInteractive({ useHandCursor: true });
    mouseOverEffect(gameState.backButton, this);

    gameState.backButton.on("pointerup", () => {
      this.scene.stop(this.levelKey);
      this.scene.start('Intro');
    });
  }

  update() {}
}
