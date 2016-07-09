'use strict'

const url = require('url')
const isAbsoluteUrl = require('is-absolute-url')
const escapeHtml = require('escape-html')
const cheerio = require('cheerio')
const lodash = require('lodash')

function addIdsToHeadings (htmlString) {
  let $ = cheerio.load(htmlString)

  $('h2, h3').each((index, element) => {
    const el = $(element)

    let id = el.text()
    id = lodash.replace(id, /[^A-Za-z0-9-_.&\s]/g, '') // remove special characters
    id = lodash.kebabCase(id)

    el.attr('id', id)
  })

  return $.html()
}

function trimCodeBlocks (htmlString) {
  let $ = cheerio.load(htmlString)

  $('code').each((index, element) => {
    let html = $(element).html()
    html = html.replace(/^\s+/, '')
    html = html.replace(/\s+$/, '')

    $(element).html(html)
  })

  return $.html()
}

function escapeCodeBlocks (htmlString) {
  let $ = cheerio.load(htmlString)

  $('code').each((index, element) => {
    const html = $(element).html()
    const escapedHtml = escapeHtml(html)

    $(element).html(escapedHtml)
  })

  return $.html()
}

function replaceRelativeImageUrls (htmlString, absolutePath) {
  if (!absolutePath) {
    throw new Error('missing absolutePath paramenter')
  }

  let $ = cheerio.load(htmlString)

  // replace relative img paths with absolute paths to images
  $('img').each((_, element) => {
    const el = $(element)
    const src = el.attr('src')

    if (isAbsoluteUrl(src)) return

    if (!absolutePath.endsWith('/')) {
      absolutePath = absolutePath + '/'
    }
    if (!absolutePath.startsWith('/')) {
      absolutePath = '/' + absolutePath
    }

    el.attr('src', url.resolve(absolutePath, src))
  })

  return $.html()
}


module.exports = {
  addIdsToHeadings,
  trimCodeBlocks,
  escapeCodeBlocks,
  replaceRelativeImageUrls
}
