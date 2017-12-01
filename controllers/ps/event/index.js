const moment = require('moment');

function progressData(data) {
    let issue = data.issue;
    let fields = issue.fields;
    let assignee = fields.assignee;
    let priority = fields.priority;
    let labels = fields.labels.join(',');
    let timestamp = data.timestamp;

    let actionText = `[[${issue.key}] - ${fields.summary}](https://jira.vexere.net/browse/${issue.key})`;

    actionText += `\n\n**${assignee.displayName} - This issue requires your attention. You have 30 minutes left to respond.**`;
    actionText += `\n\n**Priority:** ${priority.name} - **Created**: ${moment(fields.created).format('HH:mm DD-MM-YY')}`;
    actionText += `\n\n**Labels: ** ${labels}`;
    actionText += `\n\n**Description:** ${fields.description}`;

    actionText += `\n\n[**VIEW ISSUE**](https://jira.vexere.net/browse/${issue.key}) - Time: ${moment(timestamp).utcOffset(420).format('HH:mm DD-MM-YY')}`;

    return actionText;
}

module.exports = progressData;