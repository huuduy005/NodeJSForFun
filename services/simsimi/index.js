const swig = require('swig');
const {resolve} = require('path');

const getTextApi = require('./apis');

// Compile a file and store it, rendering it later
const text_template = swig.compileFile(resolve(__dirname, './text.html'));

async function getText(mess, data) {
  let text = await getTextApi(mess);
  let user = data.from;

  return text_template({text, user});
}

module.exports = {
  getText
};

getText('chào').then(res => console.log(res));
