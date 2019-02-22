const {VIBER_TOKEN} = require('config');
const {Bot: ViberBot, Events: BotEvents} = require('viber-bot');
const TextMessage = require('viber-bot').Message.Text;

require('./loggers');
const winston = require('winston');
const Mylogger = winston.loggers.get('viber');

const SimSimiServices = require('../simsimi/index');

console.log('Token', VIBER_TOKEN);

const bot = new ViberBot({
    logger: Mylogger,
    authToken: VIBER_TOKEN,
    name: 'CuteBot',
    avatar: 'https://dejpknyizje2n.cloudfront.net/svgcustom/clipart/preview/c3ba0be0a37b48a8aca60ebe7ecbcac7.png' // It is recommended to be 720x720, and no more than 100kb.
});

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, async (message, response) => {
    // Echo's back the message to the client. Your bot logic should sit here.
    console.log(message.text);
    let text = await SimSimiServices.getTextRaw(message.text);

    response.send(new TextMessage(text));
});

bot.on('webhook', (message, response) => {
    // Echo's back the message to the client. Your bot logic should sit here.
    console.log('webhook', message);
    // response.send();
});

module.exports = bot;
