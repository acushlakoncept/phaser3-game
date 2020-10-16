/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { config } from './config';

export const createParallaxBackgrounds = (gameState, context) => {
  gameState.bg1 = context.add.image(0, 0, 'bg1');
  gameState.bg2 = context.add.image(0, 0, 'bg2');
  gameState.bg3 = context.add.image(0, 0, 'bg3');

  gameState.bg1.setOrigin(0, 0);
  gameState.bg2.setOrigin(0, 0);
  gameState.bg3.setOrigin(0, 0);

  const gameWidth = parseFloat(gameState.bg3.getBounds().width);
  gameState.width = gameWidth;
  const windowWidth = config.width;

  const bd1Width = gameState.bg1.getBounds().width;
  const bg2Width = gameState.bg2.getBounds().width;
  // eslint-disable-next-line no-unused-vars
  const bg3Width = gameState.bg3.getBounds().width;

  gameState.bgColor.setScrollFactor(0);
  gameState.bg1.setScrollFactor(
    (bd1Width - windowWidth) / (gameWidth - windowWidth),
  );
  gameState.bg2.setScrollFactor(
    (bg2Width - windowWidth) / (gameWidth - windowWidth),
  );
};
