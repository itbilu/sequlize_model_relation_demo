'use strict';

var Sequelize=require('sequelize');

exports.sequelize = function () {
	return new Sequelize('modelTest', 'root', '111111', {host: 'localhost', port:3306, logging:console.log});
}
