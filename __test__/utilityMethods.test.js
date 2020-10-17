import { gameState, saveScore, setPlayer } from '../src/utils/gameState';

describe('LocalStorage', () => {
  it('Should set name to player1 when no name is given', () => {
    setPlayer();
    const playerName = JSON.parse(localStorage.getItem('game.player'));
    expect(playerName).toEqual('player1');
  });

  it('Should save player name to local storage', () => {
    gameState.playerName = 'John Doe';
    setPlayer();
    const playerName = JSON.parse(localStorage.getItem('game.player'));
    expect(playerName).toEqual('John Doe');
  });

  it('Should save user score', () => {
    gameState.score = 50;
    saveScore();
    const score = JSON.parse(localStorage.getItem('game.score'));
    expect(score).toBe(50);
  });
});