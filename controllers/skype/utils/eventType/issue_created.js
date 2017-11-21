function issue_created(data) {
    let issue_event_type_name = data.issue_event_type_name;
    let issue = data.issue;
    let user = data.user;

    let action_text = '';
    switch (issue_event_type_name) {
        case "issue_created":
            action_text = `**${user.displayName}** đã tạo issue ${issue.key}`;
            break;
        default:
            action_text = `Jira_event: **issue_created** - Không nhận diên được: *${issue_event_type_name}*`;
            break;
    }
    return action_text;
}

module.exports = issue_created;