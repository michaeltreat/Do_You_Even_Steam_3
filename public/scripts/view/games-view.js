'use strict'

var app = app || {};

(function(module){

  const gamesView = {}

  gamesView.initGamesView = ctx =>{
    console.log('Inside games-view.')
    console.log(ctx)
    $('.page').hide()
    $('#games-view').show()
  }

  module.gamesView = gamesView
})(app)