'use strict'

page('/', (ctx, next) => app.homeView.initHomeView, app.shameView.initShameView)

page()