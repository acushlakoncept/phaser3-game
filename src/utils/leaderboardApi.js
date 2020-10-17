/* eslint-disable guard-for-in */
import 'regenerator-runtime';

const fetch = require('node-fetch');

const apiKey = 'i64UOSYgte2pwuH0vZ55';
const URI = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores`;

const postLeaderBoardData = async (player, playerScore) => {
  const data = {
    user: player,
    score: playerScore,
  };

  try {
    const response = await fetch(URI, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    }
    throw new Error('Cant submit request now');
  } catch (error) {
    return error;
  }
};

const rankByScore = (res) => {
  const sortable = [];
  const data = res.result;

  for (let i = 0; i < data.length; i += 1) {
    sortable.push([data[i].user, data[i].score]);
  }

  sortable.sort((a, b) => b[1] - a[1]);
  const firstTen = [];
  for (let i = 0; i < 10; i += 1) {
    firstTen.push(sortable[i]);
  }
  localStorage.setItem('game.board', JSON.stringify(firstTen));
  return firstTen;
  console.log(firstTen);
};

const fetchLeaderBoardData = async () => {
  await fetch(URI, { mode: 'cors' })
    .then(
      // eslint-disable-next-line consistent-return
      (response) => {
        if (response.status !== 200) {
          return `Looks like there was a problem. Status Code: ${
            response.status}`;
        }
        response.json().then((data) => {
          rankByScore(data);
          return data;
        });
      },
    )
    .catch((err) => (('Fetch Error :-S', err)));
};

export { postLeaderBoardData, fetchLeaderBoardData, rankByScore };
