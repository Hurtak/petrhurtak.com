'use strict'

const nunjucks = require('nunjucks')
const paths = require('./paths.js')
const config = require('../config/config.js')
const nunjucksFilters = require('./utils/nunjucks-filters.js')

// configure https://mozilla.github.io/nunjucks/api.html#configure
const nunjucksEnv = nunjucks.configure(paths.templates, {
  // autoescape (default: true) controls if output with dangerous characters are escaped automatically.
  autoescape: true,
  // throwOnUndefined (default: false) throw errors when outputting a null/undefined value
  throwOnUndefined: config.devel,
  // useCache (default: false) will enable cache and templates will never see updates.
  useCache: config.production,
  // noCache (default: false) never use a cache and recompile templates each time (server-side)
  noCache: config.devel,
  // watch (default: false) reload templates when they are changed (server-side)
  watch: config.devel
})

// add custom filters
for (const filterName in nunjucksFilters) {
  nunjucksEnv.addFilter(filterName, nunjucksFilters[filterName])
}

module.exports = nunjucksEnv
