const { sign, verify, TokenExpiredError } = require('jsonwebtoken')
const { APPLICATION } = require('../config/constant')
const statusCode = require('./statusCode')

const createToken = (payload) => {
  return sign(payload, APPLICATION.token.secret, {
    expiresIn: APPLICATION.token.expiration
  })
}

const authGuard = (req, res, next) => {
  if (!('x-access-token' in req.headers)) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .json({ status: 'error', message: 'required headers x-access-token' })
  }
  if (!req.headers['x-access-token']?.includes('Bearer ')) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .json({ status: 'error', message: 'required Bearer in x-access-token' })
  }
  try {
    const payload = verify(
      req.headers?.['x-access-token'].replace('Bearer ', ''),
      APPLICATION.token.secret
    )
    req.user = payload
    next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .json({ status: 'expiredToken', message: 'access token was expired!' })
    }
    return res
      .status(statusCode.UNAUTHORIZED)
      .json({ status: 'unauthorized', message: 'Unauthorization guard!' })
  }
}

module.exports = {
  authGuard,
  createToken
}
