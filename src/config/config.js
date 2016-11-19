'use strict'

module.exports = {
  port: process.env.APP_PORT || 8000,

  devel: process.env.NODE_ENV !== 'production',
  production: process.env.NODE_ENV === 'production'
}
