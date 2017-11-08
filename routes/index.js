const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require('../models/user');
const Post = require('../models/post');
const Feedback = require('../models/feedback');


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
        delete req.session.password;
        req.session.user = user;
        res.send("Logged in");
      }
    });
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// POST /logout
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
})

// POST /register
router.post('/register', (req, res, next) => {
  if (req.body.name && req.body.email
    && req.body.password === req.body.confirmPassword) {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      screen_name: req.body.screen_name
    }

    User.create(userData, (error, user) => {
      if (error) {
        return next(error);
      } else {
        delete req.session.password;
        req.session.user = user
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
  if (!req.session.user) {
    return res.render('login');
  }
  User.find({}, (err, users) => {
    res.send(users);
  });
});

// POST to /api/feedback
router.post('/api/feedback/', (req, res) => {
  const feedbackData = {
    notes: req.body.notes,
    created_by: req.session.user._id,
    _post: req.body.post_id,
    float: req.body.float,
  };

  console.log(feedbackData);

  Feedback.create(feedbackData, (err, newFeedback) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(newFeedback);
  });
});

router.delete('/api/feedback/:feedbackId', (req, res) =>{
  const feedbackId = req.params.feedbackId;

  Feedback.findById(feedbackId, (err, feedback) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (!feedback) {
      return res.status(404).json({message: "Feedback not found"});
    }

    feedback.deleted = true;

    feedback.save( (err, deletedFeedback) => {
      res.json(deletedFeedback)
    });
  });

});

// GET to /feedback
router.get('/feedback', (req, res) => {
  if (!req.session.user) {
    return res.render('login');
  }
  Feedback.find({'created_by': req.session.user._id}).populate("_post").exec((err, feedback) => {
    console.log(feedback);
    return res.render('feedback', {feedback: feedback});
  })

})

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.session.user) {
    return res.render('login');
  }
  Post.find({}).lean().exec((err, posts) => {
    return res.render('index', { posts: posts });
  });
});

router.get('*', (err, req, res, next) => {
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = router;
