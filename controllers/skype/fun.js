const _ = require('lodash');
const parser = require('./yargs');

async function handleFun(data) {
    let {type, text: mess} = data;
    if (type !== 'message') return;
    // let text = `Chào ${data.from.name} buê đuê :)) || Tao éo nói dc câu khác đâu (fingers)`;
    console.log(mess);
    if (data.conversation.isGroup) {
        mess = (data.text || '').replace('Bibu ', '');
    }
    parser(mess, data);
}

module.exports = handleFun;
