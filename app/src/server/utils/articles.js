'use strict'

const url = require('url')
const isAbsoluteUrl = require('is-absolute-url')
const escapeHtml = require('escape-html')
const cheerio = require('cheerio')

function trimCodeBlocks (htmlString) {
  let $ = cheerio.load(htmlString)

  $('code').each((index, element) => {
    let html = $(element).html()

    // TODO refactor
    while (html[0].match(/\s/)) {
      html = html.substr(1)
    }
    html = html.split('').reverse().join('')
    while (html[0].match(/\s/)) {
      html = html.substr(1)
    }
    html = html.split('').reverse().join('')

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
  trimCodeBlocks,
  escapeCodeBlocks,
  replaceRelativeImageUrls
}
