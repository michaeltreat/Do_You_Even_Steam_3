'use strict'

var app = app || {};

{
  class HelpView {
    initHelpView(){
      console.log('Inside help-view.')
      $('.page').hide()
      $('#help-view').show()
    }
  }

  app.helpView = new HelpView()
}