'use strict'

var app = app || {};

(function(module){

  const shameView = {}

  shameView.initShameView = ctx =>{
    console.log('Inside shame-view.')
    console.log(ctx)
    $('.page').hide()
    $('#shame-view').show()
  }
  
  module.shameView = shameView
})(app)