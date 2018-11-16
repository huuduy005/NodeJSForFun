const request = require('request');
const {getToken} = require('./token');

async function sendTextToUser(text, id, opts = {}) {
  let token = await getToken();
  return new Promise((resolve, reject) => {
    let options = genOptionsToRequest(id, id, token, text, opts);
    request(options, function(error, response, body) {
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
  sendTextToUser
};
