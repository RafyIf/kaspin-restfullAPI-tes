'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class AddressKota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.AddressProvince, {
        foreignKey: 'provinsi_id',
        as: 'provinsi'
      })

      this.hasMany(models.AddressKecamatan, {
        foreignKey: 'kota_id',
        as: 'kecamatan'
      })
    }
  }
  AddressKota.init(
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
      modelName: 'AddressKota'
    }
  )
  return AddressKota
}
