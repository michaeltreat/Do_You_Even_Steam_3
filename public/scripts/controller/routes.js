'use strict'
/* global page, app */


page('/', app.homeView.initHomeView, app.shameView.initShameView, app.shameView.calculateShame)

page('/steamer', app.shameView.initShameView, app.shameView.calculateShame)

page('/games', app.gamesView.initGamesView)

page('/auth/signedup', app.shameView.initShameView)

page('*', app.homeView.initHomeView, app.shameView.initShameView, app.shameView.calculateShame)

page()