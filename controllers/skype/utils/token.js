const request = require("request");
const Tokens = require('../../../models/token');

const NAME_SERVICE = 'MICROSOFT';

function getToken() {
    return new Promise((resolve, reject) => {
        Tokens.findOne({
            name_service: NAME_SERVICE
        }, function (err, token) {
            if (err) { //Lỗi hoặc chưa tồn tại token
                return getNewToken().then((body) => {
                    resolve("Bearer " + body.access_token);
                }).catch(() => {
                    reject();
                });
            }
            if (token && token.access_token) {
                resolve("Bearer " + token.access_token);
            } else {
                getNewToken().then((body) => {
                    resolve("Bearer " + body.access_token);
                }).catch(() => {
                    reject();
                });
            }
        });
    })
}

function getNewToken() {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'POST',
            url: 'https://login.microsoftonline.com/botframework.com/oauth2/v2.0/token',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            form:
                {
                    grant_type: 'client_credentials',
                    client_id: 'fc8c192b-9c4f-47dd-a8a9-e045505434e4',
                    client_secret: 'rlvrIYG7$)gcrUYYQ3326:(',
                    scope: 'https://api.botframework.com/.default'
                }
        };

        request(options, function (error, response, body) {
            if (error) {
                reject();
            }
            /*TODO tính toán lưu lại thông tin token*/
            body = JSON.parse(body);
            Tokens.findOneAndUpdate({name_service: NAME_SERVICE}, {$set: body}, function (err, doc) {
                if (err) {
                    console.log('Lỗi lưu token')
                } else {
                    console.log('Token mới: ', doc.access_token);
                }
            });
            resolve(body);
        });
    })
}

module.exports = {
    getToken: getToken
}