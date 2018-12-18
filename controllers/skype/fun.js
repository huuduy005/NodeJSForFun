const token = require('./utils/token');
const request = require('request');
const _ = require('lodash');

const TinhTeServices = require('../../services/tinhte');
const YoutubeServices = require('../../services/youtube');
const SimSimiServices = require('../../services/simsimi/index');

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

const regex = / *(tinhte|tt) */gm;
const regex_youtube = / *(youtube|yt) */gm;

async function handleFun(data) {
    if (data.type !== 'message') return;
    let text = `Chào ${data.from.name} buê đuê :)) || Tao éo nói dc câu khác đâu (fingers)`;
    let mess = data.text;
    if (regex.test(mess)) {
        text = await TinhTeServices.getLastThreads();
    } else if (regex_youtube.test(mess)){
        text = await YoutubeServices.getTrending();
    } else {
        let _mess = (data.text || '').replace('Bibu ', '');
        text = await SimSimiServices.getText(_mess, data);
    }
    sendToUser(data.from.id, data.conversation.id, text, data).then(res => console.log(JSON.stringify(res)));
}

module.exports = handleFun;

// const mongoose = require('mongoose');
// // Use native Node promises
// mongoose.Promise = global.Promise;
// let db = mongoose.connect('mongodb://huuduy:huuduy@ds031607.mlab.com:31607/sticket', { useNewUrlParser: true });

let data = {
    "__source__": "skype",
    "text": "say something else plz",
    "type": "message",
    "timestamp": "2018-12-13T04:47:11.335Z",
    "channelId": "skype",
    "serviceUrl": "https://smba.trafficmanager.net/apis/",
    "from": {
        "id": "29:1toazxSvzULB20n_oboWc7SXQBXKBbGtPcMsYKOnTX4COOu8inQkizvuw0TPdMoYs",
        "name": "Dat Nguyen Ngo Thanh"
    },
    "conversation": {
        "id": "29:1toazxSvzULB20n_oboWc7SXQBXKBbGtPcMsYKOnTX4COOu8inQkizvuw0TPdMoYs"
    },
    "recipient": {
        "id": "28:fc8c192b-9c4f-47dd-a8a9-e045505434e4",
        "name": "Bibu"
    },
    "entities": [
        {
            "locale": "en-US",
            "country": "SG",
            "platform": "Web",
            "timezone": "Asia/Bangkok",
            "type": "clientInfo"
        }
    ],
    "channelData": {
        "text": "say something else plz"
    },
    "__v": 0
};
