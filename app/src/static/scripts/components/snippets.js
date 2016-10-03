window.App.Snippets = (function () {
  'use strict'

  const config = {
    dom: {
      snippetAttribute: 'data-snippet',
      isSelectedClass: 'isSelected'
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

    function showContent (clickedTab, contentToShow) {
      for (const key in content) {
        content[key].style.zIndex = 0
      }
      contentToShow.style.zIndex = 1337

      for (const key in tabs) {
        tabs[key].classList.remove(config.dom.isSelectedClass)
      }
      clickedTab.classList.add(config.dom.isSelectedClass)
    }


    tabs.result.addEventListener('click', () => showContent(tabs.result, content.result))
    tabs.html.addEventListener('click', () => showContent(tabs.html, content.html))
    tabs.css.addEventListener('click', () => showContent(tabs.css, content.css))
    tabs.js.addEventListener('click', () => showContent(tabs.js, content.js))

    showContent(tabs.result, content.result)

    const state = {
      html: snippet.body,
      css: snippet.css,
      js: snippet.js
    }

    let timeout = null

    function buildDelayed () {

      const html = `
        <!DOCTYPE html>
        <head>
          ${snippet.head}
          <style>${state.css}</style>
        </head>
        <body>
          ${state.html}
          <script>${state.js}</script>
        </body>
      `
      const iframe = document.createElement('iframe')
      content.result.innerHTML = ''

      content.result.appendChild(iframe)

      const iframeDoc = iframe.contentDocument
      iframeDoc.open()
      iframeDoc.write(html)
      iframeDoc.close()
    }

    function build () {
      window.clearTimeout(timeout)
      timeout = window.setTimeout(() => {
        buildDelayed()
      }, 250)
    }

    content.html.value = state.html
    content.css.value = state.css
    content.js.value = state.js

    build()

    content.html.addEventListener('input', (e) => {
      state.html = e.target.value
      build()
    })
    content.css.addEventListener('input', (e) => {
      state.css = e.target.value
      build()
    })
    content.js.addEventListener('input', (e) => {
      state.js = e.target.value
      build()
    })

  }

  return {
    init: init
  }
}())
