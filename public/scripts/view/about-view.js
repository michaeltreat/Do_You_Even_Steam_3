'use strict'

var app = app || {};

{
  class aboutView{
    initAboutView(){
      console.log('Inside about-view.')

      $('.page').hide()
      $('#about-view').show()
    }
  }
  app.aboutView = aboutView
}