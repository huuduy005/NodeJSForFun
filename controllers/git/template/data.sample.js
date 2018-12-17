let merged = [{
  'eventKey': 'pr:merged',
  'date': '2018-11-30T14:01:38+0700',
  'actor': {
    'name': 'khanh.nguyen',
    'emailAddress': 'khanh.nguyen@vexere.com',
    'id': 52,
    'displayName': 'Khánh Nguyễn',
    'active': true,
    'slug': 'khanh.nguyen',
    'type': 'NORMAL'
  },
  'pullRequest': {
    'id': 2288,
    'version': 4,
    'title': 'BOP-2065 bo sung vao api update payment',
    'description': '* feat(VEX-900): Updated API booking/pay\r\n\r\n    - Updated transaction info at booking/pay\r\n\r\n* feat(BOP-2065): Updated store info when update payment info.',
    'state': 'MERGED',
    'open': false,
    'closed': true,
    'createdDate': 1543551177019,
    'updatedDate': 1543561298096,
    'closedDate': 1543561298096,
    'fromRef': {
      'id': 'refs/heads/BOP-2065-bo-sung-vao-api-update-payment',
      'displayId': 'BOP-2065-bo-sung-vao-api-update-payment',
      'latestCommit': 'd965fef37dd2ac36efcf5cf87c842bb40ef80f6a',
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
      }
    },
    'toRef': {
      'id': 'refs/heads/develop',
      'displayId': 'develop',
      'latestCommit': 'e7aa446f1308639a25df5ddb9032ea7d95620c89',
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
      }
    },
    'locked': false,
    'author': {
      'user': {
        'name': 'thanh.duong',
        'emailAddress': 'thanh.duong@vexere.com',
        'id': 356,
        'displayName': 'Dương Đăng Thanh',
        'active': true,
        'slug': 'thanh.duong',
        'type': 'NORMAL'
      }, 'role': 'AUTHOR', 'approved': false, 'status': 'UNAPPROVED'
    },
    'reviewers': [{
      'user': {
        'name': 'khanh.nguyen',
        'emailAddress': 'khanh.nguyen@vexere.com',
        'id': 52,
        'displayName': 'Khánh Nguyễn',
        'active': true,
        'slug': 'khanh.nguyen',
        'type': 'NORMAL'
      },
      'lastReviewedCommit': 'd965fef37dd2ac36efcf5cf87c842bb40ef80f6a',
      'role': 'REVIEWER',
      'approved': true,
      'status': 'APPROVED'
    }],
    'participants': [],
    'properties': {'mergeCommit': {'displayId': '2649f58291c', 'id': '2649f58291cff539d7648ce1dc816f5145e0a440'}}
  }
}];

let opened = [{
  eventKey: 'pr:opened',
  date: '2018-11-30T11:33:22+0700',
  actor: {
    name: 'thanh.duong',
    emailAddress: 'thanh.duong@vexere.com',
    id: 356,
    displayName: 'Dương Đăng Thanh',
    active: true,
    slug: 'thanh.duong',
    type: 'NORMAL'
  },
  pullRequest: {
    id: 2290,
    version: 0,
    title: 'feat(BOP-2061): Integrate SMS HAI AU',
    state: 'OPEN',
    open: true,
    closed: false,
    createdDate: 1543552402641,
    updatedDate: 1543552402641,
    fromRef: {
      id: 'refs/heads/feature/BOP-2061-api-tich-hop-sms-hai-au-fpt',
      displayId: 'feature/BOP-2061-api-tich-hop-sms-hai-au-fpt',
      latestCommit: 'b74ea724dd5f63ddfc11d1355207f4c04346aba9',
      repository: {
        slug: 'vxrapi',
        id: 13,
        name: 'VXRAPI',
        scmId: 'git',
        state: 'AVAILABLE',
        statusMessage: 'Available',
        forkable: true,
        project: {
          key: 'API',
          id: 2,
          name: 'API',
          description: 'VeXeRe API',
          public: false,
          type: 'NORMAL'
        },
        public: false
      }
    },
    toRef: {
      id: 'refs/heads/develop',
      displayId: 'develop',
      latestCommit: 'f7d989630b0fd3f23efad397170770c5af84f2e8',
      repository: {
        slug: 'vxrapi',
        id: 13,
        name: 'VXRAPI',
        scmId: 'git',
        state: 'AVAILABLE',
        statusMessage: 'Available',
        forkable: true,
        project: {
          key: 'API',
          id: 2,
          name: 'API',
          description: 'VeXeRe API',
          public: false,
          type: 'NORMAL'
        },
        public: false
      }
    },
    locked: false,
    author: {
      user: {
        name: 'thanh.duong',
        emailAddress: 'thanh.duong@vexere.com',
        id: 356,
        displayName: 'Dương Đăng Thanh',
        active: true,
        slug: 'thanh.duong',
        type: 'NORMAL'
      },
      role: 'AUTHOR',
      approved: false,
      status: 'UNAPPROVED'
    },
    reviewers: [
      {
        user: {
          name: 'khanh.nguyen',
          emailAddress: 'khanh.nguyen@vexere.com',
          id: 52,
          displayName: 'Khánh Nguyễn',
          active: true,
          slug: 'khanh.nguyen',
          type: 'NORMAL'
        },
        role: 'REVIEWER',
        approved: false,
        status: 'UNAPPROVED'
      }
    ],
    participants: []
  }
}];

