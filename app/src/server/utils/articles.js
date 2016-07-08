'use strict'

const url = require('url')
const isAbsoluteUrl = require('is-absolute-url')
const escapeHtml = require('escape-html')
const cheerio = require('cheerio')

function escapeCodeBlocks (htmlString) {
  let $ = cheerio.load(htmlString)

  // escape content of <code> blocks
  $('code').each(() => {
    const html = $(this).html()
    console.log(html)
    const escapedHtml = escapeHtml(html)
    console.log(escapedHtml)
    $(this).html(escapedHtml)
    // $(this).replaceWith($(this).html())
  })

  return $.html()
}

function replaceRelativeImageUrls (htmlString, absolutePath) {
  if (!absolutePath) {
    throw new Error('missing absolutePath paramenter')
  }

  let $ = cheerio.load(htmlString)

  // replace relative img paths with absolute paths to images
  $('img').attr('src', (_, src) => {
    if (isAbsoluteUrl(src)) {
      return src
    } else {
      if (!absolutePath.endsWith('/')) {
        absolutePath = absolutePath + '/'
      }
      if (!absolutePath.startsWith('/')) {
        absolutePath = '/' + absolutePath
      }
      return url.resolve(absolutePath, src)
    }
  })

  return $.html()
}


module.exports = {
  escapeCodeBlocks,
  replaceRelativeImageUrls
}
