const express = require('express').Router()
const service = require('./provinsi.service')

express.get('/', async (req, res, next) => {
  try {
    const data = await service.getProvinsi(req.query)
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
    const data = await service.getOneProvinsiId(req.params.id)
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
