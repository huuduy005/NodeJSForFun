const request = require('request');
const baseDomain = 'https://git.vexere.net';
const v = '1.0';

function requestPromise(options) {
  return new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (error) return reject(error);
      resolve(body);
    });
  });
}

function getDataCommit(obj) {
  if (!(obj.projectName && obj.reposSlug && obj.commitId)) return resolve(null);
  let {projectName, commitId, reposSlug} = obj;
  let options = {
    method: 'GET',
    url: `${baseDomain}/rest/api/${v}/projects/${projectName}/repos/${reposSlug}/commits/${commitId}`,
    headers: {Authorization: 'Basic Ym9vdC5qaXJhOlRob25nMTIz'},
    json: true
  };

  return requestPromise(options);
}

function getChangesCommit(obj) {
  if (!(obj.projectName && obj.reposSlug && obj.commitId)) return resolve(null);
  let {projectName, commitId, reposSlug, fromHash} = obj;
  if (+fromHash == 0) fromHash = '';

  let options = {
    method: 'GET',
    url: `${baseDomain}/rest/api/${v}/projects/${projectName}/repos/${reposSlug}/commits/${commitId}/changes?since=${fromHash}`,
    headers: {Authorization: 'Basic Ym9vdC5qaXJhOlRob25nMTIz'},
    json: true
  };

  return requestPromise(options);
}

module.exports = {
  getDataCommit,
  getChangesCommit,
};

// getDataCommit({projectName: 'API', reposSlug: 'vxrapi', commitId: '5b668d9b5e5'}).then(res => {
//   console.log(res);
// });
