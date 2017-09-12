var express = require('express');
var router = express.Router();
var controller = require('../controllers/messagesController');
var url = require('url');

/* GET users. */
router.post('/messages', function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host');
    controller.messageAdd(req.body, res, fullUrl);
});
router.get('/messages', function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host');
    controller.messagesReadAll(req.body, res, fullUrl);
});
router.get('/messages/:messageid', function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host');
    controller.messageReadOne(req.params, res, fullUrl);
});
router.put('/messages/:messageid', function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host');
    controller.messageUpdateOne(req, res, fullUrl);
});
router.delete('/messages/:messageid', function (req, res, next) {
    controller.messageDeleteOne(req.params, res);
});
module.exports = router;