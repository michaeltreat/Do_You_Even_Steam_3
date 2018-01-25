'use strict'

var app = app || {};

(function(module){
  const leaderboardView = {}

  leaderboardView.initLeaderboardView = (ctx){
    console.log('Inside leaderboar-view!')
    console.log(ctx)
    $('.page').hide()
    $('#leaderboard-view').show();
  }

  module.leaderboardView = leaderboardView
})(app)