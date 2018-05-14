'use strict'
/* global Handlebars */

var app = app || {};

{

  class GamesView {

    initGamesView(){
      $('.page').hide()
      $('#games-view').show()

      if(!app.steamer) return app.gamesView.errorNoSteamer()
      app.gamesView.renderGamesList()
    }

    errorNoSteamer(){
      if(!localStorage.steamer) return $('#game-nouser-error').show()

      let { vanityUrl, steamId, hours, games } = JSON.parse(localStorage.steamer)
      new app.Steamer(vanityUrl, steamId, hours, games)

      // Add the cached flag to trigger warnings so the user know this is only a cached version.
      app.steamer.cached = true
      app.gamesView.renderGamesList()
    }

    renderGamesList(){
      if(app.steamer.cached) $('#game-localuser-error').show()
      if(app.gamesView.alreadyRendered) return // prevents duplicating the page.

      app.gamesView.alreadyRendered = true;
      $('.game-details').remove()
      
      let template = Handlebars.compile($('#game-details-template').text());
      app.steamer.games.sort(( a, b ) => {
        return b.playtime_forever - a.playtime_forever
      }).map( game => {
        game.playtime_forever = Math.round( (game.playtime_forever / 60) * 100) / 100
        $('#games-list').append(template(game))
      })
    }
  }

  app.gamesView = new GamesView()
  app.gamesView.alreadyRendered = false;
}