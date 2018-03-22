'use strict'

var app = app || {};

(function(module){

  const helpView = {}

  helpView.initHelpView = () => {
    console.log('Inside help-view.')
    $('.page').hide()
    $('#help-view').show()
  }

  module.helpView = helpView
})(app)