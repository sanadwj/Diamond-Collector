/* eslint-disable func-names */

const score = (function () {
  const key = 'mvL8ceYflPrxY5JcKGzL';
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;
  const data = {};

  async function postScores() {
    const fullData = data;
    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(fullData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Could not reach the API: ${error}`);
    }
  }

  // eslint-disable-next-line consistent-return
  async function getScores() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  const nameSetter = (name) => {
    data.user = name;
  };

  const scoreSetter = (score) => {
    data.score = score;
  };

  return {
    postScores,
    getScores,
    nameSetter,
    scoreSetter,
  };
}());
export default score;