const _ = require('lodash');
const token = require('./token');
const request = require('request');

const SERVICE_URL = 'https://smba.trafficmanager.net/apis';

function requestPromise(options) {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                console.log('Lỗi cmnr send to user');
                return reject(error)
            }
            // console.log('SEND TO USER', body);
            resolve(body);
        });
    })
}

async function sendToUser(user_id, conversation_id, text, data) {
    let _token = await token.getToken();
    const options = {
        method: 'POST',
        url: (data.serviceUrl || SERVICE_URL) + '/v3/conversations/' + conversation_id + '/activities/',
        headers: {
            'content-type': 'application/json',
            authorization: _token
        },
        body: {
            type: 'message',
            textFormat: 'markdown',
            text: text,
            from: {id: 'VXR@Nnmguv_2XXw', name: 'Bibu'},
            replyToId: user_id
        },
        json: true
    };

    return requestPromise(options);
}

module.exports = sendToUser;