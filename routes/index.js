var express = require('express');
var router = express.Router();
// 引用模型
var User = require('../model').User;
var UserCheckin = require('../model').UserCheckin;
var UserAddress = require('../model').UserAddress;
var Role = require('../model').Role;

/* User和Role中插入数据 */
router.get('/', function(req, res, next) {
	Promise.all([
		User.create({username:'itbilu', password:'itbilu.com'}),
		Role.create({roleName:'管理员'})
	]).then(function(results){
		console.og(results[0]);
		res.set('Content-Type', 'text/html; charset=utf-8');
		res.end('创建成功：'+JSON.stringify({user:results[0].dataValues, role:results[1].dataValues}));
	}).catch(next);
});

// 向 UserCheckin 插入数据 
router.get('/create/checkin', function(res, res, next){
	User.create({username:'itbilu', password:'itbilu.com'}).then(function(user){
		
		var userCheckin = UserCheckin.build({loginIp:'127.0.0.1'});
		user.setUserCheckin(userCheckin);

		res.set('Content-Type', 'text/html; charset=utf-8');
		res.end('UserCheckin 插入数据成功');
	}).catch(next);
});

// N:M 插入数据 
router.get('/create/userRoles', function(res, res, next){
	Promise.all([
		User.create({username:'itbilu', password:'itbilu.com'}),
		Role.create({roleName:'管理员'})
	]).then(function(results){
		var user = results[0];
		var role = results[1];
		user.setUserRoles(role);
		// 或
		// role.setUserRoles(user);
		res.set('Content-Type', 'text/html; charset=utf-8');
		res.end('userRoles 插入数据成功');
	}).catch(next);
});

// 查询User及UserCheckin
router.get('/select/user', function(res, res, next){
	User.findOne({include:[UserCheckin]}).then(function(user){
		console.log(user);
		res.set('Content-Type', 'text/html; charset=utf-8');
		res.end(JSON.stringify(user));
	}).catch(next);
});

// 查询User及UserAdress
router.get('/select/userAddress', function(res, res, next){
	User.findOne().then(function(user){
		user.getAddress();
		res.set('Content-Type', 'text/html; charset=utf-8');
		res.end(JSON.stringify(user));
	}).catch(next);
});

// 查询User及UserRoles
router.get('/select/userRoles', function(res, res, next){
	User.findOne().then(function(user){
		user.getUserRoles();
		res.set('Content-Type', 'text/html; charset=utf-8');
		res.end(JSON.stringify(user));
	}).catch(next);
});

// 更新 userCheckin
router.get('/update/userCheckin', function(res, res, next){
	User.findOne({include:[UserCheckin]}).then(function(user){
		var userCheckin = UserCheckin.build({userId:user.id, loginIp:'192.168.0.1'});
		user.setUserCheckin(userCheckin);
		res.set('Content-Type', 'text/html; charset=utf-8');
		res.end(JSON.stringify(user));
	}).catch(next);
});

// 删除 user
router.get('/delete/user', function(res, res, next){
	User.destroy({where:{id:2}}).then(function(result){
		res.set('Content-Type', 'text/html; charset=utf-8');
		res.end('删除完成');	
	}).catch(next);
	// 使用模型实例删除
	// User.findOne().then(function(user){
	// 	user.destroy();
	// 	res.set('Content-Type', 'text/html; charset=utf-8');
	// 	res.end('删除完成');	
	// }).catch(next);
});

// 删除 userCheckin
router.get('/delete/userCheckin', function(res, res, next){
	User.findOne({include:[UserCheckin]}).then(function(user){
		user.setUserCheckin(null);
		res.set('Content-Type', 'text/html; charset=utf-8');
		res.end(JSON.stringify(user));
	}).catch(next);
});

module.exports = router;
