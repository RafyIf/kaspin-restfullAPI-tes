const axios = require('axios').default
const { DUMMY_DATA } = require('../config/constant')

const curl = axios.create({
  baseURL: DUMMY_DATA.url
})

module.exports = curl
