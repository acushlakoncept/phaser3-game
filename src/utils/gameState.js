export const gameState = {
    speed: 240,
    ups: 380,
    score: JSON.parse(localStorage.getItem('game.score')) || 0,
  };

  export const saveScore = () => {
    localStorage.setItem('game.score', JSON.stringify(gameState.score));
  }