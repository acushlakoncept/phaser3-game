export const gameState = {
  speed: 240,
  ups: 380,
  score: JSON.parse(localStorage.getItem('game.score')) || 0,
  called: JSON.parse(localStorage.getItem('game.posted')) || false,
  playerName: JSON.parse(localStorage.getItem('game.player')) || 'player1',
  board: JSON.parse(localStorage.getItem('game.board')) || [],
};

export const saveScore = () => {
  localStorage.setItem('game.score', JSON.stringify(gameState.score));
};

export const setPlayer = () => {
  localStorage.setItem('game.player', JSON.stringify(gameState.playerName));
  localStorage.setItem('game.called', JSON.stringify(gameState.called));
};

export const setCalled = () => {
  localStorage.setItem('game.called', JSON.stringify(gameState.called));
};