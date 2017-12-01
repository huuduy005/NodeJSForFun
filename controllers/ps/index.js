const _ = require('lodash');
const skype = require('../skype');
const jira_api = require('../skype/utils/jire_api');
const progressData = require('./event');

function receive(req) {
    let data = req.body;
    let issue = data.issue;
    let fields = issue.fields;
    let watches = fields.watches;
    let reporter = fields.reporter;
    try {
        new Promise((resolve, reject) => {
            if (watches) {
                jira_api.getWatcher(watches.self || null).then((watchers) => {
                    //TODO: Thêm thằng assignee, reporter
                    let assignee = issue.fields.assignee;
                    watchers.push(assignee.name);
                    watchers.push(reporter.name);
                    resolve(watchers);
                });
            } else {
                resolve([assignee.name, reporter.name]);
            }
        }).then((watchers) => {
            watchers = _.uniq(watchers);//TODO: Lọc các id bị trùng
            console.log('Các thành phần liên quan PS: ', watchers);
            let actionText = progressData(data);
            if (actionText) {
                skype.sendTextToSkype(actionText, watchers);
            } else {
                console.log('Ko co send')
            }
        })
    } catch (err) {
        console.log('Lỗi', req);
    }
}


module.exports = {
    receive: receive
};