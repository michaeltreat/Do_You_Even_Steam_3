'use strict'
/* global Handlebars */

var app = app || {};

{
  class ShameView {

    initShameView(){
      $('.page').hide()
      $('#shame-view').show()

      if(!app.steamer) return app.shameView.errorNoSteamer()
      app.shameView.renderShame()
    }

    errorNoSteamer() {
      if(!localStorage.steamer) return $('#shame-nouser-error').show()

      let {vanityUrl, steamId, hours, games, gamesCount} = JSON.parse(localStorage.steamer)
      new app.Steamer(vanityUrl, steamId, hours, games, gamesCount)

      // Add the cached flag to trigger warning for the user that this is just the cached version.
      app.steamer.cached = true
      app.steamer.calcHours()
      app.shameView.renderShame()
    }

    renderShame() {
      if(app.steamer.cached) $('#shame-localuser-error').show()
      if(app.shameView.alreadyRendered) return
      $('#shame-details').remove()
      app.shameView.alreadyRendered = true
      let template = Handlebars.compile($('#shame-template').text())
      $('#shame-attach').append(template(app.steamer))
    }
  }

  app.shameView = new ShameView()
  app.shameView.alreadyRendered = false;
}
