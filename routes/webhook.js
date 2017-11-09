var express = require('express');
var router = express.Router();
var request = require('request');
var jira_event= require('../controllers/jira_events');

/* GET users listing. */
router.post('/', function (req, res, next) {
    var param = req.query;
    var body = req.body;
    sendToSlack(param, body);
    res.send('OK');
});

module.exports = router;


function sendToSlack(param, data) {

    var webhookEvent = data.webhookEvent.split(':')[1] || '';

    var createBody = jira_event[webhookEvent];

    if (createBody) {
        var body = createBody(data);

        console.log(body)

        var options = {
            method: 'POST',
            url: 'https://hooks.slack.com/services/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',
            headers: {'content-type': 'application/json'},
            body: body,
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log('Gửi thành công!');
            console.log(body);
        });
    }
}
