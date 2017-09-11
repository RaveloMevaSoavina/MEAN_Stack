var mongoose = require('mongoose');
var db = require('./db');
var Schema = mongoose.Schema;

var _description = { type: String, required : true};
var _user = {type: Schema.Types.ObjectId, ref: 'User'};

var MessageScema = new Schema({
    description: _description,
    user: _user},
    {timestamps: true}
);

var connection = mongoose.createConnection(db.getDbConnectionString());
var Message = connection.model('Message', MessageScema);
module.export = Message;