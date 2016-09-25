'use strict'

module.exports = {
  database: {
    host: process.env.NODE_DB_HOST || 'localhost',
    database: process.env.NODE_DB_NAME || 'hurtak_blog',
    user: process.env.NODE_DB_USER || 'root',
    password: process.env.NODE_DB_PASS || '',
    multipleStatements: true
  },

  port: process.env.NODE_PORT || 8000,

  devel: process.env.NODE_ENV !== 'production',
  production: process.env.NODE_ENV === 'production'
}
