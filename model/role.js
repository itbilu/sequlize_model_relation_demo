'use strict';

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Role', {
		id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true, comment:'角色Id' },
		roleName: { type: DataTypes.STRING, field: 'role_name', comment:'角色名' }
	},
	{
		underscored: true,
		timestamps: false,
		freezeTableName: true,
		tableName: 'role',
		charset: 'utf8',
		collate: 'utf8_general_ci'
	});
}
