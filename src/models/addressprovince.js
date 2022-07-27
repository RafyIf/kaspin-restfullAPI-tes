'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class AddressProvince extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.AddressKota, {
        foreignKey: 'provinsi_id',
        as: 'kota'
      })
    }
  }
  AddressProvince.init(
    {
      id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true
      },
      nama: DataTypes.STRING
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'AddressProvince'
    }
  )
  return AddressProvince
}
