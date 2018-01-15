const request = require("request");
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
            let text = data.text;
            if (text) {
                let m;
                while ((m = regex_jira_id.exec(text || '')) !== null) {
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

function refChange (data) {
    return new Promise(((resolve, reject) => {
        let repository = data.repository;
        let project = repository.project;
        let changes = data.changes;

        let _data = {
            projectName: project.name,
            reposSlug: repository.slug
        };
        let list = [];
        for (let change of changes) {
            list.push(getMoreDataCommit(Object.assign({commitId: change.toHash}, _data, change)))
        }

        Promise.all(list).then(changesData => {
            resolve(changesData);
        }).catch(err => {
            resolve(changes)
        });
    })).then(changesData => {
        if (!changesData.length) return {actionText: '', users: []};
        let actor = data.actor;
        let repository = data.repository;
        let actionTextList = [];
        let users = ['duy.doan', 'phong.bui'];

        let actionText = `[GIT] **${actor.displayName}** vừa có thao tác chỉnh sửa trên ${repository.name}\n\n`;

        for (let item of changesData) {
            let dataCommit = item.data;
            let changesCommit = item.changes;
            let text = '';

            text += `[Link](https://git.vexere.net/projects/API/repos/vxrapi/commits/${dataCommit.displayId})\n\n`;
            text += `**Type**: ${item.type} - (${item.type == 'ADD' ? 'Tạo branch' : 'Commit'})\n\n`;
            text += `==>Các thao tác chỉnh sửa sau:\n\n`;

            for (let aChange of changesCommit.values) {
                text += `Type: ${aChange.type} - \t\tFile: ${aChange.path.name}\n\n`;
            }

            actionTextList.push(text);
        }

        actionText += actionTextList.join('\n\n');
        return {actionText, users}
    });
}

function getChanges (obj) {
    return new Promise(((resolve, reject) => {
        if (!(obj.projectName && obj.reposSlug && obj.commitId)) return resolve(null);

        let options = {
            method: 'GET',
            url: `https://git.vexere.net/rest/api/1.0/projects/${obj.projectName}/repos/${obj.reposSlug}/commits/${obj.commitId}/changes`,
            headers: {Authorization: 'Basic Ym9vdC5qaXJhOlRob25nMTIz'}
        };

        request(options, function (error, response, body) {
            if (error) return resolve(null);
            resolve(JSON.parse(body));
        });
    }));
}

function getDataCommit (obj) {
    return new Promise(((resolve, reject) => {
        if (!(obj.projectName && obj.reposSlug && obj.commitId)) return resolve(null);
        let options = {
            method: 'GET',
            url: `https://git.vexere.net/rest/api/1.0/projects/${obj.projectName}/repos/${obj.reposSlug}/commits/${obj.commitId}`,
            headers: {Authorization: 'Basic Ym9vdC5qaXJhOlRob25nMTIz'}
        };

        request(options, function (error, response, body) {
            if (error) return resolve(null);
            resolve(JSON.parse(body));
        });
    }));
}

function getMoreDataCommit (obj) {
    return new Promise(((resolve, reject) => {
        let dataQuery = obj;
        Promise.all([getDataCommit(dataQuery), getChanges(dataQuery)]).then(results => {
            obj.data = results[0];
            obj.changes = results[1];
            resolve(obj);
        }).catch(err => {
            resolve(obj);
        })
    }));
}

module.exports = {progressData, refChange};
