const express = require('express').Router()
const service = require('./kota.service')

express.get('/', async (req, res, next) => {
  try {
    const data = await service.getKota(req.query)
    res.json({
      status: 'data',
      statusCode: 200,
      data
    })
  } catch (error) {
    return next(error)
  }
})

express.get('/:id', async (req, res, next) => {
  try {
    const data = await service.getByKotaId(req.params.id)
    res.json({
      status: 'data',
      statusCode: 200,
      data
    })
  } catch (error) {
    return next(error)
  }
})

module.exports = express
