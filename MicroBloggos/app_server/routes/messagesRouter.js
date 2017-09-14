var express = require('express');
var router = express.Router();
var controller = require('../controllers/messagesController');
var url = require('url');
var jwt = require('jsonwebtoken');

/* GET users. */

router.get('/', function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host');
    controller.messagesReadAll(req.body, res, fullUrl);
});
router.get('/:messageid', function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host');
    controller.messageReadOne(req.params, res, fullUrl);
});
router.use('/', function (req, res, next) {

    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            if (err.name == 'TokenExpiredError') return res.status(401).json({ title: 'Authentication error', message: 'Session expired, please signin again' });
            else return res.status(401).json({ title: 'Authentication error', message: 'Not authenticated'});
        }
        next();
    })
});
router.post('/', function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host');
    controller.messageAdd(req, res, fullUrl);
});
router.patch('/:messageid', function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host');
    controller.messageUpdateOne(req, res, fullUrl);
});
router.delete('/:messageid', function (req, res, next) {
    controller.messageDeleteOne(req.params, res);
});
module.exports = router;