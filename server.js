'use strict'

const express = require('express') // Express server.
const superAgent = require('superagent') // Used as a proxy server.
const pg = require('pg') // PostgreSQL database.
const cors = require('cors') // Allows us to accept all requests.
const bodyParser = require('body-parser').urlencoded({extended: true}) // To parse the body of our requests.
const PORT = process.env.PORT || 3000

const client = new pg.Client(`postgres://postgres:12341234@localhost:5432/dyes`)
client.connect()
client.on('error', error => console.log('Error connecting to DB:', error))

const app = express()

app.use(cors()) // Open to all requests.

app.get('/test', (req, res) =>{
  console.log('Test route hit.')
  res.send( 'Successful hit on test route.')
} )

app.get('/api/v1/accounts', (req, res) =>{
  client.query(`
    SELECT COUNT(*) FROM accounts
  `).then(results => {
    console.log(results.rows)
    res.send(results.rows)
  })
})





app.listen(PORT, () => console.log('Connected on port:', PORT))