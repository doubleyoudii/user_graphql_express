const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR =  10;

module.exports = (mysqlConn) => {
	var user_schema = mysqlConn.define('user', {
		id: {
		  autoIncrement: true,
		  primaryKey: true,
		  type: Sequelize.INTEGER
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	}, {
		hooks: {
			beforeCreate: async (user) => {
				if (user.password) {
	                let salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
					user.password = await bcrypt.hash(user.password, salt);
				}
			},
			beforeUpdate:async (user) => {
				if (user.password) {
	                let salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
					user.password = await bcrypt.hash(user.password, salt);
				}
			}
		},
		instanceMethods: {
			validPassword: async (password) => {
				return await bcrypt.compare(password, this.password);
			}
		},
		paranoid: true,

		// If you want to give a custom name to the deletedAt column
		// deletedAt: 'destroyTime'
	});

	user_schema.prototype.validPassword = async (password, hash) => {
		return await bcrypt.compare(password, hash);
	}
	return user_schema;
}