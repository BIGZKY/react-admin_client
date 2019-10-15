const mongoose = require('./db.js');
var mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;
var ProductSchema = new Schema({
    status: Number,
    imgs: Array,
    name: String,
    desc: String,
    price: Number,
    pCategoryId: String,
    categoryId: String,
    detail: String
})
ProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('products', ProductSchema)