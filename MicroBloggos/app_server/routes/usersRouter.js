var express = require('express');
var router = express.Router();
var controller = require('../controllers/usersController');
var url = require('url');

/* GET users. */
router.get('/', function (req, res, next) {
  var fullUrl = req.protocol + '://' + req.get('host');
  controller.usersReadAll(req.body, res, fullUrl);
});
router.get('/:userid', function (req, res, next) {
  var fullUrl = req.protocol + '://' + req.get('host');
  controller.usersReadOne(req.params, res, fullUrl);
});
router.put('/:userid', function (req, res, next) {
  var fullUrl = req.protocol + '://' + req.get('host');  
  controller.usersUpdateOne(req, res, fullUrl);
});
router.delete('/:userid', function (req, res, next) {
  controller.usersDeleteOne(req.params, res);
});
module.exports = router;