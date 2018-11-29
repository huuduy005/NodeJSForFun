const _ = require('lodash');
const UsersModel = require('../../models/user');

async function getByIdJIRA(ids) {
  if (!ids) throw new Error('Names can\'t be empty');
  let _ids = _.isArray(ids) ? ids : [ids];
  let list_id = _ids.map((id) => ({'id_jira': id}));
  let users = await UsersModel.find({$or: list_id});
  // console.log(users);
  return users;
}

module.exports = {
  getByIdJIRA
};