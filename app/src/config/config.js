'use strict'

module.exports = {
  database: {
    host: process.env.APP_DB_HOST || 'localhost',
    database: process.env.APP_DB_NAME || 'hurtak_blog',
    user: process.env.APP_DB_USER || 'root',
    password: process.env.APP_DB_PASS || '',
    multipleStatements: true
  },

  port: process.env.APP_PORT || 8000,

  devel: process.env.NODE_ENV !== 'production',
  production: process.env.NODE_ENV === 'production'
}
