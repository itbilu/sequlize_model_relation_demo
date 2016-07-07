'use strict';

var sequelize=require('./_db').sequelize();
var User = sequelize.import('./user.js');
var UserCheckin = sequelize.import('./userCheckin.js');
var UserAddress = sequelize.import('./userAddress.js');
var Role = sequelize.import('./role.js');

// 建立模型之间的关系
User.hasOne(UserCheckin);
UserCheckin.belongsTo(User);
User.hasMany(UserAddress, {foreignKey:'user_id', targetKey:'id', as:'Addresses'});
Role.belongsToMany(User, {through: 'userRoles'});

// 同步模型到数据库中
sequelize.sync();

exports.User = User;
exports.UserCheckin = UserCheckin;
exports.UserAddress = UserAddress;
exports.Role = Role;