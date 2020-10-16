import { config } from "./config";

export const createParallaxBackgrounds = (gameState, context) => {
  gameState.bg1 = context.add.image(0, 0, "bg1");
  gameState.bg2 = context.add.image(0, 0, "bg2");
  gameState.bg3 = context.add.image(0, 0, "bg3");

  gameState.bg1.setOrigin(0, 0);
  gameState.bg2.setOrigin(0, 0);
  gameState.bg3.setOrigin(0, 0);

  const game_width = parseFloat(gameState.bg3.getBounds().width);
  gameState.width = game_width;
  const window_width = config.width;

  const bg1_width = gameState.bg1.getBounds().width;
  const bg2_width = gameState.bg2.getBounds().width;
  const bg3_width = gameState.bg3.getBounds().width;

  gameState.bgColor.setScrollFactor(0);
  gameState.bg1.setScrollFactor(
    (bg1_width - window_width) / (game_width - window_width)
  );
  gameState.bg2.setScrollFactor(
    (bg2_width - window_width) / (game_width - window_width)
  );
};
