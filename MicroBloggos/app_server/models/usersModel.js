var db = require('./db');
var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var _username = { type: String, required : true};
var _email = {type: String, unique: true, required : true};
var _password = { type: String, required : true};
var _messages = [{type: Schema.Types.ObjectId, ref: 'Message'}];

var UserSchema = new Schema({
    username: _username,
    email: _email,
    password: _password,
    messages: _messages },
    {timestamps: true}
);
UserSchema.plugin(mongooseUniqueValidator);

var User = mongoose.model('User', UserSchema);
module.exports = User;