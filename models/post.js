const mongoose = require('mongoose');

// This object contains:
// 1. Metadata related to the post
// 2. The content of the proposed post
// 3. A plan of when the post will occur, 
//    and what account will post it

var PostSchema = new mongoose.Schema({
    // When the post_candidate is created
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    // Who wrote the post_candidate
    created_by: {
        type: String,
        required: true,
    },
    // Flagged for review!!
    flags: {
        flag: {
            type: String,
        }
    },
    // Flagged for review!!
    tags: [{
        type: String,
    }],
    // If true, post plan will proceed 
    floated: {
        type: Boolean,
        default: false
    },
    // Object to hold post_candidate info
    post_candidate: {
        // Content of the post_candidate
        content: {
            type: String,
            required: true
        },
        // Any urls that may be in the post
        urls: [{
            type: String,
        }],
        // Any hastags that may be in the post
        hashtags: [{
            type: String,
        }],
        // The intended audience of the post
        audience: {
            type: String,
        },
        //Any other additional conString
        conString: {
            type: String,
        },
    },
    post_plan: {
        // The account that will be posting
        post_account: {
            type: String,
            required: true,
        },
        display_name: {
            type: String,
            required: true,
        },
        avatar_image: {
            type: String,
            required: true,
        },
        // When the account is scheduled to post
        post_time: {
            type: String,
        },
    },
});

// Export the model
var Post = mongoose.model('Post', PostSchema);
module.exports = Post;

// Seed the database
Post.count({}, function(err, count) {
    if (err) {
      throw err;
    }
    
    if (count > 0) return ;
  
    const posts = require('./post.seed.json');
    Post.create(posts, function(err, newPosts) {
      if (err) {
        throw err;
      }
      console.log("DB seeded with posts")
    });
  });