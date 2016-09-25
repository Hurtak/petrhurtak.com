'use strict'

const nunjucks = require('nunjucks')
const config = require('../../config/config.js')
const paths = require('../paths.js')
const filters = require('./filters.js')

// configure https://mozilla.github.io/nunjucks/api.html#configure
const nunjucksEnv = nunjucks.configure(paths.templates, {
  autoescape: true, // (default: true) controls if output with dangerous characters are escaped automatically.
  throwOnUndefined: config.devel, // (default: false) throw errors when outputting a null/undefined value
  trimBlocks: true, // (default: false) automatically remove trailing newlines from a block/tag
  lstripBlocks: true, // (default: false) automatically remove leading whitespace from a block/tag
  useCache: config.production, // (default: false) will enable cache and templates will never see updates.
  noCache: config.devel, // (default: false) never use a cache and recompile templates each time (server-side)
  watch: config.devel // (default: false) reload templates when they are changed (server-side)
})

// add custom filters
for (const filterName in filters) {
  nunjucksEnv.addFilter(filterName, filters[filterName])
}

// add custom globals
nunjucksEnv.addGlobal('currentYear', new Date().getUTCFullYear())
nunjucksEnv.addGlobal('siteUrl', 'https://hurtak.cc')
nunjucksEnv.addGlobal('siteDomain', 'hurtak.cc')
nunjucksEnv.addGlobal('siteProtocol', 'https://')
nunjucksEnv.addGlobal('devel', config.devel)
nunjucksEnv.addGlobal('production', config.production)
nunjucksEnv.addGlobal('getDebugData', function () { return this })

module.exports = nunjucksEnv
