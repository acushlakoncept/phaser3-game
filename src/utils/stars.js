import { config } from "./config";

export const createStars = (gameState, context) => {
  gameState.stars = [];
  function getStarPoints() {
    const color = 0xffffff;
    return {
      x: Math.floor(Math.random() * 900),
      y: Math.floor(Math.random() * config.height * 0.5),
      radius: Math.floor(Math.random() * 3),
      color
    };
  }
  for (let i = 0; i < 200; i++) {
    const { x, y, radius, color } = getStarPoints();
    const star = context.add.circle(x, y, radius, color);
    star.setScrollFactor(Math.random() * 0.1);
    gameState.stars.push(star);
  }
};
