const request = require('request');

function makeRequest(options) {
    return new Promise((resolve, reject) => {
        request(options, function(error, response, body) {
            if (error) return reject(error);
            resolve(body);
        });
    });
}

module.exports = {
    makeRequest
};
