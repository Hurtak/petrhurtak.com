'use strict'

const nunjucks = require('nunjucks')
const config = require('../config.js')
const paths = require('../paths.js')
const filters = require('./filters.js')

// configure https://mozilla.github.io/nunjucks/api.html#configure
const nunjucksEnv = nunjucks.configure(paths.templates, config.nunjucks)

// add custom filters
for (const filterName in filters) {
  nunjucksEnv.addFilter(filterName, filters[filterName])
}

// add custom globals
nunjucksEnv.addGlobal('currentYear', new Date().getUTCFullYear())
nunjucksEnv.addGlobal('siteUrl', config.siteUrl.href)
nunjucksEnv.addGlobal('siteDomain', config.siteUrl.host)
nunjucksEnv.addGlobal('devel', config.devel)
nunjucksEnv.addGlobal('production', config.production)
nunjucksEnv.addGlobal('getDebugData', function () { return this })

module.exports = nunjucksEnv
