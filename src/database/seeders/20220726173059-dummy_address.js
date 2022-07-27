'use strict'

const path = require('path')
const fs = require('fs')

const getDataDummy = async () => {
  var dummy = {
    address_provinsi: null,
    address_kota: null,
    address_kecamatan: null,
    address_kelurahan: null
  }
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, 'data/allAddress.txt'),
      'utf-8',
      (err, data) => {
        if (err) {
          console.error(err)
          return reject(err)
        }
        const keys = Object.keys(dummy)
        const allAddress = JSON.parse(data)
        keys.map((key) => {
          dummy[key] = allAddress[key]
        })
        return resolve(dummy)
      }
    )
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    var dummy = await getDataDummy()

    await queryInterface.bulkInsert(
      'AddressProvinces',
      dummy.address_provinsi,
      {}
    )
    await queryInterface.bulkInsert('AddressKota', dummy.address_kota, {})
    await queryInterface.bulkInsert(
      'AddressKecamatans',
      dummy.address_kecamatan,
      {}
    )
    await queryInterface.bulkInsert(
      'AddressKelurahans',
      dummy.address_kelurahan,
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('AddressKelurahans', null, {})
    await queryInterface.bulkDelete('AddressKecamatans', null, {})
    await queryInterface.bulkDelete('AddressKota', null, {})
    await queryInterface.bulkDelete('AddressProvinces', null, {})
  }
}
