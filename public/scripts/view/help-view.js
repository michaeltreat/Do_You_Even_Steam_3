'use strict'

var app = app || {};

{
  class HelpView {
    initHelpView(){
      $('.page').hide()
      $('#help-view').show()
    }
  }

  app.helpView = new HelpView()
}