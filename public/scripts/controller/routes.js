'use strict'
/* global page, app */

page('/', app.HomeView.initHomeView, app.ShameView.initShameView, app.ShameView.calculateShame)

page('/steamer', app.ShameView.initShameView, app.ShameView.calculateShame)

page('/games', app.GamesView.initGamesView)

page()