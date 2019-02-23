const {makeRequest} = require('../../../utils');

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

