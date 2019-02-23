const {Bot: ViberBot, Events: BotEvents, UserProfile} = require('viber-bot');
const {Text: TextMessage, RichMedia} = require('viber-bot').Message;

const Bot = require('./');

function sendMessage(userObject) {
    let user = UserProfile.fromJson(userObject);
    let message = new TextMessage('chào đằng ấy');

    message = new RichMedia({
        Type: 'rich_media',
        ButtonsGroupColumns: 6,
        ButtonsGroupRows: 7,
        BgColor: '#FFFFFF',
        Buttons: [
            {
                Columns: 6,
                Rows: 3,
                ActionType: 'open-url',
                ActionBody: 'https://www.google.com',
                Image: 'http://html-test:8080/myweb/guy/assets/imageRMsmall2.png'
            },
            {
                Columns: 6,
                Rows: 2,
                Text:
                    '<font color=#323232><b>Headphones with Microphone, On-ear Wired earphones</b></font><font color=#777777><br>Sound Intone </font><font color=#6fc133>$17.99</font>',
                ActionType: 'open-url',
                ActionBody: 'https://www.google.com',
                TextSize: 'medium',
                TextVAlign: 'middle',
                TextHAlign: 'left'
            },
            {
                Columns: 6,
                Rows: 1,
                ActionType: 'reply',
                ActionBody: 'https://www.google.com',
                Text: '<font color=#ffffff>Buy</font>',
                TextSize: 'large',
                TextVAlign: 'middle',
                TextHAlign: 'middle',
                Image: 'https://s14.postimg.org/4mmt4rw1t/Button.png'
            },
            {
                Columns: 6,
                Rows: 1,
                ActionType: 'reply',
                ActionBody: 'https://www.google.com',
                Text: '<font color=#8367db>MORE DETAILS</font>',
                TextSize: 'small',
                TextVAlign: 'middle',
                TextHAlign: 'middle'
            },
            {
                Columns: 6,
                Rows: 3,
                ActionType: 'open-url',
                ActionBody: 'https://www.google.com',
                Image: 'https://s16.postimg.org/wi8jx20wl/image_RMsmall2.png'
            },
            {
                Columns: 6,
                Rows: 2,
                Text:
                    "<font color=#323232><b>Hanes Men's Humor Graphic T-Shirt</b></font><font color=#777777><br>Hanes</font><font color=#6fc133>$10.99</font>",
                ActionType: 'open-url',
                ActionBody: 'https://www.google.com',
                TextSize: 'medium',
                TextVAlign: 'middle',
                TextHAlign: 'left'
            },
            {
                Columns: 6,
                Rows: 1,
                ActionType: 'reply',
                ActionBody: 'https://www.google.com',
                Text: '<font color=#ffffff>Buy</font>',
                TextSize: 'large',
                TextVAlign: 'middle',
                TextHAlign: 'middle',
                Image: 'https://s14.postimg.org/4mmt4rw1t/Button.png'
            },
            {
                Columns: 6,
                Rows: 1,
                ActionType: 'reply',
                ActionBody: 'https://www.google.com',
                Text: '<font color=#8367db>MORE DETAILS</font>',
                TextSize: 'small',
                TextVAlign: 'middle',
                TextHAlign: 'middle'
            }
        ]
    });
    Bot.sendMessage(user, message);
}

module.exports = {
    sendMessage
};
