'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class AddressKelurahan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.AddressKecamatan, {
        foreignKey: 'kecamatan_id',
        as: 'kecamatan'
      })
    }
  }
  AddressKelurahan.init(
    {
      id: {
        type: DataTypes.STRING(11),
        allowNull: false,
        primaryKey: true
      },
      nama: DataTypes.STRING
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'AddressKelurahan'
    }
  )
  return AddressKelurahan
}
