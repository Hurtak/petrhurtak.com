'use strict'

const url = require('url')

const isAbsoluteUrl = require('is-absolute-url')
const cheerio = require('cheerio')
const lodash = require('lodash')
const yaml = require('js-yaml')

const nunjucksEnv = require('../nunjucks/env.js')

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

    const rawSnippetUrl = el.attr('href') // ./snippets/example.html
    const pathSplit = rawSnippetUrl.split('/')
    const fileName = pathSplit[pathSplit.length - 1] // example.html"
    const snippetName = fileName.split('.')[0] // example

    const snippetHtml = nunjucksEnv.render('components/snippet.njk', {
      snippetName,
      rawSnippetUrl
    })
    const snippetEl = $(snippetHtml)

    el.replaceWith(snippetEl)
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

function removeIndentation (str) {
  // 1. split text into lines
  let lines = str.split('\n')

  // 2. remove empty lines from the stard and the end of the text
  const firstNonEmptyLine = lines => {
    let currentIndex = 0
    for (let i = 0; i < lines.length; i++) {
      const isWhitespaceOnly = /^\s*$/.test(lines[i])
      if (!isWhitespaceOnly) return currentIndex

      currentIndex++
    }
    return currentIndex
  }

  const startIndex = firstNonEmptyLine(lines)
  const endIndex = firstNonEmptyLine(lodash.reverse([...lines]))

  lines = lodash.slice(lines, startIndex, lines.length - endIndex)

  // 3. determine indentation
  let shortestIndent = 0
  for (const line of lines) {
    const indentMatch = line.match(/^\s+/)
    const indent = indentMatch ? indentMatch[0] : ''

    if (shortestIndent === 0) {
      shortestIndent = indent.length
    } else if (indent.length < shortestIndent) {
      shortestIndent = indent.length
    }
  }

  // 4. remove indentation
  const indentationToRemove = lodash.repeat(' ', shortestIndent)
  lines = lodash.map(lines, line => lodash.replace(line, indentationToRemove, ''))

  return lodash.join(lines, '\n')
}

function parseSnippet (wholeHtml) {
  const $ = cheerioLoadWithoutEscaping(wholeHtml)

  // TODO: use html parser?
  const configMatch = wholeHtml.match(/^<!--((?:.|\n)+?)-->$/m)
  const maybeConfig = configMatch ? (configMatch[1] || null) : null
  let parsedConfig = null
  try {
    parsedConfig = yaml.safeLoad(maybeConfig)
  } catch (e) {}

  const defaultConfig = {
    inlineSnippet: false
  }
  const config = Object.assign({}, defaultConfig, parsedConfig)

  const css = $('head > style').html() || ''
  const js = $('body > script:last-of-type').html() || ''
  const head = $('head').html().replace(`<style>${css}</style>`, '') || ''
  const html = $('body').html().replace(`<script>${js}</script>`, '') || ''

  return {
    wholeHtml,
    head: removeIndentation(head),
    html: removeIndentation(html),
    css: removeIndentation(css),
    js: removeIndentation(js),
    config
  }
}

module.exports = {
  addIdsToHeadings,
  relativeUrlToAbsolute,
  enhanceSnippetLinks,
  isoStringToUtcDate,
  removeIndentation,
  parseSnippet
}
