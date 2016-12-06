'use strict'

const nunjucks = require('nunjucks')
const config = require('../config.js')
const paths = require('../paths.js')
const filters = require('./filters.js')

module.exports = function (productionBuild) {
  // configure https://mozilla.github.io/nunjucks/api.html#configure
  const nunjucksEnv = nunjucks.configure(
    paths.templates,
    config.nunjucks(productionBuild)
  )

  // add custom filters
  for (const filterName in filters) {
    nunjucksEnv.addFilter(filterName, filters[filterName])
  }

  // add custom globals
  nunjucksEnv.addGlobal('globals', {
    yearCurrent: new Date().getUTCFullYear(),
    yearFounded: config.yearFounded,
    siteUrl: config.siteUrl.href,
    siteDomain: config.siteUrl.host,
    production: productionBuild
  })
  nunjucksEnv.addGlobal('getDebugData', function () { return this })

  return nunjucksEnv
}
