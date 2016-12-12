(function main () {
  'use strict'

  const data = window.appData

  window.App.DateConvertor.init()
  window.App.Snippets.init(data.snippets)
  window.App.Log.init()
}())
