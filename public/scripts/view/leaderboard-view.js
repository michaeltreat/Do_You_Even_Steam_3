'use strict'

var app = app || {};

{
  class leaderboardView {
    initLeaderboardView(ctx){
      console.log('Inside leaderboar-view!')
      console.log(ctx)
      $('.page').hide()
      $('#leaderboard-view').show();
    }
  }

  app.leaderboardView = leaderboardView
}