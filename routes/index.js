const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST /login
router.post('/login', function (req, res, next) {
    res.send(req.body);
});

// POST /register
router.post('/register', function (req, res, next) {
  if (req.body.email && req.body.password) {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        return res.redirect('/home')
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
