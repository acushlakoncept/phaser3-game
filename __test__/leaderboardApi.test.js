import { gameState } from '../src/utils/gameState';
import { postLeaderBoardData, fetchLeaderBoardData, rankByScore } from '../src/utils/leaderboardApi';

describe('LeaderBoard', () => {
  it('Should POST player name and score', () => {
    postLeaderBoardData('Test Player', 10).then(result => {
      expect(result.result).toBe('Leaderboard score created correctly.');
    }).catch(err => err);
  });

  it('Should get the first 10 to players to local storage', () => {
    fetchLeaderBoardData().then(data => {
      rankByScore(data);
      expect(gameState.board.length).toBe(10);
    }).catch(err => err);
  });
});