const constant = require('./constant')

module.exports = {
  development: {
    ...constant.DATABASE,
    logging: console.log,
    timezone: '+07:00'
  },
  production: {
    ...constant.DATABASE,
    timezone: '+07:00',
    logging: false,
    ssl: true,
    dialectOptions: {
      useUTC: false,
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}
