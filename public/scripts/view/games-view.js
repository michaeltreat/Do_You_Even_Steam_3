'use strict'

var app = app || {};

(function(module){

  const gamesView = {}

  gamesView.initGamesView = ctx =>{
    console.log('Inside games-view.')
    console.log(ctx)
    $('.page').hide()
    $('#games-view').show()
    if(!ctx.steamer) return app.gamesView.errorNoSteamer()
    app.gameView.renderGamesList()
  }

  gamesView.errorNoSteamer = () => {
    if(!localStorage.steamer) return $('#game-nouser-error').show()
    $('#game-localuser-error').show()
    let s = JSON.parse(localStorage.steamer)
    new app.Steamer(s.vanityUrl, s.steamId, s.hours, s.games)
    app.gamesView.renderGamesList()
  }

  gamesView.renderGamesList = function(){
    console.log('i am ashamed')
    let template = Handlebars.compile($('#game-details-template').text()); 
    app.Steamer.steamer.games.map( game => {
      console.log(game)
      $('#games-list').append(template(game))
    })
  }

  module.gamesView = gamesView
})(app)