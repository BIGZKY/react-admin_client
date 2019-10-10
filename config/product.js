const mongoose = require('./db.js')

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

module.exports = mongoose.model('Products', ProductSchema)