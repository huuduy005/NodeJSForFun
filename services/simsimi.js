/**
 * Created by huudu on 5/5/2017.
 */
var request = require('request');

var mCookies = request.jar();
var uid = '';
function getCookie() {
    request({
        url: 'http://simsimi.com/storygame/main',
        jar: mCookies
    }, function (err, res, body) {
        request({
            url: 'http://simsimi.com/getUUID',
            jar: mCookies
        }, function (err, res, body) {
            var data = JSON.parse(body);
            uid = data.uuid;
        });
    });
}
function getMess(text, callback) {
    var URI = 'http://simsimi.com/getRealtimeReq?uuid=' + uid + '&lc=vi&ft=1&reqText=' + text + '&status=W';
    URI = encodeURI(URI);
    request({
        url: URI,
        jar: mCookies
    }, function (err, res, body) {
        var data = JSON.parse(body);
        if (data.status === 200) {
            var mess = data.respSentence;
            callback(null, mess);
        } else {
            callback(null, 'Xin lỗi mình không hiểu câu nói của bạn!!! :)');
            getCookie();
        }
    });
}

module.exports = {
    getMess: getMess
};