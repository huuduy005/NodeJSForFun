const express = require('express');
const router = express.Router();
const Bot = require('../../services/viber');
const TempsModel = require('../../models/temp');

router.get('/ping', (request, response) => {
    response.send('pong');
    response.end();
});

router.post('/', (request, response) => {
    response.send('ok');
    response.end();
    // console.log('Request data:', request.body);
    handleSkype(request.body);

    Bot._handleEventReceived(request.body);
});

module.exports = router;

async function handleSkype(body) {
    try {
        let temp = new TempsModel({__source__: 'viber', ...body});
        await temp.save();
    } catch (e) {
        console.warn('>> Viber: body ko phai object');
        let temp = new TempsModel({__source__: 'viber', __data__: JSON.stringify(body)});
        await temp.save();
    }
}
