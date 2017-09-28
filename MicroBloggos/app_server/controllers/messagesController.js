var validator = require("../utils/query_validator");
var Message = require("../models/messageModel");
var User = require("../models/usersModel");

var url = require('url');
var jwt = require('jsonwebtoken');

module.exports = {
    messageAdd: function (req, response, url) {
        /*if(!req_body.isJson){
            return response.status(500).send(JSON.stringify({ 'error': 'Not JSON object' }));
        }*/
        if (!('description' in req.body) || req.body.description.length < 4) {
            return response.status(500).send(JSON.stringify({ 'title': 'Bad parameters', 'message': 'expected parameters not found in body' }));
        }

        var decoded = jwt.decode(req.query.token);
        User.findById(decoded.user._id, function (err, user) {
            if (err) response.status(500).json({ 'title': 'error', 'message': err.message });
            else{
                var message = new Message({
                    description: req.body.description,
                    user: user._id
                });
                Message.create(message, function (err, message) {
                    if (err) response.status(500).json({ 'title': 'error', 'message': err.message });
                    else {
                        user.messages.push(message);
                        user.save();
                        message = message.toObject();
                        //message['_id'] = url + '/messages/' + message['_id'];
                        delete message['__v'];
                        response.status(201).json({
                            message: 'Saved message',
                            obj: message
                        });
                    }
                });
            }
            
            
        })
    },
    //retourne tous les utilisateurs
    messagesReadAll: function (req_body, response, url) {
        var filter = {
            __v: false,
        };
        Message.find({}, filter)
        .populate('user', 'username')
        .exec(function (err, messages) {
            if (err) response.status(500).json({ 'title': 'error', 'message': err.message });
            else {
                response.status(201).json(messages);
            }
        });
    },
    //retourne un user selon son id
    messageReadOne: function (req_params, response, url) {
        if (!req_params.messageid) {
            return response.status(500).json({ 'error_type': 'Bad parameters', 'message': "missing id" });
        }
        var filter = {
            __v: false,
        };
        Message.findOne({ _id: req_params.messageid }, filter, function (err, message) {
            if (err) response.status(500).json({ 'title': 'error', 'message': err.message });
            else {
                //message['_id'] = url + '/messages/' + message['_id'];
                response.status(201).json(message);
            }
        }).lean();
    },

    messageUpdateOne: function (req, response, url) {
        if (!('description' in req.body) || req.body.description.length < 4) {
            return response.status(500).send(JSON.stringify({ 'title': 'Bad parameters', 'message': 'expected description not supplied or too short' }));
        }
        if (!req.params.messageid) {
            return response.status(500).json({ 'title': 'Bad parameters', "message": "missing id" });
        }
        var decoded = jwt.decode(req.query.token);
        Message.findOne({ _id: req.params.messageid }, function (err, result) {
            if (err) response.status(500).json({ 'title': 'error', 'message': err.message });
            else {
                if (!result) {
                    response.status(401).json({ 'title': 'error', 'message': 'Message not found' });
                }else if(result.user != decoded.user._id){
                    response.status(500).json({ 'title': 'Error', "message": "Not autenticated" });
                }else {
                    var message = {};
                    (req.body.description !== result.description ? message['description'] = req.body.description : null);
                    if (!Object.keys(message).length) {
                        return response.status(500).json({ 'title': 'Bad parameters', 'message': 'nothing to update' });
                    }
                    Message.update(message, function (err, message) {
                        if (err) response.status(500).json({ 'title': 'error', 'message': err.message });
                        else {
                            response.status(200).json({
                                message: 'Update success',
                                obj: message
                            });
                        }
                    });
                }
            }
        });
    },
    //suppression d'un message 
    messageDeleteOne: function (req_params, response) {
        if (!req_params.messageid) {
            return response.status(500).json({ 'error_type': 'Bad parameters', "error": "missing id" });
        }
        //requète message
        var decoded = jwt.decode(req.query.token);
        Message.findOne({ _id: req_params.messageid }, function (err, message) {
            if (err) response.status(500).json({ 'title': 'error', 'message': err.message });//msg n'existe pas ou problème de bdd
            else if (!message) response.status(401).json({ 'title': 'error', 'message': 'message not found' });//msg introuvable
            else if(result.user != decoded.user._id){
            response.status(500).json({ 'title': 'Error', "message": "Not autenticated" });
            } else {
                message.remove(function (err, message) {
                    if (err) response.status(500).json({ 'title': 'error', 'message': err.message });
                    else {
                        response.status(200).json({
                            message: 'Deleted message',
                            obj: message
                        });
                    }
                });
            }
        });
    }
}
