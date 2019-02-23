const gitService = require('../../../../services/bitbucket/t');

module.exports = async payload => {
    let eventKey = payload.eventKey;
    let type = eventKey.split(':')[1];
    let {repository, changes} = payload;
    switch (type) {
        case 'refs_changed':
            let changesData = [];
            for (let change of changes) {
                let changeData = await gitService.getChanges({
                    projectKey: repository.project.key,
                    repositorySlug: repository.slug,
                    commitId: change.toHash,
                    fromHash: change.fromHash
                });
                changesData.push(changeData);
            }

            console.log(changesData);
            break;
        default:
            console.warn("Can't detect repository events");
            break;
    }
};

let data = {
    eventKey: 'repo:refs_changed',
    date: '2018-11-26T10:52:22+0700',
    actor: {
        name: 'nhu.le@vexere.com',
        emailAddress: 'nhu.le@vexere.com',
        id: 455,
        displayName: 'Như',
        active: true,
        slug: 'nhu.le_vexere.com',
        type: 'NORMAL'
    },
    repository: {
        slug: 'vxrapi',
        id: 13,
        name: 'VXRAPI',
        scmId: 'git',
        state: 'AVAILABLE',
        statusMessage: 'Available',
        forkable: true,
        project: {key: 'API', id: 2, name: 'API', description: 'VeXeRe API', public: false, type: 'NORMAL'},
        public: false
    },
    changes: [
        {
            ref: {
                id: 'refs/heads/BOP-2030-api-bo-sung-ai-ly-form-ai-ly-ky',
                displayId: 'BOP-2030-api-bo-sung-ai-ly-form-ai-ly-ky',
                type: 'BRANCH'
            },
            refId: 'refs/heads/BOP-2030-api-bo-sung-ai-ly-form-ai-ly-ky',
            fromHash: 'a3dd28849301fd1e47943d8a209c0caea21ed16c',
            toHash: 'd230a0a03e5acb8143d76babc8527387434bf47c',
            type: 'UPDATE'
        }
    ]
};

module.exports(data);
