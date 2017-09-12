var express = require('express');
var router = express.Router();
var controller = require('../controllers/authenticateController');

router.post('/register', function (req, res, next) {    
    controller.userRegister(req.body, res);
});
router.post('/login', function (req, res, next) {    
    controller.userLogin(req.body, res);
});

module.exports = router;