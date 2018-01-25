'use strict'

var app = app || {};

(function(module){

  const shameView = {}

  shameView.initShameView = ctx =>{
    $('.page').hide()
    $('#shame-nouser-error').hide()
    $('#shame-view').show()
    if(!ctx.steamer) return app.shameView.errorNoSteamer()
    app.Steamer.steamer.renderShame()
  }

  shameView.errorNoSteamer = () => {
    if(!localStorage.steamer) return $('#shame-nouser-error').show()
    $('#shame-localuser-error').show()
    let s = JSON.parse(localStorage.steamer)
    new app.Steamer(s.vanityUrl, s.steamId, s.hours, s.games)
    app.Steamer.steamer.renderShame()
  }
  

  module.shameView = shameView
})(app)