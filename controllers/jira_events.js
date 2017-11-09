module.exports = {
    issue_created: issue_created,
    issue_updated: issue_updated
};

function issue_created(data) {
    var issue_event_type_name = data.issue_event_type_name;
    var issue = data.issue;

    var action_text = "";

    switch (issue_event_type_name) {
        case "issue_created":
            var user = data.user;
            action_text = user.displayName + " đã tạo issue " + "_*" + issue.key + "*_";
            break;
        default:
            action_text = "Chưa nhận diện event được event này: `" + issue_event_type_name + "`";
            break;
    }

    var body = {
        "attachments": [
            {
                "pretext": action_text,
                "title": issue.key + "\n" + issue.fields.summary,
                "title_link": "https://jira.vexere.net/browse/" + issue.key,
                "text": issue.fields.description,
                "color": "#7CD197",
                "mrkdwn_in": [
                    "pretext"
                ],
                "fields": [
                    {
                        "title": "Type",
                        "value": issue.fields.issuetype.name,
                        "short": true
                    },
                    {
                        "title": "Priority",
                        "value": issue.fields.priority.name,
                        "short": true
                    },
                    {
                        "title": "Status",
                        "value": issue.fields.status.name,
                        "short": true
                    },
                    {
                        "title": "Assignee",
                        "value": issue.fields.assignee.displayName,
                        "short": true
                    }
                ],
                "footer": "Thời gian",
                "ts": Math.floor(data.timestamp/1000)
            }
        ]
    };

    return body;
}

function issue_updated(data) {
    var issue_event_type_name = data.issue_event_type_name;
    var issue = data.issue;

    var action_text = "";

    switch (issue_event_type_name) {
        case "issue_commented":
            var comment = data.comment;
            action_text = comment.author.displayName + " đã comment " + "_*" + comment.body + "*_";
            break;
        case "issue_updated":
            var changelog = data.changelog;
            action_text = data.user.displayName + " đã có thao tác cập nhật:\n";
            var c = changelog.items.map(function (item) {
                return " + " + item.field + ": Từ *'" + (item.fromString || " `null` ") +"'* sang *'" + (item.toString || " `null` ") + "'*"
            });
            action_text += c.join('\n');
            break;
        default:
            action_text = "Chưa nhận diện event được event này: `" + issue_event_type_name + "`";
            break;
    }

    var body = {
        "attachments": [
            {
                "pretext": action_text,
                "title": issue.key + "\n" + issue.fields.summary,
                "title_link": "https://jira.vexere.net/browse/" + issue.key,
                "text": issue.fields.description,
                "color": "#7CD197",
                "mrkdwn_in": [
                    "pretext"
                ],
                "fields": [
                    {
                        "title": "Type",
                        "value": issue.fields.issuetype.name,
                        "short": true
                    },
                    {
                        "title": "Priority",
                        "value": issue.fields.priority.name,
                        "short": true
                    },
                    {
                        "title": "Status",
                        "value": issue.fields.status.name,
                        "short": true
                    },
                    {
                        "title": "Assignee",
                        "value": issue.fields.assignee.displayName,
                        "short": true
                    }
                ],
                "footer": "Thời gian",
                "ts": Math.floor(data.timestamp/1000)
            }
        ]
    };

    return body
}