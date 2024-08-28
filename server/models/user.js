module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		admin: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		token: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		refreshToken: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'users',
		timestamps: false,
		indexes: [
			{
				unique: true,
				fields: ['username']
			}
		]
	});
};