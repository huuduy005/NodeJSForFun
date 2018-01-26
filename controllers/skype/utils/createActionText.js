const event = require('./eventType');
const moment = require('moment');

function createActionText(data) {
    let webhookEvent = data.webhookEvent.split(':')[1] || '';
    let createContent = event[webhookEvent];
    let actionText = createContent(data);

    let issue = data.issue;
    let fields = issue.fields;
    let issue_text = `[[${issue.key}] - ${fields.summary}](https://jira.vexere.net/browse/${issue.key})\n\n`;
    let issue_link = `[**VIEW ISSUE**](https://jira.vexere.net/browse/${issue.key}) - Time: ${moment(data.timestamp).utcOffset(420).format('HH:mm DD-MM-YY')}`;

    let result = `${issue_text}\n\n${actionText}\n\n${issue_link}`;
    return {
        actionText: actionText ? result : '',
        bodyText: actionText,
        issueText: `[${issue.key}] - ${fields.summary}`,
        issueLink: `https://jira.vexere.net/browse/${issue.key}`
    };
}

module.exports = createActionText;