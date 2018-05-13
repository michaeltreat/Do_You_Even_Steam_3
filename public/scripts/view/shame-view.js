'use strict'
/* global Handlebars */

var app = app || {};

{
  class ShameView {

    initShameView(){
      $('.page').hide()
      $('#shame-view').show()

      if(!app.Steamer.steamer) return app.ShameView.errorNoSteamer()
      ShameView.renderShame()
    }

    errorNoSteamer() {
      if(!localStorage.steamer) return $('#shame-nouser-error').show()

      let s = JSON.parse(localStorage.steamer)
      new app.Steamer(s.vanityUrl, s.steamId, s.hours, s.games)

      // Add the cached flag to trigger warning for the user that this is just the cached version.
      app.Steamer.steamer.cached = true
      ShameView.renderShame()
    }

    renderShame() {
      if(app.Steamer.steamer.cached) $('#shame-localuser-error').show()
      if(ShameView.alreadyRendered) return

      ShameView.alreadyRendered = true
      let template = Handlebars.compile($('#shame-template').text())
      $('#shame-view').append(template(app.Steamer.steamer))
    }
  }

  ShameView.alreadyRendered = false;
  app.ShameView = new ShameView()
}
