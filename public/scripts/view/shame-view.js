'use strict'

var app = app || {};

(function(module){

  const shameView = {}
  shameView.alreadyRendered = false;

  shameView.initShameView = (cb) => {
    $('.page').hide()
    $('#shame-view').show()

    if(!app.Steamer.steamer) return app.shameView.errorNoSteamer()
    shameView.renderShame()
  }

  shameView.errorNoSteamer = (cb) => {
    if(!localStorage.steamer) return $('#shame-nouser-error').show()
    
    let s = JSON.parse(localStorage.steamer)
    new app.Steamer(s.vanityUrl, s.steamId, s.hours, s.games)

    // Add the cached flag to trigger warning for the user that this is just the cached version.
    app.Steamer.steamer.cached = true
    shameView.renderShame()
  }
  
  shameView.renderShame = (cb) => {
    if(app.Steamer.steamer.cached) $('#shame-localuser-error').show()
    if(shameView.alreadyRendered) return

    shameView.alreadyRendered = true
    let template = Handlebars.compile($('#shame-template').text())
    $('#shame-view').append(template(app.Steamer.steamer))
  }

  module.shameView = shameView
})(app)