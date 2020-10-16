import 'regenerator-runtime';

const apiKey = "i64UOSYgte2pwuH0vZ55";
const URI = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores`;

const postLeaderBoardData = async (player, score) => {
  const data = {
    user: player,
    score: score
  };

  try {
    const response = await fetch(URI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    }
    throw new Error("Cant submit request now");
  } catch (error) {
    return error;
  }
};

const rankByScore = (res) => {
  let sortable = [];
  for (let user in res) {
    sortable.push([user.name, user.score]);
  }

  sortable.sort((a, b) => b[1] - a[1]);

  return sortable;
};

const fetchLeaderBoardData = async () => {
  try {
    const response = await fetch(URI, { mode: "cors" });
    if (response.ok) {
      const data = await response.json();
      return rankByScore(data);
    }
    throw new Error("Server Down!");
  } catch (error) {
    return error;
  }
};

export { postLeaderBoardData, fetchLeaderBoardData };
