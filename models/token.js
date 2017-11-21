const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO cần bổ sung thêm các trường thông tin
let tokenSchema = new Schema({
    name_service: String,
    token_type: String,
    expires_in: Number,
    ext_expires_in: Number,
    access_token: String,
    ext_time: Number
});

let Tokens = mongoose.model('Tokens', tokenSchema);
module.exports = Tokens;