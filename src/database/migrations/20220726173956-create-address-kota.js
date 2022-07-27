'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AddressKota', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(10)
      },
      provinsi_id: {
        type: Sequelize.STRING(10),
        allowNull: false,
        references: {
          model: 'AddressProvinces',
          key: 'id'
        }
      },
      nama: {
        type: Sequelize.STRING
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AddressKota')
  }
}
