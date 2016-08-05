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

    console.log(snippetEl)
  }

  return {
    init: init
  }
}())
