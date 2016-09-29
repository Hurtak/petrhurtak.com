window.App.Snippets = (function () {
  'use strict'

  const config = {
    dom: {
      snippetAttribute: 'data-snippet'
    }
  }

  function init (data = []) {
    if (!data || data.length < 1) return

    data.forEach(buildSnippet)
  }

  function buildSnippet (snippet) {
    const snippetEl = document.querySelector(`[${config.dom.snippetAttribute}="${snippet.name}"]`)
    if (!snippetEl) {
      window.App.Log.error('Snippets', `Snippet with name "${snippet.name}" can't be found in the DOM.`)
      return
    }

    const content = {
      result: snippetEl.querySelector('.js-snippet-content-result'),
      html: snippetEl.querySelector('.js-snippet-content-html'),
      css: snippetEl.querySelector('.js-snippet-content-css'),
      js: snippetEl.querySelector('.js-snippet-content-js')
    }

    const tabs = {
      result: snippetEl.querySelector('.js-snippet-tab-result'),
      html: snippetEl.querySelector('.js-snippet-tab-html'),
      css: snippetEl.querySelector('.js-snippet-tab-css'),
      js: snippetEl.querySelector('.js-snippet-tab-js')
    }

    function showContent (contentToShow) {
      content.result.style.zIndex = 0
      content.html.style.zIndex = 0
      content.css.style.zIndex = 0
      content.js.style.zIndex = 0

      contentToShow.style.zIndex = 1337
    }

    showContent(content.result)

    tabs.result.addEventListener('click', () => showContent(content.result))
    tabs.html.addEventListener('click', () => showContent(content.html))
    tabs.css.addEventListener('click', () => showContent(content.css))
    tabs.js.addEventListener('click', () => showContent(content.js))

    const html = `
      <!DOCTYPE html>
      <head>
        ${snippet.head}
        <style>${snippet.css}</style>
      </head>
      <body>
        ${snippet.body}
        <script>${snippet.js}</script>
      </body>
    `

    const iframeDoc = content.result.contentDocument
    iframeDoc.open()
    iframeDoc.write(html)
    iframeDoc.close()

    content.html.innerHTML = snippet.body
    content.css.innerHTML = snippet.css
    content.js.innerHTML = snippet.js
  }

  return {
    init: init
  }
}())
