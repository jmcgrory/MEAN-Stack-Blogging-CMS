//************************//
//****  Dependencies  ****//
//************************//

  // Mongoose, Schema Consts and our db config
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;
  const config = require('../config/database');

//************************//
//****   Post Model   ****//
//************************//

  // User Schema
  const PostSchema = Schema({
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    category: {
      type: [
        String
      ]
    },
    date: {
      type: Date,
      default: Date.now
    },
    hero: {
      type: String
    },
    chunks: {
      type: [
        Number
      ]
    }
  });

//************************//
//****     Export     ****//
//************************//

  // Create Post model that's avaible outside
  const Post = module.exports = mongoose.model('Post', PostSchema);

//************************//
//****   Functions    ****//
//************************//

  // Get Post by URL
  module.exports.getPostByURL = (search, callback)=>{
    Post.findOne({ url: search.url }, callback);
  }

  // Get Featured Posts
  module.exports.getFeaturedPosts = (args, callback)=>{
    let limit = 3;
    Post.find({}, 'title hero date url', callback).limit(limit);
  }

  // Get All Posts
  module.exports.getAllPosts = ( callback )=>{
    Post.find({}, 'id title date url', callback);
  }

  // Add new Post
  module.exports.addPost = (newPost, callback)=>{
    newPost.save(callback);
  }