const ngrok = require('./get_public_url');

const MyBot = require('../index');

return ngrok.getPublicUrl().then(publicUrl => {
    console.log('Set the new webhook to"', publicUrl);
    MyBot.setWebhook(publicUrl + '/webhook/viber').then(res => console.log(res)).catch(err => {
        console.error('err', err);
    });
}).catch(error => {
    console.log('Can not connect to ngrok server. Is it running?');
    console.error(error);
});

