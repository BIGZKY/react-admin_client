const mongoose = require('./db.js');
var mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: String,
    password: String,
    create_time: String,
    auth: String
})
ProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('user', UserSchema)