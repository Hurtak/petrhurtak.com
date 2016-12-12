'use strict'

const url = require('url')

module.exports = {
  port: process.env.APP_PORT || 8000,

  siteUrl: url.parse(process.env.APP_URL || 'https://hurtak.cc'),
  yearFounded: 2015,

  articles: {
    perPage: 10,
    perRssFeed: 20
  },

  supportedBrowsers: [
    'last 2 versions',
    'Firefox ESR',
    '> 2%'
  ],

  debugSkipPackages: [
    'nunjucks',
    'gulp'
  ],

  nunjucks: (productionBuild) => {
    return {
      autoescape: true, // (default: true) controls if output with dangerous characters are escaped automatically.
      throwOnUndefined: true, // (default: false) throw errors when outputting a null/undefined value
      noCache: true // (default: false) never use a cache and recompile templates each time (server-side)
    }
  }
}
