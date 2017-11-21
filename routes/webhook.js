const express = require('express');
const router = express.Router();
const request = require('request');
const jira_event= require('../controllers/jira_events');
const skype = require('../controllers/skype');

/* GET users listing. */
router.post('/', function (req, res, next) {
    let param = req.query;
    let body = req.body;
    sendToSlack(param, body);
    skype.sendToSkype(body);
    res.send('OK');
});

router.post('/skype', function (req, res, next) {
    res.send('OK');
    skype.receive(req);
});

router.get('/skype', function (req, res, next) {
    res.send('OK')
})

module.exports = router;


function sendToSlack(param, data) {
    let webhookEvent = data.webhookEvent.split(':')[1] || '';

    let createBody = jira_event[webhookEvent];

    if (createBody) {
        let body = createBody(data);
        let options = {
            method: 'POST',
            url: 'https://hooks.slack.com/services/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',
            headers: {'content-type': 'application/json'},
            body: body,
            json: true
        };

        request(options, function (error, response, body) {
            if (error) {
                console.error(new Error(error))
            }
            console.log('Slack: SEND OK!');
        });
    }
}

function genTextForSkype(body) {
    let data = body.attachments[0];
    let result = "*" + data.title + "*" + "\n\n" + data.pretext + "\n\n" + data.title_link;
    return result;
}