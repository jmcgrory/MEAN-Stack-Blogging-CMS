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
        String
      ]
    },
    active: {
      type: Boolean
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

  // Get Post by URL
  module.exports.getPostByID = (search, callback)=>{
    Post.findById( search.id, callback);
  }

  // Get Featured Posts
  module.exports.getLimitPosts = (limit, callback)=>{
    Post.find({ active: true }, 'title hero date url', callback).limit(limit).sort({date: 'desc'});
  }

  // Get All Posts
  module.exports.getAllPosts = ( callback )=>{
    Post.find({}, 'id hero title date url active', callback);
  }
  
  // Add new Post
  module.exports.addPost = (newPost, callback)=>{
    newPost.save(callback);
  }
  
  // Delete Post
  module.exports.deletePost = (id, callback)=>{
    Post.remove({ _id: id }, callback);
  }

  // ?Active Post
  module.exports.postActive = (req, callback)=>{
    Post.update(
      { _id: req.id },
      { $set: { active: req.active } },
      callback
    )
  }

  // Update Post
  module.exports.postUpdateMeta = (req, callback)=>{
    Post.update(
      { _id: req.id },
      { $set: {
          title: req.meta.title,
          url: req.meta.url,
          hero: req.meta.hero,
          date: req.meta.date,
          category: req.meta.category,
          chunks: req.meta.chunks
        }
      },
      callback
    )
  }