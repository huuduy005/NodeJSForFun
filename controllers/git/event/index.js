const request = require("request");
const regex_jira_id = /@\\"(.*)\\"/g;
const {git_template} = require('../template');

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
        let users = ['duy.doan'];

        for (let item of changesData) {
            let changesCommit = item.changes;

            let fileChanges = {};

            for (let aChange of changesCommit.values) {
                let path = aChange.path;
                if (!fileChanges[path.parent]) fileChanges[path.parent] = [];
                fileChanges[path.parent].push({
                    name: path.name,
                    link: aChange.links.self[0].href,
                    type: aChange.type
                });
            }
            item.fileChanges = fileChanges;
        }

        data.changesData = changesData;
        let actionText = git_template(data);
        return {actionText, users, data};
    });
}

function getChanges (obj) {
    return new Promise(((resolve, reject) => {
        if (!(obj.projectName && obj.reposSlug && obj.commitId)) return resolve(null);
        let fromHash = obj.fromHash;
        if (+fromHash == 0) fromHash = '';

        let options = {
            method: 'GET',
            url: `https://git.vexere.net/rest/api/1.0/projects/${obj.projectName}/repos/${obj.reposSlug}/commits/${obj.commitId}/changes?since=${fromHash}`,
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


let data = {
    "eventKey": "repo:refs_changed",
    "date": "2018-03-14T15:28:56+0700",
    "actor": {
        "name": "khanh.nguyen",
        "emailAddress": "khanh.nguyen@vexere.com",
        "id": 52,
        "displayName": "Khánh Nguyễn",
        "active": true,
        "slug": "khanh.nguyen",
        "type": "NORMAL"
    },
    "repository": {
        "slug": "vxrapi",
        "id": 13,
        "name": "VXRAPI",
        "scmId": "git",
        "state": "AVAILABLE",
        "statusMessage": "Available",
        "forkable": true,
        "project": {
            "key": "API",
            "id": 2,
            "name": "API",
            "description": "VeXeRe API",
            "public": false,
            "type": "NORMAL"
        },
        "public": false
    },
    "changes": [{
        "ref": {"id": "refs/heads/develop", "displayId": "develop", "type": "BRANCH"},
        "refId": "refs/heads/develop",
        "fromHash": "ee5a9d4470ac11dafb5c9ce58e6b69d1812c85e1",
        "toHash": "3ab83a07d46bf6146303c7fe350337a0559af83a",
        "type": "UPDATE"
    }]
};

refChange(data).then(result => {
    // console.log(result);
});

function getEmotion (type) {
    switch (type) {
        case 'MODIFY':
            return '<ss type ="smoking">(smoking)</ss>';
        case 'ADD':
            return '<ss type ="inlove">(inlove)</ss>';
        case 'DELETE':
            return '<ss type ="bomb">(bomb)</ss>';
        default:
            return '<ss type ="drunk">(drunk)</ss>';
    }
}