window.App.Main = (function () {
  'use strict'

  function init (data) {
    window.App.Log.init()
    window.App.Snippets.init(data.snippets)
  }

  return {
    init: init
  }
}())
