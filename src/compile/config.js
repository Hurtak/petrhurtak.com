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
      trimBlocks: true, // (default: false) automatically remove trailing newlines from a block/tag
      lstripBlocks: true, // (default: false) automatically remove leading whitespace from a block/tag
      useCache: !productionBuild, // (default: false) will enable cache and templates will never see updates.
      noCache: productionBuild, // (default: false) never use a cache and recompile templates each time (server-side)
      watch: false // (default: false) reload templates when they are changed (server-side)
    }
  }
}
