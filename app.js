// src/server.js
const path = require('path');
const express = require('express');
const config = require('./config');
const router = require('./routes');

// app starts here!
const app = express();


const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const eng = require('express-handlebars');

// Connect to MongoDB and create/use database as configured
mongoose.connection.openUri(`mongodb://${config.db.host}/${config.db.dbName}`);

// Use sessions
app.use(session({
  secret: 'insecure',
  resave: true,
  saveUninitialized: false
}));

// Register handlebars as engine
app.engine('handlebars', eng({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use('/', router);

app.get('*', (req, res, next) =>{
  res.render('error');
});


app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});