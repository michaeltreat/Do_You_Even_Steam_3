'use strict'

var app = app || {};

(function(module){

  const homeView = {}

  homeView.initHomeView = (ctx, next) => {
    console.log(ctx)
    $('.page').hide()
    $('#home-view').show()

    $('#search-steamer').on('submit', (e) => {
      console.log(ctx)
      e.preventDefault()
      ctx.vanityurl = $('#home-view input').val()
      $('#home-view input').val('')
      console.log(ctx)
      next()
    })
  }
  
  module.homeView = homeView
})(app)