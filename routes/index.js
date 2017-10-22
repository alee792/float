const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require('../models/user');
const eng = require('express-handlebars');

// Register handlebars as engine
app.engine('handlebars', eng({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// POST /login
router.post('/login', (req, res, next) => {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, (error, user) => {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        // Create session and return user to "home"
        req.session.userId = user._id
        console.log(req.session.userId + " logged in")
        return res.send("Logged in")
      }
    });
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// POST /register
router.post('/register', (req, res, next) => {
  if (req.body.name && req.body.email 
      && req.body.password === req.body.confirmPassword) {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    User.create(userData, (error, user) => {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id
        return res.send("Good job, user created!")
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

// GET /users
router.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    res.send(users);
  });
});

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.session.userId) {
    return res.render('login', { title: 'Express' });
  }
  User.findById(req.session.userId)
    .exec( (error, user) => {
      if (error) { 
        return next(error);
      } else {
        return res.render('index');
      }
    });
});

router.get('*', (err, req, res, next) =>{
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = router;
