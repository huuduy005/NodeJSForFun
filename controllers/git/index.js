const skype = require('../skype');
const progress = require('./event');
const handle = require('./events');
const _ = require('lodash');

function receive(req) {
  let data = req.body;
//   console.log(JSON.stringify(data));
  try {
    let eventKey = data.eventKey;
    if (eventKey == 'repo:refs_changed') {
      handle(data);
    } else {
      let data_result = progress.progressData(data);
      if (data_result.actionText) {
        console.log('send mess pr');
        let text = data_result.actionText;
        skype.sendTextToSkype(text, data_result.users);
      } else {
        console.log('Ko co send');
      }
    }
  } catch (err) {
    console.log('Lỗi', req);
  }
}

module.exports = {
  receive: receive
};
