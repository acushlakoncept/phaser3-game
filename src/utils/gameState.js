export const gameState = {
  speed: 240,
  ups: 380,
  score: JSON.parse(localStorage.getItem('game.score')) || 0,
  playerName: JSON.parse(localStorage.getItem('game.player')) || 'player1',
};

export const saveScore = () => {
  localStorage.setItem('game.score', JSON.stringify(gameState.score));
};

export const setPlayer = () => {
  localStorage.setItem('game.player', JSON.stringify(gameState.playerName));
};
