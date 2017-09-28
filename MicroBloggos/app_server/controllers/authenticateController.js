var validator = require("../utils/query_validator");
var User = require("../models/usersModel");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
    userRegister: function (req_body, response) {
        if (!('username' in req_body) ||  !('email' in req_body) ||  !('password' in req_body)) {
            return response.status(500).send(JSON.stringify({ 'title': 'Bad parameters', 'message':'expected parameters not found in body' }));
        }
        var user = new User({
            username: req_body.username,
            email: req_body.email,
            password: req_body.password
        });
        var validate = validator.validateUser(user);
        if (Object.keys(validate[0]).length) {
            response.status(500).json({ 'title': 'Validation error', 'message': validate});
        } else {
            user.password = bcrypt.hashSync(user.password, 10);
            user.save(function (err, result) {
                if (err) return response.status(500).json({ 'title': 'error', 'message': err.message });
                else response.status(201).json({'title': 'Signup', 'message': 'Successfully registered in',obj: result});
            })
        }
    },
    userLogin : function (req_body, response) {
        if (!('email' in req_body) ||  !('password' in req_body)) {
            return response.status(500).send(JSON.stringify({ 'title': 'Bad parameters', 'message':'expected parameters not found in body' }));
        }
        User.findOne({email: req_body.email}, function(err, user){
            if (err) response.status(500).json({ 'title': 'error', 'message': err.message });
            else {
                if(!user){
                    response.status(401).json({ 'title': 'error', 'message': 'user not found' });
                }else{
                    if(!bcrypt.compareSync(req_body.password, user.password)){
                        return response.status(401).json({ 'title': 'error', 'message': 'login failed' });
                    }else{
                        var token = jwt.sign({user : user}, 'secret', {expiresIn: 30000});
                        response.status(200).json({'title': 'login', 'message': 'Successfully logged in', token: token, userId: user._id});
                    }
                }
            }
        })
    }

}