const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO cần bổ sung thêm các trường thông tin
let UserSchema = new Schema({
    name: String,
    id_jira: String,
    id_slack: String,
    id_skype: String,
    id_firebase: String
});

let Users = mongoose.model('UsersInfo', UserSchema);
module.exports = Users;