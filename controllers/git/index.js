const skype = require('../skype');
const progress = require('./event');

function receive (req) {
    let data = req.body;
    console.log(JSON.stringify(data));
    try {
        let eventKey = data.eventKey;
        if (eventKey == 'repo:refs_changed') {
            progress.refChange(data).then(obj => {
                if (obj.actionText) {
                    skype.sendTextToSkype(obj.actionText, obj.users);
                } else {
                    console.log('Ko co send|' + eventKey)
                }
            }).catch(err => {
                console.error('Lỗi khi xử lí thôn tin ref change', JSON.stringify(data));
            });
        } else {
            let data_result = progress.progressData(data);
            if (data_result.actionText) {
                skype.sendTextToSkype(data_result.actionText, data_result.users);
            } else {
                console.log('Ko co send')
            }
        }
    } catch (err) {
        console.log('Lỗi', req);
    }
}


module.exports = {
    receive: receive
}