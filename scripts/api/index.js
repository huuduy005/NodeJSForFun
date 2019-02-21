const request = require('request');

function makeRequest(options) {
    return new Promise((resolve, reject) => {
        request(options, function(error, response, body) {
            if (error) return reject(error);
            resolve(body);
        });
    });
}

function ajaxProductRender(pid, spid) {
    const options = {
        method: 'GET',
        url: 'https://tiki.vn/ajaxProductRender',
        qs: {pid, spid},
        json: true
    };
    return makeRequest(options);
}

function getInfo(id) {
    const options = {
        method: 'GET',
        url: `https://tiki.vn/api/v2/products/${id}`,
        json: true
    };
    return makeRequest(options);
}


module.exports = {
    ajaxProductRender,
    getInfo
};

