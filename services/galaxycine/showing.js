const request = require('request');

function getRaw() {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            url: 'https://www.galaxycine.vn/api/movie/showAndComming?',
            json: true
        };

        request(options, function (error, response, body) {
            if (error) return reject(error);
            resolve(body);
        });
    })
}


async function getShowing() {
    let data = await getRaw();
    return data.movieShowing;
}

module.exports = getShowing;
