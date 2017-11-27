const skype = require('../skype');
const progressData = require('./event');

function receive(req) {
    let data = req.body;
    try {
        let data_result = progressData(data);
        if (data_result.actionText) {
            skype.sendTextToSkype(data_result.actionText, data_result.users);
        } else {
            console.log('Ko co send')
        }
    } catch (err) {
        console.log('Lỗi', req);
    }
}


module.exports = {
    receive: receive
}