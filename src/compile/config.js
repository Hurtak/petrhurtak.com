'use strict'

const url = require('url')

module.exports = {
  //
  // Blog configuration
  //

  siteUrl: url.parse('https://hurtak.cc'),
  yearFounded: 2015,

  articles: {
    perPage: 10,
    perRssFeed: 20
  },

  //
  // Development configuration
  //

  // https://www.browsersync.io/docs/options
  browserSync: {
    port: 8000,
    https: true,
    reloadOnRestart: true,
    open: false
  },

  debugSkipPackages: [
    'nunjucks',
    'gulp'
  ],

  //
  // Compilation configuration
  //

  // used with Autoprefixer and Babel
  // https://github.com/ai/browserslist#queries
  supportedBrowsers: [
    'last 2 versions',
    'Firefox ESR',
    '> 2%'
  ],

  // https://mozilla.github.io/nunjucks/api.html#configure
  nunjucks: {
    autoescape: true, // (default: true) controls if output with dangerous characters are escaped automatically.
    throwOnUndefined: true, // (default: false) throw errors when outputting a null/undefined value
    noCache: true // (default: false) never use a cache and recompile templates each time (server-side)
  }

}
