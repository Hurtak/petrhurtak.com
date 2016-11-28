(function main () {
  'use strict'

  const data = window.appData

  window.App.Log.init()
  window.App.Snippets.init(data.snippets)
}())
