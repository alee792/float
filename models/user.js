var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String, 
        required: true
    },
    name: {
        type: String
    },
    created_dttm: {
        type: Date,
        default: Date.now
    },
    screen_name: {
        type: String,
        unique: true
    }
});

// Authentication routine on login
UserSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({ email: email })
        .exec(function(error, user) {
            if (error) {
                return callback(error);
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err)
            }
            bcrypt.compare(password, user.password, function(error, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        })
};

// bcrypt passwords before save
UserSchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});


// Export the model
var User = mongoose.model('User', UserSchema);
module.exports = User;

// Seed the database
User.count({}, function(err, count) {
    if (err) {
      throw err;
    }
    
    if (count > 0) return ;
  
    const users = require('./user.seed.json');
    User.create(users, function(err, newUsers) {
      if (err) {
        throw err;
      }
      console.log("DB seeded with user")
    });
  });