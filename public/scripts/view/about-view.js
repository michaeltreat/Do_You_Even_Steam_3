'use strict'

var app = app || {};

(function(module){

  const aboutView = {}
  
  aboutView.initAboutView = () =>{
    console.log('Inside about-view.')
   
    $('.page').hide()
    $('#about-view').show()
  }

  module.aboutView = aboutView
})(app)