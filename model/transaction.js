'use strict';

var Sequelize = require('sequelize');
var Transaction = require('sequelize').Transaction;

var sequelize = new Sequelize('modelTest', 'root', '111111', {host: 'localhost', port:3306, logging:console.log});
var User = sequelize.import('./user.js');
var UserCheckin = sequelize.import('./userCheckin.js');


sequelize.transaction(function (t) {
	// 在事务中执行操作
	return User.create({username: 'itbilu.com', password: 'pwd', active: true}, {transaction:t})
	.then(function(user){
		return UserCheckin.create({userId: user.id, loginIp:'127.0.0.1'}, {transaction:t})
	});
}).then(function (results){
	/* 操作成功，事务会自动提交 */
}).catch(function(err){
  /* 操作失败，事件会自动回滚 */
});

