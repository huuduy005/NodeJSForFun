function progressData(data) {
    let eventKey = data.eventKey;
    let users = [];
    let actionText = '';

    let actor = data.actor;
    users.push(actor.name);
    let pullRequest = data.pullRequest;
    let fromRef = pullRequest.fromRef;
    let toRef = pullRequest.toRef;
    let author = pullRequest.author;

    let reviewers = (pullRequest.reviewers || []).map((user) => {
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
            break;
        default:
            actionText = null;
            break;
    }

    return {actionText, users};
}

module.exports = progressData;