var info = {
    app_id: 'fc8c192b-9c4f-47dd-a8a9-e045505434e4',
    pass: 'rlvrIYG7$)gcrUYYQ3326:('
}

const chanel_id = '19:1ba78d76f663407b96b46c72be8da946@thread.skype';
const chanel_id_2 = '19:fe672b51b1b24dc084c0bcb40757b846@thread.skype';

var request = require('request');
var token = require('./utils/token');

function receive(req) {
    var param = req.query;
    var body = req.body;
}

function sendToSkype(text) {
    token.getToken().then((token) => {
        const options = {
            method: 'POST',
            url: 'https://smba.trafficmanager.net/apis/v3/conversations/' + chanel_id_2 + '/activities/',
            headers: {
                'content-type': 'application/json',
                authorization: token
            },
            body: {
                type: 'message',
                from: {
                    id: 'VXR@Nnmguv_2XXw',
                    name: 'Bibu'
                },
                text: text,
                replyToId: chanel_id_2
            },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) {
                console.log('Lỗi cmnr');
            }
            console.log(body);
        });
    })
}

module.exports = {
    receive: receive,
    sendToSkype
}