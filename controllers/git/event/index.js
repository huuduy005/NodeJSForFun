const regex_jira_id = /@\\"(.*)\\"/g;
function progressData (data) {
    let eventKey = data.eventKey;
    let users = [];
    let actionText = '';

    let actor = data.actor;
    let pullRequest = data.pullRequest;

    let fromRef = pullRequest.fromRef;
    let toRef = pullRequest.toRef;
    let author = pullRequest.author;

    users.push(actor.name);
    users.push(author.user.name);

    let reviewers = (pullRequest.reviewers || []).map((user) => {
        users.push(user.user.name);
        return user.user.displayName;
    });

    /*participants*/
    let participants = (pullRequest.participants || []).map((user) => {
        users.push(user.user.name);
        return user.user.displayName;
    });

    switch (eventKey) {
        case 'pr:merged':
            actionText = `[GIT] **${actor.displayName}** merged pull request [#${pullRequest.id}: ${pullRequest.title}](https://git.vexere.net/projects/API/repos/vxrapi/pull-requests/${pullRequest.id}/overview)`;
            actionText += `\n\n${fromRef.displayId} => ${toRef.displayId}`;
            users.push(author.user.name);
            break;
        case 'pr:opened':
            actionText = `[GIT] **${actor.displayName}** opened pull request [#${pullRequest.id}: ${pullRequest.title}](https://git.vexere.net/projects/API/repos/vxrapi/pull-requests/${pullRequest.id}/overview)`;
            actionText += `\n\n**Reviewers**: ${reviewers.join(',')}`;
            actionText += `\n\n${fromRef.displayId} => ${toRef.displayId}`;
            break;
        case 'pr:comment:added':
            let comment = data.comment;
            actionText = `[GIT] **${actor.displayName}** commented on pull request [#${pullRequest.id}: ${pullRequest.title}](https://git.vexere.net/projects/API/repos/vxrapi/pull-requests/${pullRequest.id}/overview)`;
            actionText += `\n\n**${comment.text}**`;
            actionText += `\n\n${fromRef.displayId} => ${toRef.displayId}`;
            /* Quét người dùng trong comment */
            let comment = data.text;
            if (comment) {
                let m;
                while ((m = regex_jira_id.exec(comment || '')) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (m.index === regex_jira_id.lastIndex) {
                        regex_jira_id.lastIndex++;
                    }
                    users.push(m[1]);
                }
            }
            break;
        case 'pr:declined':
            actionText = `[GIT] **${actor.displayName}** declined pull request [#${pullRequest.id}: ${pullRequest.title}](https://git.vexere.net/projects/API/repos/vxrapi/pull-requests/${pullRequest.id}/overview)`;
            actionText += `\n\n**Reviewers**: ${reviewers.join(',')}`;
            actionText += `\n\n${fromRef.displayId} => ${toRef.displayId}`;
            break;
        default:
            actionText = null;
            break;
    }

    return {actionText, users};
}

module.exports = progressData;