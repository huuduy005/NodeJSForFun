var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO cần bổ sung thêm các trường thông tin
var tokenSchema = new Schema({
    name_service: String,
    token_type: String,
    expires_in: Number,
    ext_expires_in: Number,
    access_token: String
});

var Tokens = mongoose.model('Tokens', tokenSchema);
module.exports = Tokens;