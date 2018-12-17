const handleRepo = require('./repo');

function handle(payload) {
  let eventKey = payload.eventKey;
  let [type, key] = eventKey.split(':');
  switch (type) {
    case 'repo':
      handleRepo(key, payload);
      break;
    case 'pr':
      console.warn('No implement', eventKey);
      break;
    default:
      console.warn('Unknow type', JSON.stringify(payload));
  }
}



module.exports = handle;