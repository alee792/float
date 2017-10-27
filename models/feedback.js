const mongoose = require('mongoose');

var FeedbackSchema = new mongoose.Schema({
    post_id: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    created_by: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        // require: true if float is false?
    },
    float: {
        type: Boolean,
        required: true,
    },
    flags: {
        flag: {
            type: text,
        }
    },
    tags: {
        tag: {
            type: text,
        }
    },
    // Create proposed post object created by reviewers
})