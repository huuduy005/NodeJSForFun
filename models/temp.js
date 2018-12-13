const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO cần bổ sung thêm các trường thông tin
let TempSchema = new Schema({
    __source__: String,
    __data__: String,
}, {strict: false});

module.exports = mongoose.model('Temp', TempSchema);
