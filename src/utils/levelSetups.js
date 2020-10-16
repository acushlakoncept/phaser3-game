import { createPlatform } from "./platform";
import { setWeather } from "./weather";

export const levelSetup = (context, gameState) => {
  for (const [xIndex, yIndex] of context.heights.entries()) {
    createPlatform(xIndex, yIndex, gameState);
  }

  gameState.goal = context.physics.add
    .sprite(gameState.width - 20, 120, "door")
    .setScale(0.4);

  context.physics.add.overlap(
    gameState.player,
    gameState.goal,
    function () {
      context.cameras.main.fade(800, 0, 0, 0, false, function (
        camera,
        progress
      ) {
        if (progress > 0.9) {
          context.scene.stop(context.levelKey);
          context.scene.start(context.nextLevel[context.levelKey]);
        }
      });
    },
    null,
    context
  );

  setWeather(context.weather, gameState);
};
