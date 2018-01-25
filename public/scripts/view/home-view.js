'use strict'

var app = app || {};

(function(module){

  const homeView = {}

  homeView.initHomeView = () => {
    $('.page').hide()
    $('#home-view').show()
    $('#search-steamer').on('submit', (e) => {
      e.preventDefault()
      $('#home-view input').val()
      $('#home-view input').val('')
    })
  }
  
  module.homeView = homeView
})(app)