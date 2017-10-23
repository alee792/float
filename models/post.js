var mongoose = require('mongoose');

var PostUserSchmea = new mongoose.Schema({
    name: {
        type: String
    },
    created_dttm: {
        type: Date,
        default: Date.now
    },
    primary_twitter: {
        type: String,
        unique: true
    }
})

var PostSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String, 
        required: true
    },
    source: {
        type: String
    },
    user: {
        type: String,
        unique: true
    }
});
