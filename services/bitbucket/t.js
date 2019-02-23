const request = require('request');

const BASE_URL = 'https://git.vexere.net';

function getChanges(obj) {
  return new Promise((resolve, reject) => {
    let {projectKey, repositorySlug, commitId, fromHash} = obj;
    if (+fromHash == 0) fromHash = '';

    let options = {
      method: 'GET',
      url: `${BASE_URL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/commits/${commitId}/changes?since=${fromHash}`,
      headers: {Authorization: 'Basic Ym9vdC5qaXJhOlRob25nMTIz'}
    };

    request(options, function(error, response, body) {
      if (error) return resolve(null);
      resolve(JSON.parse(body));
    });
  });
}

module.exports = {
  getChanges
};
