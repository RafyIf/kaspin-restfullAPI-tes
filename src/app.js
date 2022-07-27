const express = require('express')
const compression = require('compression')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const path = require('path')

const { errors, jwt } = require('./helper')

const service = require('./service')
const hostUrl = process.env.HOST_URL || 'http://localhost:8080'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(compression())

app.use('/docs', express.static(path.join(__dirname, '..', 'docs')))
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(null, {
    explorer: true,
    swaggerOptions: {
      urls: [
        {
          url: hostUrl + '/docs/swagger.yaml',
          name: 'Kaspin Docs'
        }
      ]
    }
  })
)
app.use('/api/auth', service.auth)

app.use(jwt.authGuard)

app.use('/api/provinsi', service.provinsi)
app.use('/api/kota', service.kota)

app.use(errors.middleware)

module.exports = app
