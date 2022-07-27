const { curl, pagination, keys } = require('../../utils')
const { arrayConverter, errors } = require('../../helper')

const { HttpInternalServerError, HttpNotFound } = errors.errorHandling

class ProvinsiService {
  static async curlProvinsi() {
    try {
      const { data } = await curl.get()
      const provinsi = data?.[keys.PROVINSI]
      const kota = data?.[keys.KOTA]
      return Promise.resolve({ provinsi, kota })
    } catch (error) {
      throw new HttpInternalServerError('failed to curl all address')
    }
  }

  /**
   *
   * @param {{limit:number, page:number, q:string}} params
   */
  async getProvinsi(params) {
    try {
      let { provinsi } = await ProvinsiService.curlProvinsi()
      if (params.q && params.q.length > 1) {
        provinsi = arrayConverter.searchArray(provinsi, {
          key: 'nama',
          value: params.q
        })
      }

      const meta = pagination(provinsi, params.limit || 10, params.page || 1)
      return meta
    } catch (error) {
      throw error
    }
  }

  async getOneProvinsiId(id) {
    try {
      const result = await ProvinsiService.curlProvinsi()
      const data = arrayConverter.getById(result.provinsi, {
        key: 'id',
        value: id
      })
      if (!data) {
        throw new HttpNotFound('data provinsi not found', { id })
      }
      data.kota = arrayConverter.getByReference(result.kota, {
        key: 'provinsi_id',
        value: data?.id
      })
      return data
    } catch (error) {
      throw error
    }
  }
}

module.exports = new ProvinsiService()
