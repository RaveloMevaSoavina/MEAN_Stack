var mongoose = require('mongoose');
var db = require('./db');
var Schema = mongoose.Schema;

var _description = { type: String, required : true};
var _user = {type: Schema.Types.ObjectId, ref: 'User'};

var MessageSchema = new Schema({
    description: _description,
    user: _user},
    {timestamps: true}
);

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;