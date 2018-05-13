'use strict'
/* global Handlebars */

var app = app || {};

{

  class gamesView {

    initGamesView(){
      $('.page').hide()
      $('#games-view').show()

      if(!app.Steamer.steamer) return app.gamesView.errorNoSteamer()
      gamesView.renderGamesList()
    }

    errorNoSteamer(){
      if(!localStorage.steamer) return $('#game-nouser-error').show()

      let s = JSON.parse(localStorage.steamer)
      new app.Steamer(s.vanityUrl, s.steamId, s.hours, s.games)

      // Add the cached flag to trigger warnings so the user know this is only a cached version.
      app.Steamer.steamer.cached = true
      gamesView.renderGamesList()
    }

    renderGamesList(){
      if(app.Steamer.steamer.cached) $('#game-localuser-error').show()
      if(gamesView.alreadyRendered) return // prevents duplicating the page.

      gamesView.alreadyRendered = true;
      let template = Handlebars.compile($('#game-details-template').text());
      app.Steamer.steamer.games.map( game => {
        $('#games-list').append(template(game))
      })
    }
  }

  gamesView.alreadyRendered = false;
  app.gamesView = gamesView
}