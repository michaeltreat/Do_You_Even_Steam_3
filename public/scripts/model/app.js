'use strict'

var app = app || {};

(function(module){

  const _API_ = 'http://localhost:3000/api/v1'

  function Steamer(vanityUrl, steamIdNumber, hours, games){
    this.vanityUrl = vanityUrl
    this.steamId = steamIdNumber
    this.hours = hours
    this.games = games
    this.gameData;
    this.games;
    this.gameCount;
    Steamer.steamer = this
    return this
  }
  
  Steamer.prototype.getSteamId = function(ctx, cb){
    console.log('In getSteamId')
    $.get(`${_API_}/steamers/vanityurl/${this.vanityUrl}`)
      .then( results => {
        results = JSON.parse(results)
        // If there is a vaild response, return and run the next .then. Otherwise switch the vanityUrl and steamId, as the user may have entered in the SteamId.
        if(results.response.steamid) return this.steamId = results.response.steamid
        this.steamId = this.vanityUrl
        this.vanityUrl = null
        return this
      })
      .then( () => this.getUserData(ctx, cb))
      .catch( err => {
        console.log(err)
        this.steadId = this.vanityUrl
        this.getUserData(ctx, cb)
      })
  }
  
  Steamer.prototype.getUserData = function(ctx, cb){
    console.log('In getUserData')
    $.get(`${_API_}/steamers/${this.steamId}`)
      .then(results => {
        results = JSON.parse(results.text)
        console.log(results)
        this.gameData = results.response
        this.games = this.gameData.games
        this.gameCount = this.gameData.gameCount
        return this
      }).then( steamer => steamer)
      .catch(err => console.log(err))
  }

  Steamer.prototype.calculateTotalHours = function(ctx, cb){
    console.log(this.games)
  }
  
  module.Steamer = Steamer

})(app)