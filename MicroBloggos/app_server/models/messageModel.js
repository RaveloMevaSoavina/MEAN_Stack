var mongoose = require('mongoose');
var User = require("./usersModel");
var db = require('./db');
var Schema = mongoose.Schema;

var _description = { type: String, required : true};
var _user = {type: Schema.Types.ObjectId, ref: 'User'};

var MessageSchema = new Schema({
    description: _description,
    user: _user},
    {timestamps: true}
);
MessageSchema.post('remove', function(message){
    User.findById(message.user, function(err, user){
        console.log('remove user message');
        if(err) console.log(err);
        user.messages.pull(message._id);
        user.save();
    });
})
var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
