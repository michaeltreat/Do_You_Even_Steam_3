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
      
      let {vanityUrl, steamId, hours, games} = JSON.parse(localStorage.steamer)
      new app.Steamer(vanityUrl, steamId, hours, games)

      // Add the cached flag to trigger warning for the user that this is just the cached version.
      app.steamer.cached = true
      app.shameView.renderShame()
    }

    renderShame() {
      if(app.steamer.cached) $('#shame-localuser-error').show()
      if(ShameView.alreadyRendered) return

      app.shameView.alreadyRendered = true
      let template = Handlebars.compile($('#shame-template').text())
      $('#shame-view').append(template(app.steamer))
    }
  }

  app.shameView = new ShameView()
  app.shameView.alreadyRendered = false;
}
