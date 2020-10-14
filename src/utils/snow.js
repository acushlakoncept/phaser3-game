import { config } from "./config";

export const createSnow = (gameState, context) => {
    gameState.particles = context.add.particles('snowflake');

    gameState.emitter = gameState.particles.createEmitter({
      x: {min: 0, max: config.width * 2 },
      y: -5,
      lifespan: 2000,
      speedX: { min:-5, max: -200 },
      speedY: { min: 200, max: 400 },
      scale: { start: 0.6, end: 0 },
      quantity: 10,
      blendMode: 'ADD'
    })

    gameState.emitter.setScrollFactor(0);
  }