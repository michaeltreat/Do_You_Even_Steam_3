'use strict'

const express = require('express')
const superAgent = require('superagent')
const pg = require('pg')
const cors = require('cors')
const bodyParser = require('body-parser').urlencoded({extended: true})

const passport = require('passport')
const util = require('util')
const Strat = require('passport-steam')

const PORT = process.env.PORT || 3000
const KEY = process.env.KEY
const _API_ = 'https://api.steampowered.com'


// Passport
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((obj, done) => done(null, obj))

let config = {
  returnURL: 'http://localhost:3000/auth/steam/return',
  realm: 'http://localhost:3000/',
  apiKey: process.env.KEY
}

passport.use(new Strat(config, (identifier, profile, done) => {
  process.nextTick(() => {
    console.log(profile)
    profile.identifier = identifier;
    return done(null, profile);
  });
}
));

// Connect to Database
const client = new pg.Client('postgres:michaeltreat@localhost:5432/dyes')
client.connect()
client.on('error', error => console.log('Error connecting to DB:', error))

// Initialize app.
const app = express()
app.use(cors()) // Open to all requests.
app.use(passport.initialize());



// ----------- Passport Endpoints ---------------
app.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    console.log('in auth/steam')

    res.redirect('http://localhost:8080/');
  });

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    console.log('in auth/steam/return')
    // let steamid = (req.user._json.steamid)
    let user = req.user._json.personaname

    res.redirect(`http://localhost:8080/?vanityurl=${user}`)
  });

// ----------- SteamAPI Endpoints ---------------


// IF a user has a vanityURL, then we need to make a request to get their user ID. This sends back the steamid
app.get('/api/v1/steamers/vanityurl/:name', (req, res) => {
  console.log(`Hit GET /steamers/vanityurl/${req.params.name}`)
  superAgent.get(`${_API_}/ISteamUser/ResolveVanityURL/v0001/?key=${KEY}&vanityurl=${req.params.name}`)
    .then( result => res.send(result.text))
    .catch( err => console.log(err))
})

app.get('/api/v1/steamers/:id', (req, res) =>{
  console.log(`Hit GET /steamers/${req.params.id}`)
  superAgent.get(`${_API_}/IPlayerService/GetOwnedGames/v0001/?key=${KEY}&steamid=${req.params.id}&format=json&include_appinfo=1`)
    .then( result => res.send(result))
    .catch(err =>{
      res.send('failed')
      console.log(err.text)
    })
})

// --------------- Leaderboard Endpoints ----------------
// Gets all users
app.get('/api/v1/leaderboard', (req, res) =>{
  console.log('Hit GET /leaderboard.')
  client.query(`SELECT * FROM leaderboard WHERE vanity NOT IN ('')`)
    .then( data => res.send(data.rows))
    .catch( err => {
      res.send('No leaderboard yet')
      console.log(err)
    })
})

app.get('/api/v1/leaderboard/:steamid', (req, res) => {
  console.log(`Hit Get /leaderboard/:${req.params.steamid}`)
  client.query(`select * from leaderboard where steamid = '${req.params.steamid}'`)
    .then( result => res.send(result.rows))
    .catch( err => {
      res.send('No match')
      console.log(err)
    })
})

app.post('/api/v1/leaderboard', bodyParser, (req, res) => {
  console.log('Hit POST /leaderboard')
  client.query(`
    INSERT INTO leaderboard(steamid, hours, vanity)
    VALUES(${req.body.steamid}, ${req.body.hours}, '${req.body.vanity}') 
    ON CONFLICT (steamid) DO UPDATE
      SET
       hours=${req.body.hours},
       vanity='${req.body.vanity}'
    `)
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