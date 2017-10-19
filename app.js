// src/server.js
const path = require('path');
const bodyParser = require('body-parser');

// Load mongoose package
const mongoose = require('mongoose');

// Load and register handlebars
const eng = require('express-handlebars');

const express = require('express');
const config = require('./config');
const router = require('./routes');

// Connect to MongoDB and create/use database as configured
mongoose.connection.openUri(`mongodb://${config.db.host}/${config.db.dbName}`);

// Import all models
require('./models/user.js');

const app = express();

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