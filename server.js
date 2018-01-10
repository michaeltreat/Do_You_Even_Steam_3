'use strict'

const express = require('express') // Express server.
const superAgent = require('superagent') // Used as a proxy server.
const pg = require('pg') // PostgreSQL database.
const cors = require('cors') // Allows us to accept all requests.
const bodyParser = require('body-parser').urlencoded({extended: true}) // To parse the body of our requests.

const PORT = process.env.PORT || 3000
const _API_ = 'https://api.steampowered.com' 

const client = new pg.Client('postgres://postgres:12341234@localhost:5432/dyes')
client.connect()
client.on('error', error => console.log('Error connecting to DB:', error))

const app = express()
app.use(cors()) // Open to all requests.


app.get('/api/v1/steamers/:id', (req, res) =>{
  console.log(`Hit /steamers/${req.params.id}`)

  superAgent.get(`${_API_}/IPlayerService/GetOwnedGames/v0001/?key=${process.env.KEY}&steamid=${req.params.id}&format=json&include_appinfo=1`)
    .then( result => {
      console.log('Sending results for /steamers/:id')
      res.send(result)
    }).catch(err => console.log('Err in /steamers/:id :', err))
})


app.get('/test', (req, res) => {
  console.log('Test route hit.')
  res.send( 'Successful hit on test route.')
})

app.get('/api/v1/accounts', (req, res) => {
  console.log('Hit /accounts.')
  client.query('SELECT COUNT(*) FROM accounts').then(results => res.send(results.rows))
})





app.listen(PORT, () => console.log('Connected on port:', PORT))