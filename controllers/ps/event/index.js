const moment = require('moment');

function progressData(data) {
    let issue = data.issue;
    let timestamp = data.timestamp;

    // let watches = issue.fields.watches;
    let assignee = issue.fields.assignee;

    let users = [];
    let actionText = '';

    users.push(assignee.name);

    actionText = `Cái qq gì đó ko biết lúc ${moment(timestamp).format('DD-MM-YY HH:mm')} :D\n\n${JSON.stringify(data)}`;

    return {actionText, users};
}

module.exports = progressData;