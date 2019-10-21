const mongoose = require('./db.js');
var mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: String,
    password: String,
    create_time: Number,
    role_id: String,
    role_name: String,
    phone: String,
    email: String
})
UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('users', UserSchema)