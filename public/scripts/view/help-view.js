'use strict'

var app = app || {};

{
  class helpView {
    initHelpView(){
      console.log('Inside help-view.')
      $('.page').hide()
      $('#help-view').show()
    }
  }

  app.helpView = helpView
}