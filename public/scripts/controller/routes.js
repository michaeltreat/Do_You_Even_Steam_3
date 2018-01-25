'use strict'

page('/', app.homeView.initHomeView, app.shameView.initShameView, app.shameView.calculateShame)

page('/steamer', app.shameView.initShameView, app.shameView.calculateShame)

page()