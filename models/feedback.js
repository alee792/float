const mongoose = require('mongoose');

var FeedbackSchema = new mongoose.Schema({
    _post: {
        type: String,
        required: true,
        ref: 'Post'
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    created_by: {
        type: String,
        required: true,
        ref: 'User'
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
            type: String,
        }
    },
    tags: {
        tag: {
            type: String,
        },
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    // Create proposed post object created by reviewers
})

var Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;