const mongoose = require('mongoose');

// This object contains:
// 1. Metadata related to the post
// 2. The content of the proposed post
// 3. A plan of when the post will occur, 
//    and what account will post it

var PostSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    // When the post-candidate is created
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    // Who wrote the post-candidate
    created_by: {
        type: String,
        required: true,
    },
    // Flagged for review!!
    flags: {
        flag: {
            type: Text,
        }
    },
    // Flagged for review!!
    tags: {
        tag: {
            type: Text,
        }
    },
    // If true, post plan will proceed 
    floated: {
        type: Boolean,
        default: false
    },
    // Object to hold post-candidate info
    postCandidate: {
        // Content of the post-candidate
        content: {
            type: String,
            required: true
        },
        // Any urls that may be in the post
        urls: {
            type: String,
            // Parse string for URL and validate it
        },
        hashtags: {
            type: String,
            // Parse string for hastags and validate it
        },
        // The intended audience of the post
        audience: {
            type: String,
        },
        //Any other additional context
        context: {
            type: String,
        },
    },
    post_plan: {
        // The account that will be posting
        post_account: {
            type: String,
            required: true,
        },
        // When the account is scheduled to post
        post_time: {
            type: Date,
        },
    },
});
