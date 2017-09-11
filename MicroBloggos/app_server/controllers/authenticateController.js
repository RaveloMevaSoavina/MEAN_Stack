var validator = require("../utils/query_validator");
var User = require("../models/usersModel");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
    userRegister: function (req_body, response) {
        if (!('username' in req_body) ||  !('email' in req_body) ||  !('password' in req_body)) {
            return response.status(500).send(JSON.stringify({ 'error': 'Bad parameters' }));
        }
        var user = new User({
            username: req_body.username,
            email: req_body.email,
            password: req_body.password
        });
        var validate = validator.validateUser(user);
        if (Object.keys(validate[0]).length) {
            response.status(500).json({ 'error_type': 'VALIDATION_ERROR', validate});
        } else {
            user.password = bcrypt.hashSync(user.password, 10);
            user.save(function (err, result) {
                if (err) response.status(500).json({ 'title': 'error', 'error': err.message });
                else response.status(201).json(result);
            })
        }
    },
    userLogin : function (req_body, response) {
        if (!('email' in req_body) ||  !('password' in req_body)) {
            return response.status(500).send(JSON.stringify({ 'error': 'Bad parameters' }));
        }
        User.findOne({email: req.body.email}, function(err, result){
            if (err) response.status(500).json({ 'title': 'error', 'error': err.message });
            else {
                if(!result){
                    response.status(401).json({ 'title': 'error', 'error': 'login failed' });
                }else{
                    if(!bcrypt.compareSync(req.body.password, user.password)){
                        response.status(401).json({ 'title': 'error', 'error': 'login failed' });
                    }else{
                        var token = jwt.sign({user : user}, 'secret', {expiresIn: 7200});
                        res.status(200).json({message: 'Successfully logged in', token: token, userId: _id});
                    }
                }
            }
        })
    }

}