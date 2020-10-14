export const createPlatform = (xIndex, yIndex, gameState) => {
    if (typeof yIndex === 'number' && typeof xIndex === 'number') {
      gameState.platforms.create((220 * xIndex),  yIndex * 70, 'platform').setOrigin(0, 0.5).refreshBody();
    }
}