const sample = require('./data.sample');
const {git_pr_template, git_template} = require('./index');

function test() {
  let data = sample['pr:opened'][0];
  // data.eventKey = 'pr:merged';
  // data.pullRequest.fromRef = undefined
  // data.pullRequest.toRef.repository.slug = 'huuduy'
  let text = git_pr_template(data);
  console.log(text);
  console.log('---------------------')
}

test();