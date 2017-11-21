function issue_updated(data) {
    let issue_event_type_name = data.issue_event_type_name;
    let issue = data.issue;
    let user = data.user;
    let changelog = data.changelog;

    let action_text = ``;

    switch (issue_event_type_name) {
        case "issue_commented":
            let comment = data.comment;
            action_text = `${comment.author.displayName} đã comment: **${comment.body}**`;
            break;
        case "issue_updated":
            action_text = `${user.displayName} đã có thao tác cập nhật:`;
            break;
        case 'issue_work_started':
            action_text = `**${user.displayName}** đã start issue ${issue.key}`;
            break;
        case 'issue_work_stopped':
            action_text = `**${user.displayName}** đã stop issue ${issue.key}`;
            break;
        case 'issue_generic':
            action_text = `**${user.displayName}** đã thay đổi tiến trình issue ${issue.key}(Chưa hoàn chỉnh event này)`;
            break;
        case 'issue_assigned':
            action_text = `**${user.displayName}** đã assign ai đó vào issue ${issue.key}(Chưa hoàn chỉnh event này)`;
            break;
        case 'issue_resolved':
            action_text = `**${user.displayName}** đã resolved issue ${issue.key}`;
            break;
        case 'issue_closed':
            action_text = `**${user.displayName}** đã đóng issue ${issue.key}`;
            break;
        case 'issue_reopened':
            action_text = `**${user.displayName}** đã mở lại issue ${issue.key}`;
            break;
        case 'issue_comment_edited':
            action_text = `**${user.displayName}** đã chỉnh sửa bình luận thành: **${comment.body}**`;
            break;
        case 'issue_moved':
            action_text = `**${user.displayName}** đã move issue ${issue.key}`;
            break;
        default:
            action_text = `Jira_event: **issue_updated** - Không nhận diên được: *${issue_event_type_name}*`;
            break;
    }

    if (changelog && changelog.items) {
        changelog.items.forEach((item)=>{
            action_text += `\n\n  * [${item.field}]:  ~~${item.fromString}~~ => **${item.toString}**`
        });
    }
    return action_text;
}

module.exports = issue_updated;