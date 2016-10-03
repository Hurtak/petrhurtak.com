window.App.Snippets = (function () {
  'use strict'

  const config = {
    snippetAttribute: 'data-snippet',
    isSelectedClass: 'isSelected',
    isVisibleClass: 'isVisible',
    debounceIframeCreation: 300
  }

  function init (data = []) {
    if (!data || data.length < 1) return

    data.forEach(buildSnippet)
  }

  function buildSnippet (snippet) {
    const snippetEl = document.querySelector(`[${config.snippetAttribute}="${snippet.name}"]`)
    if (!snippetEl) {
      window.App.Log.error('Snippets', `Snippet with name "${snippet.name}" can't be found in the DOM.`)
      return
    }

    const dom = {
      tabs: {
        result: snippetEl.querySelector('.js-snippet-tab-result'),
        html: snippetEl.querySelector('.js-snippet-tab-html'),
        css: snippetEl.querySelector('.js-snippet-tab-css'),
        js: snippetEl.querySelector('.js-snippet-tab-js')
      },
      content: {
        result: snippetEl.querySelector('.js-snippet-content-result'),
        html: snippetEl.querySelector('.js-snippet-content-html'),
        css: snippetEl.querySelector('.js-snippet-content-css'),
        js: snippetEl.querySelector('.js-snippet-content-js')
      }
    }

    const state = {
      html: snippet.html,
      css: snippet.css,
      js: snippet.js,
      timeout: null
    }

    // switch to result tab
    showContent(dom.content, dom.tabs, dom.tabs.result, dom.content.result, config.isSelectedClass, config.isVisibleClass)

    // fill textareas
    dom.content.html.value = state.html
    dom.content.css.value = state.css
    dom.content.js.value = state.js

    // build snippet result
    createSnippetIframe(dom.content.result, snippet.head, state.html, state.css, state.js)

    // listeners for tab switching
    dom.tabs.result.addEventListener('click', () => showContent(dom.content, dom.tabs, dom.tabs.result, dom.content.result, config.isSelectedClass, config.isVisibleClass))
    dom.tabs.html.addEventListener('click', () => showContent(dom.content, dom.tabs, dom.tabs.html, dom.content.html, config.isSelectedClass, config.isVisibleClass))
    dom.tabs.css.addEventListener('click', () => showContent(dom.content, dom.tabs, dom.tabs.css, dom.content.css, config.isSelectedClass, config.isVisibleClass))
    dom.tabs.js.addEventListener('click', () => showContent(dom.content, dom.tabs, dom.tabs.js, dom.content.js, config.isSelectedClass, config.isVisibleClass))

    // listen on textarea change and update snippet result
    function debounceSnippetIframeUpdate (textareaToUpdate, value) {
      window.clearTimeout(state.timeout)
      state.timeout = window.setTimeout(() => {
        state[textareaToUpdate] = value
        createSnippetIframe(dom.content.result, snippet.head, state.html, state.css, state.js)
      }, config.debounceIframeCreation)
    }

    dom.content.html.addEventListener('input', (e) => debounceSnippetIframeUpdate('html', e.target.value))
    dom.content.css.addEventListener('input', (e) => debounceSnippetIframeUpdate('css', e.target.value))
    dom.content.js.addEventListener('input', (e) => debounceSnippetIframeUpdate('js', e.target.value))
  }

  function showContent (content, tabs, clickedTab, contentToShow, classSelected, classVisible) {
    for (const key in content) {
      content[key].classList.remove(classVisible)
    }
    contentToShow.classList.add(classVisible)

    for (const key in tabs) {
      tabs[key].classList.remove(classSelected)
    }
    clickedTab.classList.add(classSelected)
  }

  function createSnippetIframe (target, head, html, css, js) {
    const snippetHtml = `
      <!DOCTYPE html>
      <head>
        ${head}
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    `

    const iframe = document.createElement('iframe')

    target.innerHTML = ''
    target.appendChild(iframe)

    const iframeDocument = iframe.contentDocument
    iframeDocument.open()
    iframeDocument.write(snippetHtml)
    iframeDocument.close()
  }

  return {
    init: init
  }
}())
