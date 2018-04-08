//************************//
//****  Dependencies  ****//
//************************//

  // Bring in Express Router
  const express = require('express');
  const router = express.Router();

  // Others
  const config = require('../config/database');
  const passport = require('passport');
  const jwt = require('jsonwebtoken');
  const Post = require('../models/Post');

//*************************//
//****    Functions    ****//
//*************************//

  
function randomURL() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

  // Get featured posts
  router.get('/limit', (req, res, next) => {
    Post.getLimitPosts(req.limit, (err, posts) => {
      res.send(posts);
    });
  });

  // Register post request
  router.post('/add', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    // define new post
    let newPost = new Post({
      title: "New Post",
      url: randomURL(),
      category: [],
      date: Date.now(),
      hero: "https://i.imgur.com/A0NDvgK.jpg",
      chunks: [],
      active: false
    });
    Post.addPost(newPost, (err, post) => {
      if(err){
        res.json({success: false, msg: 'Failed to create post'});
      } else {
        res.json({success: true, msg: 'Post added'});
      }
    });
  });

  // Get single post
  router.get('/post', (req, res, next) => {

    // If is query by URL
    if( 'url' in req.query ){
      Post.getPostByURL( req.query, (err, posts) => {
        res.send(posts);
      });
    }

    // If is query by ID
    if( 'id' in req.query ){
      Post.getPostByID( req.query, (err, posts) => {
        res.send(posts);
      });
    }
  });

  // Get all posts
  router.get('/all', (req, res, next) => {
    Post.getAllPosts( (err, posts) => {
      res.send(posts);
    });
  });
  
  // ?Active
  router.post('/active', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Post.postActive( req.body, (err, posts) => {
      res.send(posts);
    });
  });

  // Delete Post
  router.post('/delete', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    let id = req.body._id;
    Post.deletePost( id, (err, posts) => {
      if(err){
        res.json({success: false, msg: 'Failed to delete'});
      } else {
        res.json({success: true, msg: 'Post deleted'});
      }
    });
  });

  // Update Post Meta
  router.post('/update-meta', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let id = req.body.meta._id;
    let meta = req.body.meta;
    Post.postUpdateMeta( { id: id, meta: meta }, (err, posts) => {
      if(err){
        res.json({success: false, msg: 'Failed to update'});
      } else {
        res.json({success: true, msg: 'Post updated'});
      }
    });
  });

//************************//
//****     Export     ****//
//************************//

  // Export our router!
  module.exports = router;