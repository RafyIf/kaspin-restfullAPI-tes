'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AddressProvinces', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(10)
      },
      nama: {
        type: Sequelize.STRING
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AddressProvinces')
  }
}