let comment_add = [{
  'eventKey': 'pr:comment:added',
  'date': '2018-11-30T12:06:27+0700',
  'actor': {
    'name': 'khanh.nguyen',
    'emailAddress': 'khanh.nguyen@vexere.com',
    'id': 52,
    'displayName': 'Khánh Nguyễn',
    'active': true,
    'slug': 'khanh.nguyen',
    'type': 'NORMAL'
  },
  'pullRequest': {
    'id': 2275,
    'version': 4,
    'title': 'CRS-302: Add vehicle number when returning trip and seats info',
    'state': 'OPEN',
    'open': true,
    'closed': false,
    'createdDate': 1543483006786,
    'updatedDate': 1543552665347,
    'fromRef': {
      'id': 'refs/heads/CRS-302',
      'displayId': 'CRS-302',
      'latestCommit': 'b2eae8e51e8f490e664f6c684dfd39d6d5022a23',
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
      }
    },
    'toRef': {
      'id': 'refs/heads/develop',
      'displayId': 'develop',
      'latestCommit': 'e7aa446f1308639a25df5ddb9032ea7d95620c89',
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
      }
    },
    'locked': false,
    'author': {
      'user': {
        'name': 'dinh.tran@vexere.com',
        'emailAddress': 'dinh.tran@vexere.com',
        'id': 507,
        'displayName': 'Trần Văn Định',
        'active': true,
        'slug': 'dinh.tran_vexere.com',
        'type': 'NORMAL'
      }, 'role': 'AUTHOR', 'approved': false, 'status': 'UNAPPROVED'
    },
    'reviewers': [{
      'user': {
        'name': 'khanh.nguyen',
        'emailAddress': 'khanh.nguyen@vexere.com',
        'id': 52,
        'displayName': 'Khánh Nguyễn',
        'active': true,
        'slug': 'khanh.nguyen',
        'type': 'NORMAL'
      }, 'role': 'REVIEWER', 'approved': false, 'status': 'UNAPPROVED'
    }],
    'participants': []
  },
  'comment': {
    'properties': {'repositoryId': 13},
    'id': 831,
    'version': 0,
    'text': 'local variable, too :D',
    'author': {
      'name': 'khanh.nguyen',
      'emailAddress': 'khanh.nguyen@vexere.com',
      'id': 52,
      'displayName': 'Khánh Nguyễn',
      'active': true,
      'slug': 'khanh.nguyen',
      'type': 'NORMAL'
    },
    'createdDate': 1543554387875,
    'updatedDate': 1543554387875,
    'comments': [],
    'tasks': []
  }
}
];

let declined = [{
  'eventKey': 'pr:declined',
  'date': '2018-11-29T17:55:21+0700',
  'actor': {
    'name': 'khanh.nguyen',
    'emailAddress': 'khanh.nguyen@vexere.com',
    'id': 52,
    'displayName': 'Khánh Nguyễn',
    'active': true,
    'slug': 'khanh.nguyen',
    'type': 'NORMAL'
  },
  'pullRequest': {
    'id': 2277,
    'version': 2,
    'title': 'MV-58 get coordinates seat map of a list of pickup',
    'description': '* feat(MV-58): Added location to point when get seat map.\r\n* fix(MV-58): Use async function coverDataPickupPointDetail (Get area from point_id ).',
    'state': 'DECLINED',
    'open': false,
    'closed': true,
    'createdDate': 1543483543792,
    'updatedDate': 1543488921932,
    'closedDate': 1543488921932,
    'fromRef': {
      'id': 'refs/heads/MV-58-get-coordinates-seat-map-of-a-list-of-pickup',
      'displayId': 'MV-58-get-coordinates-seat-map-of-a-list-of-pickup',
      'latestCommit': '45094955932459674a992f6bcb2b67fb6d6faee0',
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
      }
    },
    'toRef': {
      'id': 'refs/heads/develop',
      'displayId': 'develop',
      'latestCommit': '34cfa5c37272bd1178a3275a21e7274da6eb580c',
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
      }
    },
    'locked': false,
    'author': {
      'user': {
        'name': 'thanh.duong',
        'emailAddress': 'thanh.duong@vexere.com',
        'id': 356,
        'displayName': 'Dương Đăng Thanh',
        'active': true,
        'slug': 'thanh.duong',
        'type': 'NORMAL'
      }, 'role': 'AUTHOR', 'approved': false, 'status': 'UNAPPROVED'
    },
    'reviewers': [{
      'user': {
        'name': 'khanh.nguyen',
        'emailAddress': 'khanh.nguyen@vexere.com',
        'id': 52,
        'displayName': 'Khánh Nguyễn',
        'active': true,
        'slug': 'khanh.nguyen',
        'type': 'NORMAL'
      }, 'role': 'REVIEWER', 'approved': false, 'status': 'UNAPPROVED'
    }],
    'participants': [{
      'user': {
        'name': 'dinh.tran@vexere.com',
        'emailAddress': 'dinh.tran@vexere.com',
        'id': 507,
        'displayName': 'Trần Văn Định',
        'active': true,
        'slug': 'dinh.tran_vexere.com',
        'type': 'NORMAL'
      }, 'role': 'PARTICIPANT', 'approved': false, 'status': 'UNAPPROVED'
    }]
  }
}
];

module.exports = {
  'pr:merged': merged,
  'pr:opened': opened,
  'pr:comment:added': comment_add,
  'pr:declined': declined
};
