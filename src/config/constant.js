require('dotenv').config()

const APPLICATION = {
  port: Number(process.env.PORT),
  token: {
    secret: process.env.JWT_SECRET,
    expiration: 3600, // 1 hour
    refreshExpiration: 86400
  }
}

const DUMMY_DATA = {
  url: process.env.DUMMY_URL
}

const DATABASE = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: 'postgres'
}

module.exports = {
  APPLICATION,
  DATABASE,
  DUMMY_DATA
}
