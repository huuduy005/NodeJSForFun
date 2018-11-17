const request = require('request');
const moment = require('moment');
const Tokens = require('../../models/token');

const NAME_SERVICE = 'MICROSOFT';

async function _getToken() {
  let token = await Tokens.findOne({name_service: NAME_SERVICE});
  if (token && token.access_token && moment().unix() < token.ext_time) return transformToken(token.access_token);
  let newToken = await getNewToken();
  return transformToken(newToken.access_token);
}

async function getToken() {
  try {
    return _getToken();
  } catch (e) {
    console.error('FAIL get token', e);
  }
}

module.exports = {
  getToken,
  getNewToken
};

function transformToken(token) {
  return `Bearer ${token}`;
}

const options = {
  method: 'POST',
  url: 'https://login.microsoftonline.com/botframework.com/oauth2/v2.0/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  form: {
    grant_type: 'client_credentials',
    client_id: 'fc8c192b-9c4f-47dd-a8a9-e045505434e4',
    client_secret: 'rlvrIYG7$)gcrUYYQ3326:(',
    scope: 'https://api.botframework.com/.default'
  },
  json: true
};

function getNewToken() {
  return new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (error) return reject();
      processNewToken(body);
      resolve(body);
    });
  });
}

function processNewToken(token) {
  /*TODO tính toán lưu lại thông tin token*/
  token.ext_time = moment().unix() + (token.expires_in - 30);
  Tokens.findOneAndUpdate({name_service: NAME_SERVICE}, {$set: token}, function(err, doc) {
    if (err) console.error('FAIL save token', err);
    else console.log('Token mới: ', doc.access_token);
  });
}
