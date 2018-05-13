'use strict'

var app = app || {};

{
  class AboutView{
    initAboutView(){
      console.log('Inside about-view.')

      $('.page').hide()
      $('#about-view').show()
    }
  }
  app.aboutView = new AboutView()
}