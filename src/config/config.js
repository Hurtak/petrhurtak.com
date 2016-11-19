'use strict'

module.exports = {
  database: {
    host: process.env.APP_DB_HOST,
    database: process.env.APP_DB_NAME,
    user: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASS,
    multipleStatements: true
  },

  port: process.env.APP_PORT,

  devel: process.env.NODE_ENV !== 'production',
  production: process.env.NODE_ENV === 'production'
}
