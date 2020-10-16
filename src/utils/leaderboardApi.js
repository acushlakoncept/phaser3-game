/* eslint-disable guard-for-in */
import 'regenerator-runtime';

const apiKey = 'i64UOSYgte2pwuH0vZ55';
const URI = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores`;

const postLeaderBoardData = async (player, score) => {
  const data = {
    user: player,
    score,
  };

  try {
    const response = await fetch(URI, {
      method: 'POST',
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
  const firstFifteen = [];
  for (let i = 0; i < 15; i += 1) {
    firstFifteen.push(sortable[i]);
  }
  localStorage.setItem('game.board', JSON.stringify(firstFifteen));
  // return sortable;
};

const fetchLeaderBoardData = () => {
  fetch(URI, { mode: 'cors' })
    .then(
      (response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${
            response.status}`);
          return;
        }
        response.json().then((data) => rankByScore(data));
      },
    )
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
};

export { postLeaderBoardData, fetchLeaderBoardData };
