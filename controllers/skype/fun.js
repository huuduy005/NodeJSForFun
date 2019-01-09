const _ = require('lodash');

const parser = require('./yargs');

async function handleFun(data) {
    if (data.type !== 'message') return;
    // let text = `Chào ${data.from.name} buê đuê :)) || Tao éo nói dc câu khác đâu (fingers)`;
    let mess = data.text;
    console.log(mess);
    if (data.conversation.isGroup) {
        mess = (data.text || '').replace('Bibu ', '');
    }

    parser(mess, data);
}

module.exports = handleFun;

// const mongoose = require('mongoose');
// // Use native Node promises
// mongoose.Promise = global.Promise;
// let db = mongoose.connect(
//     'mongodb://huuduy:huuduy@ds031607.mlab.com:31607/sticket',
//     {useNewUrlParser: true}
// );

let data = {
    __source__: 'skype',
    text: 'Bibu instagram thuytienn0801 10',
    type: 'message',
    timestamp: '2019-01-09T03:14:57.081Z',
    channelId: 'skype',
    serviceUrl: 'https://smba.trafficmanager.net/apis/',
    from: {
        id: '29:1ERnK2V6GyKsbko7nII4rZw-u1A2gjkq5MK3T__E7u4E',
        name: 'Hữu Duy'
    },
    conversation: {
        isGroup: true,
        id: '19:fd121046e22c47d182a02c1d5732b59d@thread.skype'
    },
    recipient: {
        id: '28:fc8c192b-9c4f-47dd-a8a9-e045505434e4',
        name: 'Bibu'
    },
    entities: [
        {
            mentioned: {
                id: '28:fc8c192b-9c4f-47dd-a8a9-e045505434e4'
            },
            text: '<at id="28:fc8c192b-9c4f-47dd-a8a9-e045505434e4">Bibu</at>',
            type: 'mention'
        },
        {
            locale: 'en-US',
            country: 'VN',
            platform: 'Linux',
            timezone: 'Asia/Saigon',
            type: 'clientInfo'
        }
    ],
    channelData: {
        text: '<at id="28:fc8c192b-9c4f-47dd-a8a9-e045505434e4">Bibu</at> instagram thuytienn0801 10'
    },
    __v: 0
};

// handleFun(data);
