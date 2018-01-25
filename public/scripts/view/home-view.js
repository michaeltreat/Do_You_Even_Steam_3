'use strict'

var app = app || {};

(function(module){

  const homeView = {}

  homeView.initHomeView = (ctx, next) => {
    console.log('Inside initHomeView')
    $('.page').hide()
    $('#invalid-user-error').hide()
    $('#home-view').show()

    $('#search-steamer').off().on('submit', (e) => {
      e.preventDefault()
      ctx.vanityurl = $('#home-view input').val()
      $('#home-view input').val('')

      if(!ctx.vanityurl) return console.log('no value in form.') // Checking for value before calling next.
      new app.Steamer(`${ctx.vanityurl}`).getSteamId(ctx, next)
    })
  }

  homeView.errorInvalidSteamer = (ctx, next) => {
    $('#invalid-user-error').show()
  }
  
  module.homeView = homeView
})(app)