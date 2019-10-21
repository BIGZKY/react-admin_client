const mongoose = require('./db.js');
var mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;
var RoleSchema = new Schema({
    menus: Array,
    name: String,
    create_time: Number,
    auth_time: Number,
    auth_name: String,
})
RoleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('role', RoleSchema)