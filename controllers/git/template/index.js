const swig = require('swig');
const {resolve} = require('path');

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

// Compile a file and store it, rendering it later
const git_template = swig.compileFile(resolve(__dirname, './GIT.html'));

module.exports = {
  git_template
};
