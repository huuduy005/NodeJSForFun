const request = require('request');
const {getToken} = require('./token');

async function sendTextToUser(text, id, opts = {}) {
    let token = await getToken();
    return new Promise((resolve, reject) => {
        let options = genOptionsToRequest(id, id, token, text, opts);
        request(options, function (error, response, body) {
            if (error) {
                console.error('[SKYPE] FAIL send to user', id);
                return reject(error);
            }
            console.log('[SKYPE] SEND OK', JSON.stringify(body));
            return resolve('OK');
        });
    });
}

function genOptionsToRequest(id, toId, token, text, options = {}) {
    return {
        method: 'POST',
        url: 'https://smba.trafficmanager.net/apis/v3/conversations/' + id + '/activities/',
        headers: {
            'content-type': 'application/json',
            authorization: token
        },
        body: {
            type: options.type || 'message',
            textFormat: options.textFormat || 'markdown',
            text: text,
            from: {id: 'VXR@Nnmguv_2XXw', name: 'Bibu'},
            replyToId: toId
        },
        json: true
    };
}

module.exports = {
    sendTextToUser,
    sendSuggestToUser
};

function genOptionsSuggest(id, toId, token, data = {}) {
    let options = genOptionsToRequest(id, toId, token);

    options.body = {
        type: 'message',
        text: data.text,
        inputHint: 'expectingInput',
        suggestedActions: {
            actions: data.suggestion
        },
    };

    return options;
}

async function sendSuggestToUser(id, data) {
    let token = await getToken();
    return new Promise((resolve, reject) => {
        let options = genOptionsSuggest(id, id, token, data);
        request(options, function (error, response, body) {
            if (error) {
                console.error('[SKYPE] FAIL send suggestion to user', id);
                return reject(error);
            }
            console.log('[SKYPE] SEND suggestion OK', JSON.stringify(body));
            return resolve('OK');
        });
    });
}

// require('../../mongoose')();
let id = '29:1ERnK2V6GyKsbko7nII4rZw-u1A2gjkq5MK3T__E7u4E';
// sendTextToUser('hi', id).then(res => console.log(res))
// sendSuggestToUser('', id).then(res => console.log(res));
