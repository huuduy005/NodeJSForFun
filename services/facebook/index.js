const request = require('request');

let mAccessToken = 'EAATnBNPBOEgBAAZBDnJg1dv3vbKvFal6Em5LLFP7mvGInJsHjUwcODngcVa15oIhTLO6wPOauq1cIeYiWYghvOBiVRWIscou2cigeFi3JiIe4WG8C206CqxprXKfblHRSoT52JBUxPczrasAUGkev7ZAxYD3D9PFOP5U3gQgZDZD';
mAccessToken = 'EAATnBNPBOEgBAGQokgFTb1Unjhmo1nQyMVF82W9DlaJU86P5MYVfZCZBIPUpDpsG0HeB5SLfmhmP0NBcmZAQQz8HvDY0vIoYI77szeZBGOgWFUobgv8Paq5GkJISXg72Sj20C2d4ZCBHCy3Foj5UcFituxooIYvKpkmMH0Sm4ZCseG40ZAIOAum';


function sendMessage(senderId, message) {
  let options = {
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: mAccessToken
    },
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      recipient: {
        id: senderId
      },
      message: {
        text: message
      }
    },
    json: true
  };
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) return reject(error);
      resolve(body);
    });
  });
}

module.exports = {
  sendMessage
};

// sendMessage('953396948098609', 'belo').then(res => {
//   console.log(res);
// }).catch(err => {
//   console.error(err);
// });
