'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AddressKecamatans', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(10)
      },
      kota_id: {
        type: Sequelize.STRING(10),
        allowNull: false,
        references: {
          model: 'AddressKota',
          key: 'id'
        }
      },
      nama: {
        type: Sequelize.STRING
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AddressKecamatans')
  }
}
