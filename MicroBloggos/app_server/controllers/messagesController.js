var validator = require("../utils/query_validator");
var Message = require("../models/messageModel");
var url = require('url');

module.exports = {
    messageAdd: function (req_body, response, url) {
<<<<<<< HEAD
        /*if(!req_body.isJson){
            return response.status(500).send(JSON.stringify({ 'error': 'Not JSON object' }));
        }*/
        if (!('description' in req_body) || !('user' in req_body) || req_body.description.length < 4) {
            return response.status(500).send(JSON.stringify({ 'title': 'Bad parameters', 'message':'expected parameters not found in body' }));
        }
        var message = new Message({
            description: req_body.description,
            user: req_body.user
        });
        Message.create(message, function (err, message) {
            if (err) response.status(500).json({ 'title': 'error', 'message': err.message });
            else {
                message = message.toObject();
                //message['_id'] = url + '/messages/' + message['_id'];
                delete message['__v'];
                response.status(201).json({
                    message: 'Saved message',
                    obj: message
                });
            }
        });
    },
=======
        if (!('description' in req_body) ||  !('user' in req_body) || req_body.description.length() < 4) {
            return response.status(500).send(JSON.stringify({ 'error': 'Bad parameters' }));
        }
        var message = new Message({
            description: req_body.description,
            user:req_body.user
        });
        message.save(function(err, result){
            if (err) response.status(500).json({ 'title': 'error', 'error': err.message });
            else response.status(201).json(result);
        });
    },        
>>>>>>> ad904ccfcfbd4538210a2ecfc8f0f2a69bafa081
    //retourne tous les utilisateurs
    messagesReadAll: function (req_body, response, url) {
        var filter = {
            __v: false,
        };
        Message.find({}, filter, function (err, messages) {
            if (err) response.status(500).json({ 'title': 'error', 'message': err.message });
            else {
                //for (var i = 0; i < messages.length; i++)
                //    messages[i]['_id'] = url + '/messages/' + messages[i]['_id'];
                response.status(201).json({
                    message: 'Success',
                    obj: messages
                });
            }
        }).lean();
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
            return response.status(500).send(JSON.stringify({ 'title': 'Bad parameters', 'message':'expected parameters not found in body' }));
        }
        if (!req.params.messageid) {
            return response.status(500).json({ 'title': 'BAD_PARAMETERS', "message": "missing id" });
        }
        Message.findOne({ _id: req.params.messageid }, function (err, result) {
            if (err) response.status(500).json({ 'title': 'error', 'message': err.message });
            else {
                if (!result) {
                    response.status(401).json({ 'title': 'error', 'message': 'Message not found' });
                } else {
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
        Message.findOne({ _id: req_params.messageid }, function (err, message) {
            if (err) response.status(500).json({ 'title': 'error', 'message': err.message });//msg n'existe pas ou problème de bdd
            else if (!message) response.status(401).json({ 'title': 'error', 'message': 'message not found' });//msg introuvable
            else {
                Message.findByIdAndRemove({ _id: req_params.messageid }, function (err, message) {
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
