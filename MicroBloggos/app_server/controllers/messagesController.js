var validator = require("../utils/query_validator");
var Message = require("../models/messageModel");
var url = require('url');

module.exports = {
    messageAdd: function (req_body, response, url) {
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
    //retourne tous les utilisateurs
    messagesReadAll: function (req_body, response, url) {
        var filter = {
            __v: false,
        };
        Message.find({}, filter, function (err, result) {
            if (err) response.status(500).json({ 'title': 'error', 'error': err.message });
            else {
                for (var i = 0; i < result.length; i++)
                    result[i]['_id'] = url + '/messages/' + result[i]['_id'];
                response.status(201).json(result);
            }
        }).lean();
    },
    //retourne un user selon son id
    messageReadOne: function (req_params, response, url) {
        if (!req_params.messageid) {
            response.status(500).json({ 'error_type': 'BAD_PARAMETERS', "error": "missing id" });
        }
        var filter = {
            __v: false,
        };
        User.findOne({ _id: req_params.messageid}, filter, function (err, result) {
            if (err) response.status(500).json({ 'title': 'error', 'error': err.message });
            else {
                result['_id'] = url + '/messages/' + result['_id'];
                response.status(201).json(result);
            }
        }).lean();
    },

    messageUpdateOne: function (req, response, url) {
        if (!req.params.messageid) {
            response.status(500).json({ 'error_type': 'BAD_PARAMETERS', "error": "missing id" });
        }
        Message.findOne({ _id: req.params.messageid }, function (err, result) {
            if (err) response.status(500).json({ 'title': 'error', 'error': err.message });
            else {
                if (!result) {
                    response.status(401).json({ 'title': 'error', 'error': 'Message not found' });
                } else {
                    var message =  {};
                    (req.body.desciption && req.body.description !== result.description? user['description'] = req.body.desciption:null);
                    (req.body.email && req.body.email != result.email ? user['email'] = req.body.email:null);
                    (req.body.password? user['password'] = req.body.password:null);
                    if (!Object.keys(user).length) {//l'objet ne contient aucun champs à updater au final on retourne une erreur
                        response.status(500).json({ 'error_type': 'BAD_PARAMETERS','error': 'nothing to update'});
                        return;
                    }
                    //on valide l'objet user en passant false au validateur afin qu'il ne prenne en compte que les champs remplis
                    var validator = utils.validateUser(user, false);
                    console.log(validator);
                    if (Object.keys(validator[0]).length) {//si l'objet validator contient quelque chose ça indique une/des erreur(s), on renvoi une erreur 
                        response.status(500).json({ 'error_type': 'VALIDATION_ERROR', validator});
                    } else {//si tout est ok, on regarde si un password fait partie de l'update et si oui on le hash
                        if(user.password) user.password = bcrypt.hashSync(user.password, 10);
                        User.update(user, function (err, result) {
                            if (err) response.status(500).json({ 'title': 'error', 'error': err.message });
                            else {//modification de la date de dernière modif
                                User.update({updatedAt:new Date()}, function (err, result) {
                                    if (err) response.status(500).json({ 'title': 'error', 'error': err.message });
                                    else response.status(201).json(result);
                                });
                            }
                        });
                    }
                }
            }
        });
    },
    //suppression d'un user 
    messageDeleteOne: function (req_params, response) {
        if (!req_params.messageid) {
            response.status(500).json({ 'error_type': 'BAD_PARAMETERS', "error": "missing id" });
        }
        //requète message
        User.findOne({ _id: req_params.messageid }, function (err, result) {
            if (err) response.status(500).json({ 'title': 'error', 'error': err.message });//user n'existe pas ou problème de bdd
            else if(!result) response.status(401).json({ 'title': 'error', 'error': 'message not found' });//user introuvable
            else {//user existe, on le supprime
                User.findByIdAndRemove({_id:req_params.messageid}, function(err, result){
                    if (err) response.status(500).json({ 'title': 'error', 'error': err.message });
                    else {
                        response.status(201).json({'success': 'user successfully deleted', result});
                    }
                });
            }
        });
    }
}