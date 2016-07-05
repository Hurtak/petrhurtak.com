'use strict'

const path = require('path')
const url = require('url')

const isAbsoluteUrl = require('is-absolute-url')
const cheerio = require('cheerio')

function stripPathSeparators (string) {
  if (string[0] === path.sep) {
    string = string.substr(1)
  }
  if (string[string.length - 1] === path.sep) {
    string = string.slice(0, -1)
  }

  return string
}

function replaceRelativeImageUrls (htmlString, absolutePath) {
  let $ = cheerio.load(htmlString)

  // replace relative img paths with absolute paths to images
  $('img').attr('src', (_, src) => {
    if (isAbsoluteUrl(src)) {
      return src
    } else {
      return url.resolve(absolutePath, src)
    }
  })

  return $.html()
}

module.exports = {
  stripPathSeparators,
  replaceRelativeImageUrls
}
