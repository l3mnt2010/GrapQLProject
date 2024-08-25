// models/phuongan.js
module.exports = (sequelize, DataTypes) => {
  const PhuA = sequelize.define('phuongan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    noi_dung: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dung: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    cau_hoi_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cauhoi',
        key: 'id',
      },
      allowNull: true,
    },
  }, {
    tableName: 'phuongan',
    timestamps: false,
  });

  PhuA.associate = models => {
    PhuA.belongsTo(models.cauhoi, { foreignKey: 'cau_hoi_id', as: 'cauhoi' });
  };

  return PhuA;
};
