'use strict'

var app = app || {};

{
  class LeaderboardView {
    initLeaderboardView(ctx){
      console.log('Inside leaderboar-view!')
      console.log(ctx)
      $('.page').hide()
      $('#leaderboard-view').show();
    }
  }

  app.leaderboardView = new LeaderboardView()
}