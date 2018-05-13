'use strict'

var app = app || {};

{
  const _API_ = 'https://dyes.herokuapp.com/api/v1'

  class Steamer {
    constructor(vanityUrl, steamIdNumber, hours, games){
      this.vanityUrl = vanityUrl
      this.steamId = steamIdNumber
      this.hours = hours
      this.games = games
      this.rank = 'No position yet!'
      app.steamer = this
      return this
    }

    getSteamId(ctx, next){
      $.get(`${_API_}/steamers/vanityurl/${this.vanityUrl}`)
        .then( data => {
          data = JSON.parse(data)

          // If there is a vaild dataponse, return and run the next .then. Otherwise switch the vanityUrl and steamId, as the user may have entered in the SteamId.
          if(data.response.steamid) return this.steamId = data.response.steamid

          // If the value the user entered isn't 17 long, or it isn't a number, then return false.
          if(this.vanityUrl.length !== 17 || isNaN(Number(this.vanityUrl))) return false

          this.steamId = this.vanityUrl
          this.vanityUrl = ''
          return this
        })

        .then( potentialSteamId => {
          if(potentialSteamId) return this.getUserData(ctx, next)

          delete app.steamer
          return app.homeView.errorInvalidSteamer()
        })
        .catch( err => console.log(err))
    }

    getUserData(ctx,next){
      console.log('In getUserData')
      $.get(`${_API_}/steamers/${this.steamId}`)
        .then(results => {
          // Return false if the api returns failed. will prompt errorview.
          if(results === 'failed') return false

          results = JSON.parse(results.text)
          this.gameData = results.response
          this.games = this.gameData.games || []
          this.gamesCount = this.gameData.game_count
          return this

        }).then( validUser => {
          if(validUser) return this.calcHours(ctx, next)
          return app.homeView.errorInvalidSteamer()
        })
        .catch(err => console.log(err))

    }

    calcHours(ctx,next){
      this.hours = this.games.map( game => game.playtime_forever).reduce( (hour, curr) => curr += hour, 0 ) / 60
      this.wage = this.hours * 15
      ctx.steamer = this
      localStorage.steamer = JSON.stringify(this)
      next()
    }
  }

  app.Steamer = Steamer
}