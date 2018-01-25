'use strict'

var app = app || {};

(function(module){

  function Steamer(steamIdNumber, vanityUrl, hours, games){
    this.steamId = steamIdNumber
    this.vanityUrl = vanityUrl
    this.hours = hours
    this.games = games
    Steamer.steamers.push(this)
    return this
  }
  
  Steamer.prototype.getVanityUrl = function(){
    console.log(this)
  }
  
  
  Steamer.steamers = []
  module.Steamer = Steamer

})(app)