const request = require('request');

function getRaw(id) {
  const options = {
    method: 'GET',
    url: `https://www.galaxycine.vn/api/session/movie/${id}`,
    json: true
  };

  return new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (error) return reject(error);
      resolve(body);
    });
  });
}

async function getInfoMovie(id) {
  let data = await getRaw(id);
  return data;
}

module.exports = {
    getInfoMovie
};
