'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class AddressKecamatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.AddressKota, {
        foreignKey: 'kota_id',
        as: 'kota'
      })

      this.hasMany(models.AddressKelurahan, {
        foreignKey: 'kecamatan_id',
        as: 'kelurahan'
      })
    }
  }
  AddressKecamatan.init(
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
      modelName: 'AddressKecamatan'
    }
  )
  return AddressKecamatan
}
