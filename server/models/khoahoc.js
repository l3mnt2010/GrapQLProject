// models/khoahoc.js
module.exports = (sequelize, DataTypes) => {
                                        const KhoaHoc = sequelize.define('khoahoc', {
                                          id: {
                                            type: DataTypes.INTEGER,
                                            primaryKey: true,
                                            autoIncrement: true,
                                          },
                                          ten_khoa: {
                                            type: DataTypes.STRING,
                                            allowNull: false,
                                          },
                                        }, {
                                          tableName: 'khoahoc',
                                          timestamps: false,
                                        });
                                      
                                        KhoaHoc.associate = models => {
                                          KhoaHoc.hasMany(models.monhoc, { foreignKey: 'khoa_id', as: 'monhocs' });
                                        };
                                      
                                        return KhoaHoc;
                                      };
                                      