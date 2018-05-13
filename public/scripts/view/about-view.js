'use strict'

var app = app || {};

{
  class AboutView{
    initAboutView(){
      $('.page').hide()
      $('#about-view').show()
    }
  }
  app.aboutView = new AboutView()
}