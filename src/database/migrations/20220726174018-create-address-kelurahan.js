'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AddressKelurahans', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(11)
      },
      kecamatan_id: {
        type: Sequelize.STRING(10),
        allowNull: false,
        references: {
          model: 'AddressKecamatans',
          key: 'id'
        }
      },
      nama: {
        type: Sequelize.STRING
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AddressKelurahans')
  }
}
