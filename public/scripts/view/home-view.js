'use strict'

var app = app || {};

{

  class HomeView {
    initHomeView(ctx,next){
      $('.page').hide()
      $('#invalid-user-error').hide()
      $('#home-view').show()

      $('#search-steamer').off().on('submit', (e) => {
        $('.error').hide()
        e.preventDefault()
        let vanityurl = $('#home-view input').val()
        $('#home-view input').val('')

        if(!vanityurl) return console.log('no value in form.') // Checking for value before calling next.
        new app.Steamer(`${vanityurl}`).getSteamId(ctx, next)
        app.shameView.alreadyRendered = false
        app.gamesView.alreadyRendered = false
      })
    }

    errorInvalidSteamer(){
      $('#invalid-user-error').show()
    }
  }

  app.homeView = new HomeView()
}