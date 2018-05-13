'use strict'
/* global page, app */

if(window.location.pathname !== '/') page.base(window.location.pathname)

page('/', app.homeView.initHomeView, app.shameView.initShameView, app.shameView.calculateShame)

page('/steamer', app.shameView.initShameView, app.shameView.calculateShame)

page('/games', app.gamesView.initGamesView)

page('*', app.homeView.initHomeView)

page()

