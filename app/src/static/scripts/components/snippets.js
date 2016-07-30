window.App.Snippets = (function () {
  'use strict'

  const config = {
    dom: {
      snippetAttribute: 'data-snippet'
    }
  }

  function init (data = []) {
    if (!data || data.length < 1) return

    for (const snippet of data) {
      const snippetEl = document.querySelector(`[${config.dom.snippetAttribute}="${snippet.name}"]`)
      if (!snippetEl) {
        window.App.Log.error()
        console.log('snippet saved in database not present in the dom')
        return
      }

      console.log(snippetEl)
    }
  }

  return {
    init: init
  }
}())
