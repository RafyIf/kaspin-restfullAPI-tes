const statusCode = require('../statusCode')
const { HttpError } = require('./errorHandling')

const errorMiddleware = (err, req, res, next) => {
  const error =
    err instanceof HttpError
      ? err
      : new HttpError({
          message: err.message,
          name: err.name,
          statusCode: statusCode.INTERNAL_SERVER_ERROR
        })

  return res.status(error.statusCode).json({
    status: 'error',
    message: error.message,
    data: error.data,
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
  })
}

module.exports = errorMiddleware
