const {getByIdJIRA} = require('../../../services/users');
const {getChangesCommit, getDataCommit} = require('../../../services/bitbucket/api');

function handleRepo(key, payload) {
  switch (key) {
    case 'refs_changed':
      pushEvent(payload);
      break;
    default:
      console.log('Unknown key', key);
  }
}

module.exports = handleRepo;


async function pushEvent(payload) {
  console.log('PushEvent');

  let {repository, changes} = payload;
  let project = repository.project;

  let commits = await Promise.all(changes.map(({toHash}) => getDataCommit({
    commitId: toHash,
    projectName: project.key,
    reposSlug: repository.slug
  })));

  console.log(commits);

}

let payload = {
  'eventKey': 'repo:refs_changed',
  'date': '2018-11-29T16:16:32+0700',
  'actor': {
    'name': 'dinh.tran@vexere.com',
    'emailAddress': 'dinh.tran@vexere.com',
    'id': 507,
    'displayName': 'Trần Văn Định',
    'active': true,
    'slug': 'dinh.tran_vexere.com',
    'type': 'NORMAL'
  },
  'repository': {
    'slug': 'vxrapi',
    'id': 13,
    'name': 'VXRAPI',
    'scmId': 'git',
    'state': 'AVAILABLE',
    'statusMessage': 'Available',
    'forkable': true,
    'project': {
      'key': 'API',
      'id': 2,
      'name': 'API',
      'description': 'VeXeRe API',
      'public': false,
      'type': 'NORMAL'
    },
    'public': false
  },
  'changes': [
    {
      'ref': {
        'id': 'refs/heads/sandbox',
        'displayId': 'sandbox',
        'type': 'BRANCH'
      },
      'refId': 'refs/heads/sandbox',
      'fromHash': '112139bca5253fd7f2bced53a7eae2410d07a672',
      'toHash': '8ccd9c452312421239f4d30682564bbeccdf6e11',
      'type': 'UPDATE'
    }
  ]
};

pushEvent(payload);

// progress
//   .refChange(data)
//   .then(obj => {
//     if (obj.actionText) {
//       skype.sendTextToSkype(obj.actionText, obj.users);
//     } else {
//       console.log('Ko co send|' + eventKey);
//     }
//   })
//   .catch(err => {
//     console.error('Lỗi khi xử lí thôn tin ref change', JSON.stringify(data));
//   });