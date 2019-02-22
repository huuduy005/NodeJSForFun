const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO cần bổ sung thêm các trường thông tin
let JobSchema = new Schema({
    type: String,
    data: Object,
    updated: { type: Date, default: Date.now },
}, {strict: false});

module.exports = mongoose.model('job', JobSchema);
