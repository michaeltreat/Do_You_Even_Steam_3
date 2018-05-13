'use strict'
/* global page, app */


page('/', app.homeView.initHomeView, app.shameView.initShameView, app.shameView.calculateShame)

page('/steamer', app.shameView.initShameView, app.shameView.calculateShame)

page('/games', app.gamesView.initGamesView)

page('*', () => console.log('anything else'), app.homeView.initHomeView)

page()

if(window.location.pathname !== '/') page('/')
