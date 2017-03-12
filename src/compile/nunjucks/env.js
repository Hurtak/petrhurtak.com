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
nunjucksEnv.addGlobal('globals', {
  yearCurrent: new Date().getUTCFullYear(),
  yearFounded: config.yearFounded,
  siteUrl: config.siteUrl,
  siteUrlShort: config.siteUrlShort,
  cssDebug: config.cssDebug,
  templateDebug: config.templateDebug
})

// @INCONSISTENT: these are also globals
// modified in production mode
nunjucksEnv.addGlobal('production', false)
nunjucksEnv.addGlobal('hashCss', '')
nunjucksEnv.addGlobal('hashJs', '')
nunjucksEnv.addGlobal('faviconsHtml', '')

// debug
nunjucksEnv.addGlobal('getDebugData', function () { return this })

module.exports = nunjucksEnv
