var express = require('express');
var router = express.Router();
var User = require('../models/user');

// POST /register
router.post('/register', function(req, res, next){
  if (req.body.email &&
      req.body.password){
        if (req.body.password != req.body.confirmPassword){
          var err = new Error('Passwords do not match.');
          err.status = 400;
          return next(err);
        }
      } else{
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
      }
});


module.exports = router;
