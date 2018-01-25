'use strict'

var app = app || {};

(function(module){

  const _API_ = 'http://localhost:3000/api/v1'

  function Steamer(vanityUrl, steamIdNumber, hours, games){
    this.vanityUrl = vanityUrl
    this.steamId = steamIdNumber
    this.hours = hours
    this.games = games
    Steamer.steamers.push(this)
    return this
  }
  
  Steamer.prototype.getSteamId = function(){
    $.get(`${_API_}/steamers/vanityurl/${this.vanityUrl}`)
      .then(results => this.steamId = JSON.parse(results).response.steamid)
      .catch( err => console.log(err))
  }
  
  
  Steamer.steamers = []
  module.Steamer = Steamer

})(app)