const {mongodb} = require('config');
const mongoose = require('mongoose');

module.exports = () => {
  // Use native Node promises
  mongoose.Promise = global.Promise;
  let db = mongoose.connect(
    mongodb.uri,
    {useNewUrlParser: true}
  );

  db.then(function() {
    console.log('Kết nối thành công đến' + mongodb.uri);
  }).catch(function(err) {
    console.error(err);
  });
  return db;
};
