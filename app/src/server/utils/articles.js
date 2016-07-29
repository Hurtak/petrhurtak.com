'use strict'

const url = require('url')
const isAbsoluteUrl = require('is-absolute-url')
const escapeHtml = require('escape-html')
const highlight = require('highlight.js')
const cheerio = require('cheerio')
const lodash = require('lodash')

function cheerioLoadWithoutEscaping (htmlString) {
  return cheerio.load(htmlString, { decodeEntities: false })
}

function isElementInsideCodeBlock (cheerioElementObject) {
  return cheerioElementObject.parent('code').length > 0
}

function addIdsToHeadings (htmlString) {
  let $ = cheerioLoadWithoutEscaping(htmlString)
  let sameHeadingsCount = 0

  $('h2, h3').each((index, element) => {
    const el = $(element)

    if (isElementInsideCodeBlock(el)) return

    let id = el.text()
    if (!id.trim()) return

    id = lodash.replace(id, /[^A-Za-z0-9-_.&\s]/g, '') // remove special characters
    id = lodash.kebabCase(id)

    let postfix = ''
    while (true) {
      const idUnique = $('#' + id + postfix).length === 0
      if (idUnique) break

      sameHeadingsCount++
      postfix = '-' + (sameHeadingsCount + 1)
    }

    el.attr('id', id + postfix)
  })

  return $.html()
}

function changeXmpToCode (htmlString) {
  let $ = cheerioLoadWithoutEscaping(htmlString)

  $('xmp').each((index, element) => {
    const xmpEl = $(element)
    const codeEl = $('<code></code>')

    codeEl.html(xmpEl.html())
    for (const key in element.attribs) {
      codeEl.attr(key, element.attribs[key])
    }

    xmpEl.replaceWith(codeEl)
  })

  return $.html()
}

function trimCodeBlocks (htmlString) {
  let $ = cheerioLoadWithoutEscaping(htmlString)

  $('code').each((index, element) => {
    let html = $(element).html()

    html = html.replace(/^(\n|\r\n)+/, '')
    html = html.replace(/(\n|\r\n)+$/, '')

    $(element).html(html)
  })

  return $.html()
}

function removeIndentationInCodeBlocks (htmlString) {
  let $ = cheerioLoadWithoutEscaping(htmlString)

  $('code').each((index, element) => {
    let html = $(element).html()

    html = html.split('\n')
    if (html.length < 2) return

    const indentationMatch = html[0].match(/^ +/)
    if (!indentationMatch) return

    const indentationLength = indentationMatch[0].length
    if (indentationLength === 0) return

    // remove indentation
    html = html.map(line => line.substr(indentationLength))
    html = html.join('\n')

    $(element).html(html)
  })

  return $.html()
}

function escapeAndHighlightCodeBlocks (htmlString) {
  let $ = cheerioLoadWithoutEscaping(htmlString)

  $('code').each((index, element) => {
    const el = $(element)
    const html = el.html()

    const language = el.attr('data-lang')
    if (language) {
      // syntax highlight (highlight.js does the escaping)
      const highlightObj = highlight.highlight(language, html)

      el.html(highlightObj.value)
    } else {
      // just escape the content
      const escapedHtml = escapeHtml(html)
      el.html(escapedHtml)
    }
  })

  return $.html()
}

function relativeUrlToAbsolute (htmlString, selector, attribute, absolutePath) {
  if (!absolutePath) {
    throw new Error('missing absolutePath paramenter')
  }

  let $ = cheerioLoadWithoutEscaping(htmlString)

  // replace relative paths with absolute paths
  $(selector).each((_, element) => {
    const el = $(element)
    const src = el.attr(attribute)

    if (isElementInsideCodeBlock(el)) return
    if (isAbsoluteUrl(src)) return

    if (!absolutePath.endsWith('/')) {
      absolutePath = absolutePath + '/'
    }
    if (!absolutePath.startsWith('/')) {
      absolutePath = '/' + absolutePath
    }

    el.attr(attribute, url.resolve(absolutePath, src))
  })

  return $.html()
}

function enhanceSnippetLinks (htmlString) {
  let $ = cheerioLoadWithoutEscaping(htmlString)

  $('a[href^="./snippets/"]').each((_, element) => {
    const el = $(element)

    const href = el.attr('href')
    const fileName = href.split('/').reverse()[0]
    const snippetName = fileName.split('.')[0]

    el.attr('data-snippet', snippetName)
  })

  return $.html()
}

function isoStringToUtcDate (isoString) {
  const [date, time] = isoString.split(' ')

  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute] = time.split(':').map(Number)

  const utcTimestamp = Date.UTC(year, month - 1, day, hour, minute)
  return new Date(utcTimestamp)
}

function parseSnippet (snippetHtml) {
  const $ = cheerioLoadWithoutEscaping(snippetHtml)

  const css = $('head style').html()
  const js = $('body script:last-of-type').html()
  const head = $('head').html().replace(`<style>${css}</style>`, '') || null
  const body = $('body').html().replace(`<script>${js}</script>`, '') || null

  return {
    html: snippetHtml,
    head: head,
    body: body,
    css,
    js
  }
}

module.exports = {
  addIdsToHeadings,
  changeXmpToCode,
  trimCodeBlocks,
  removeIndentationInCodeBlocks,
  escapeAndHighlightCodeBlocks,
  relativeUrlToAbsolute,
  enhanceSnippetLinks,
  isoStringToUtcDate,
  parseSnippet
}
