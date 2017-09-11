var validator = require("../utils/query_validator");
var User = require("../models/usersModel");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var url = require('url');

module.exports = {
    //retourne tous les utilisateurs
    usersReadAll: function (req_body, response, url) {
        var usersProjection = {
            __v: false,
            password: false
        };
        User.find({}, usersProjection, function (err, result) {
            if (err) response.status(500).json({ 'title': 'error', 'error': err.message });
            else {
                for (var i = 0; i < result.length; i++)
                    result[i]['_id'] = url + '/users/' + result[i]['_id'];
                response.status(201).json(result);
            }
        }).lean();
    },
    //retourne un user selon son id
    usersReadOne: function (req_params, response, url) {
        if (!req_params.userid) {
            response.status(500).json({ 'error_type': 'BAD_PARAMETERS', "error": "missing id" });
        }
        //on élimine les données inutiles ou sensibles de la requète
        var usersProjection = {
            __v: false,
            password: false
        };
        User.findOne({ _id: req_params.userid}, usersProjection, function (err, user) {
            if (err) response.status(500).json({ 'title': 'error', 'error': err.message });
            else {//on transforme l'_id du user rendu par la requète en une url permettant de le retrouver
                user['_id'] = url + '/users/' + user['_id'];
                response.status(201).json(user);
            }
        }).lean();//attribut lean permet de rendre modifiable le retour de query
    },
    //update d'un user
    usersUpdateOne: function (req, response, url) {
        if (!req.params.userid) {//id absent de la requète
            response.status(500).json({ 'error_type': 'BAD_PARAMETERS', "error": "missing id" });
        }
        User.findOne({ _id: req.params.userid }, function (err, result) {
            if (err) response.status(500).json({ 'title': 'error', 'error': err.message });
            else {
                if (!result) {
                    response.status(401).json({ 'title': 'error', 'error': 'user not found' });
                } else {
                    var user =  {};
                    (req.body.username && req.body.username != result.username? user['username'] = req.body.username:null);
                    (req.body.email && req.body.email != result.email ? user['email'] = req.body.email:null);
                    (req.body.password? user['password'] = req.body.password:null);
                    console.log(user, result);
                    if (!Object.keys(user).length) {
                        response.status(500).json({ 'error_type': 'BAD_PARAMETERS','error': 'nothing to update'});
                        return;
                    }
                    var validator_errors = validator.validateUser(user, false);
                    if (Object.keys(validator_errors[0]).length) { 
                        response.status(500).json({ 'error_type': 'VALIDATION_ERROR', validator_errors});
                        return;
                    } else {
                        if(user.password) user.password = bcrypt.hashSync(user.password, 10);
                        User.update(user, function (err, result) {
                            if (err) response.status(500).json({ 'title': 'error', 'error': err.message });
                            else {
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
    usersDeleteOne: function (req_params, response) {
        if (!req_params.userid) {//id est absent dans la requète, on renvoi une erreur 500
            response.status(500).json({ 'error_type': 'BAD_PARAMETERS', "error": "missing id" });
        }
        //requète user
        User.findOne({ _id: req_params.userid }, function (err, result) {
            if (err) response.status(500).json({ 'title': 'error', 'error': err.message });//user n'existe pas ou problème de bdd
            else if(!result) response.status(401).json({ 'title': 'error', 'error': 'user not found' });//user introuvable
            else {//user existe, on le supprime
                User.findByIdAndRemove({_id:req_params.userid}, function(err, result){
                    if (err) response.status(500).json({ 'title': 'error', 'error': err.message });
                    else {
                        response.status(201).json({'success': 'user successfully deleted', result});
                    }
                });
            }
        });
    }
}