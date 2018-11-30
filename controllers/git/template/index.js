const _ = require('lodash');
const swig = require('swig');
const extras = require('swig-extras');
const {resolve} = require('path');

extras.useTag(swig, 'switch');
extras.useTag(swig, 'case');

swig.setFilter('emotionSkype', type => {
  switch (type) {
    case 'MODIFY':
      return '(smoking)';
    case 'ADD':
      return '(inlove)';
    case 'DELETE':
      return '(bomb)';
    default:
      return '(drunk)';
  }
});

swig.setFilter('map', (type, path) => {
  // TODO more code
  return type.map(v => _.get(v, path));
});

// Compile a file and store it, rendering it later
const git_template = swig.compileFile(resolve(__dirname, './GIT.html'));
const git_pr_template = swig.compileFile(resolve(__dirname, './GIT_PR.swig'));

module.exports = {
  git_template,
  git_pr_template
};
