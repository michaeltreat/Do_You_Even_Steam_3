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
  
  Steamer.prototype.getSteamId = function(ctx, next){
    $.get(`${_API_}/steamers/vanityurl/${this.vanityUrl}`)
      .then( data => {
        data = JSON.parse(data)

        // If there is a vaild dataponse, return and run the next .then. Otherwise switch the vanityUrl and steamId, as the user may have entered in the SteamId.
        if(data.response.steamid) return this.steamId = data.response.steamid

        // If the value the user entered isn't 17 long, or it isn't a number, then return false.
        if(this.vanityUrl.length !== 17 || isNaN(Number(this.vanityUrl))) return false

        this.steamId = this.vanityUrl
        delete this.vanityUrl
        return this
      })

      .then( potentialSteamId => {
        if(potentialSteamId) return this.getUserData(ctx, next)

        delete app.Steamer.steamer
        return app.homeView.errorInvalidSteamer()
      })
      .catch( err => console.log(err))
  }
  
  Steamer.prototype.getUserData = function(ctx, next){
    $.get(`${_API_}/steamers/${this.steamId}`)
      .then(results => {
        // Return false if the api returns failed. will prompt errorview.
        if(results === 'failed') return false

        results = JSON.parse(results.text)
        this.gameData = results.response
        this.games = this.gameData.games
        this.gameCount = this.gameData.gameCount
        return this

      }).then( validUser => {
        if(validUser) return this.calcHours(ctx, next)
        return app.homeView.errorInvalidSteamer()
      })
      .catch(err => console.log(err))
  }

  Steamer.prototype.calcHours = function(ctx, next){
    this.hours = this.games.map( game => game.playtime_forever).reduce( (hour, cum) => cum += hour, 0 ) / 60
    ctx.steamer = this
    next()
  }
  
  module.Steamer = Steamer

})(app)