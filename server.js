'use strict'

const express = require('express') // Express server.
const superAgent = require('superagent') // Used as a proxy server.
const pg = require('pg') // PostgreSQL database.
const cors = require('cors') // Allows us to accept all requests.
const bodyParser = require('body-parser').urlencoded({extended: true}) // To parse the body of our requests.

const PORT = process.env.PORT || 3000
const _API_ = 'https://api.steampowered.com' 


// Connect to Database
const client = new pg.Client('postgres://postgres:12341234@localhost:5432/dyes')
client.connect()
client.on('error', error => console.log('Error connecting to DB:', error))

// Initialize app.
const app = express()
app.use(cors()) // Open to all requests.

// ----------- SteamAPI Endpoints ---------------

app.get('/api/v1/steamers/vanityurl/:name', (req, res) => {
  console.log(`Hit GET /steamers/vanityurl/${req.params.name}`)
  superAgent.get(`${_API_}/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.KEY}&vanityurl=${req.params.name}`)
    .then( result => res.send(result.text.response.steamid))
    .catch( err => res.send('there was an error in the GET /vanityurl endpoint', err))
})

app.get('/api/v1/steamers/:id', (req, res) =>{
  console.log(`Hit GET /steamers/${req.params.id}`)
  superAgent.get(`${_API_}/IPlayerService/GetOwnedGames/v0001/?key=${process.env.KEY}&steamid=${req.params.id}&format=json&include_appinfo=1`)
    .then( result => res.send(result))
    .catch(err => console.log( err))
})

// --------------- Leaderboard Endpoints ----------------

app.get('/api/v1/leaderboard', (req, res) =>{
  console.log('Hit GET /leaderboard.')
  client.query('SELECT * FROM leaderboard')
    .then( data => res.send(data.rows))
    .catch( err => console.log(err))
})

app.post('/api/v1/leaderboard', bodyParser, (req, res) => {
  console.log('Hit POST /leaderboard')
  client.query(`INSERT INTO leaderboard(name, hours) VALUES('${req.body.name}', ${req.body.hours})`)
    .then(() => res.send('Insert Successful.'))
    .catch( err => console.log(err))
})


// --------------- Other Endpoints -----------------------

app.get('/api/v1/accounts', (req, res) => {
  console.log('Hit GET /accounts.')
  client.query('SELECT COUNT(*) FROM accounts').then(results => res.send(results.rows))
    .then(results => res.send(results))
    .catch( err => console.log(err))
})


app.get('/ping', (req, res) => res.send( 'pong'))
app.listen(PORT, () => console.log('Connected on port:', PORT))