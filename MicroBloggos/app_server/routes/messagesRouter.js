var express = require('express');
var router = express.Router();
var controller = require('../controllers/messagesController');
var url = require('url');

/* GET messages. */
router.post('/', function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host');
    controller.messageAdd(req.body, res, fullUrl);
});
router.get('/', function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host');
    controller.messagesReadAll(req.body, res, fullUrl);
});
router.get('/:messageid', function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host');
    controller.messageReadOne(req.params, res, fullUrl);
});
router.patch('/:messageid', function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host');
    controller.messageUpdateOne(req, res, fullUrl);
});
router.delete('/:messageid', function (req, res, next) {
    controller.messageDeleteOne(req.params, res);
});
module.exports = router;