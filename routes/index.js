var express = require('express');
var router = express.Router();
// 引用模型
var User = require('../model').User;
var UserCheckin = require('../model').UserCheckin;
var UserAddress = require('../model').UserAddress;
var Role = require('../model').Role;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
