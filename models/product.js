/**
 * Created by huudu on 14/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO cần bổ sung thêm các trường thông tin
var productSchema = new Schema({
    id: Number,
    name: String,
    manufacture: String,
    short_description: String,
    price: Number,
    information_detail: String,
    description: String,
    category: String,
    warranty: String,
    pictures: String,
    avatar: String
});

var Products = mongoose.model('Products', productSchema);
module.exports = Products;