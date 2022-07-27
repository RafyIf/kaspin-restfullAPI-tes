const sequelize = require('sequelize')
const credential =
  require('../config/database')[process.env.NODE_ENV || 'development']

const ConnectSequelize = sequelize.Sequelize

var database = new ConnectSequelize(
  credential.database,
  credential.username,
  credential.password,
  credential
)

var models = {
  AddressProvince: require('./addressprovince')(database, sequelize.DataTypes),
  AddressKota: require('./addresskota')(database, sequelize.DataTypes),
  AddressKecamatan: require('./addresskecamatan')(
    database,
    sequelize.DataTypes
  ),
  AddressKelurahan: require('./addresskelurahan')(database, sequelize.DataTypes)
}

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

module.exports = {
  models,
  database,
  sequelize
}
