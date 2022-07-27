const { curl, pagination, keys } = require('../../utils')
const { arrayConverter, errors } = require('../../helper')

const { HttpInternalServerError, HttpNotFound } = errors.errorHandling

class KotaService {
  static async curlKota() {
    try {
      const { data } = await curl.get()
      const kota = data?.[keys.KOTA]
      const provinsi = data?.[keys.PROVINSI]
      const kecamatan = data?.[keys.KECAMATAN]
      return Promise.resolve({ provinsi, kota, kecamatan })
    } catch (error) {
      throw new HttpInternalServerError('failed to curl all address')
    }
  }

  /**
   *
   * @param {{limit:number, page:number, q:string}} params
   */
  async getKota(params) {
    try {
      const data = await KotaService.curlKota()
      let kota = data.kota
      if (params.q && params.q.length > 1) {
        kota = arrayConverter.searchArray(data.kota, {
          key: 'nama',
          value: params.q
        })
      }

      let meta = pagination(kota, params.limit || 10, params.page || 1)
      meta.data = arrayConverter.withBelongsTo(meta.data, {
        arr: data.provinsi,
        alias: 'provinsi',
        foreignKey: 'provinsi_id',
        refKey: 'id'
      })
      return meta
    } catch (error) {
      throw error
    }
  }

  async getByKotaId(id) {
    try {
      const result = await KotaService.curlKota()
      let data = arrayConverter.getById(result.kota, { key: 'id', value: id })
      if (!data) {
        throw new HttpNotFound('data kota not found', { id })
      }
      data.kecamatan = arrayConverter.getByReference(result.kecamatan, {
        key: 'kota_id',
        value: data?.id
      })
      return data
    } catch (error) {
      throw error
    }
  }
}

module.exports = new KotaService()
