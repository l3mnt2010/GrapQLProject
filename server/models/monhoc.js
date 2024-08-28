module.exports = (sequelize, DataTypes) => {
  const MonHoc = sequelize.define('monhoc', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ten_mon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    khoa_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'khoahoc',
        key: 'id',
      },
      allowNull: true,
    },
  }, {
    tableName: 'monhoc',
    timestamps: false,
  });

  MonHoc.associate = models => {
    MonHoc.belongsTo(models.khoahoc, { foreignKey: 'khoa_id', as: 'khoahoc' });
    MonHoc.hasMany(models.cauhoi, { foreignKey: 'mon_id', as: 'cauhois' });
  };

  return MonHoc;
};