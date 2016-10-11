window.App.Snippets = (function () {
  'use strict'

  const config = {
    snippetAttribute: 'data-snippet',
    isSelectedClass: 'isSelected',
    isVisibleClass: 'isVisible',
    iframeClass: 'Snippet-iframe',
    debounceIframeCreation: 300
  }

  function init (data = []) {
    if (!data || data.length < 1) return

    for (const snippetData of data) {
      const snippetElms = document.querySelectorAll(`[${config.snippetAttribute}="${snippetData.name}"]`)
      if (!snippetElms.length) {
        window.App.Log.error(
          'Snippets',
          `Snippet with name "${snippetData.name}" can't be found in the DOM.`
        )
        continue
      }

      for (const snippetEl of snippetElms) {
        if (snippetData.config.inlineSnippet) {
          buildInlineSnippet(snippetData, snippetEl)
        } else {
          buildSnippet(snippetData, snippetEl)
        }
      }
    }
  }

  function buildInlineSnippet (snippetData, snippetEl) {
    createSnippetIframe(
      snippetEl,
      snippetData.head,
      snippetData.html,
      snippetData.css,
      snippetData.js
    )
  }

  function buildSnippet (snippetData, snippetEl) {
    const dom = {
      controls: {
        result: snippetEl.querySelector('.js-snippet-tab-result'),
        html: snippetEl.querySelector('.js-snippet-tab-html'),
        css: snippetEl.querySelector('.js-snippet-tab-css'),
        js: snippetEl.querySelector('.js-snippet-tab-js'),
        reset: snippetEl.querySelector('.js-snippet-reset')
      },
      content: {
        result: snippetEl.querySelector('.js-snippet-content-result'),
        html: snippetEl.querySelector('.js-snippet-content-html'),
        css: snippetEl.querySelector('.js-snippet-content-css'),
        js: snippetEl.querySelector('.js-snippet-content-js')
      }
    }

    const state = {
      originalHtml: snippetData.html,
      originalCss: snippetData.css,
      originalJs: snippetData.js,
      html: snippetData.html,
      css: snippetData.css,
      js: snippetData.js,
      timeout: null
    }

    // switch to result tab
    showContent(dom.content, dom.controls, dom.controls.result, dom.content.result, config.isSelectedClass, config.isVisibleClass)

    // fill textareas
    dom.content.html.value = state.html
    dom.content.css.value = state.css
    dom.content.js.value = state.js

    // build snippet result
    createSnippetIframe(dom.content.result, snippetData.head, state.html, state.css, state.js)

    // listeners for tab switching
    dom.controls.result.addEventListener('click', () => showContent(dom.content, dom.controls, dom.controls.result, dom.content.result, config.isSelectedClass, config.isVisibleClass))
    dom.controls.html.addEventListener('click', () => showContent(dom.content, dom.controls, dom.controls.html, dom.content.html, config.isSelectedClass, config.isVisibleClass))
    dom.controls.css.addEventListener('click', () => showContent(dom.content, dom.controls, dom.controls.css, dom.content.css, config.isSelectedClass, config.isVisibleClass))
    dom.controls.js.addEventListener('click', () => showContent(dom.content, dom.controls, dom.controls.js, dom.content.js, config.isSelectedClass, config.isVisibleClass))

    // listen for reset button click
    dom.controls.reset.addEventListener('click', () => {
      createSnippetIframe(dom.content.result, snippetData.head, state.originalHtml, state.originalCss, state.originalJs)
    })

    // listen on textarea change and update snippet result
    function debounceSnippetIframeUpdate (textareaToUpdate, value) {
      window.clearTimeout(state.timeout)
      state.timeout = window.setTimeout(() => {
        state[textareaToUpdate] = value
        createSnippetIframe(dom.content.result, snippetData.head, state.html, state.css, state.js)
      }, config.debounceIframeCreation)
    }

    dom.content.html.addEventListener('input', (e) => debounceSnippetIframeUpdate('html', e.target.value))
    dom.content.css.addEventListener('input', (e) => debounceSnippetIframeUpdate('css', e.target.value))
    dom.content.js.addEventListener('input', (e) => debounceSnippetIframeUpdate('js', e.target.value))
  }

  function showContent (content, controls, clickedTab, contentToShow, classSelected, classVisible) {
    for (const key in content) {
      content[key].classList.remove(classVisible)
    }
    contentToShow.classList.add(classVisible)

    for (const key in controls) {
      controls[key].classList.remove(classSelected)
    }
    clickedTab.classList.add(classSelected)
  }

  function createSnippetIframe (targetEl, head, html, css, js) {
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
    iframe.classList.add(config.iframeClass)

    targetEl.innerHTML = ''
    targetEl.appendChild(iframe)

    const iframeDocument = iframe.contentDocument
    iframeDocument.open()
    iframeDocument.write(snippetHtml)
    iframeDocument.close()
  }

  return {
    init: init
  }
}())
