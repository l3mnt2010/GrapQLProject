module.exports = (sequelize, DataTypes) => {
  const CauHoi = sequelize.define('cauhoi', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    noi_dung: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mon_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'monhoc',
        key: 'id',
      },
      allowNull: true,
    },
  }, {
    tableName: 'cauhoi',
    timestamps: false,
  });

  CauHoi.associate = models => {
    CauHoi.belongsTo(models.monhoc, { foreignKey: 'mon_id', as: 'monhoc' });
    CauHoi.hasMany(models.phuongan, { foreignKey: 'cau_hoi_id', as: 'phuongan' });
  };

  return CauHoi;
};