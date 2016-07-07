'use strict';

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('UserCheckin', {
		id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
		userId: { 
			type: DataTypes.BIGINT(11), 
			field: 'user_id',
			unique: true, 
			references: {
				model: 'User',
				key: 'id'
			},
			comment:'用户Id' },
		loginIp: { type: DataTypes.STRING, field: 'login_ip', allowNull: false, defaultValue: '' , validate: {isIP: true}, comment:'登录IP'}
	},
	{
		underscored: true,
		timestamps: true,
		tableName: 'userCheckin',
		comment: '用户登录信息',
		charset: 'utf8',
		collate: 'utf8_general_ci',
		indexes: [{
			name: 'userCheckin_userId',
			method: 'BTREE',
			fields: ['user_id']
		}]
	});
}

