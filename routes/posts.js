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

//************************//
//****    Add Post    ****//
//************************//

  // Register post request
  router.post('/add', (req, res, next) => {
    // define new post
    let newPost = new Post({
      title: req.body.title,
      url: req.body.url,
      category: req.body.category,
      date: Date.now,
      hero: req.body.hero,
      chunks: req.body.chunks
    });
    Post.addPost(newPost, (err, post) => {
      if(err){
        res.json({success: false, msg: 'Failed to create post'});
      } else {
        res.json({success: true, msg: 'Post added'});
      }
    });
  });

  // Get featured posts
  router.get('/featured', (req, res, next) => {
    Post.getFeaturedPosts(req, (err, posts) => {
      res.send(posts);
    });
  });

  // Get featured posts
  router.get('/post', (req, res, next) => {
    Post.getPostByURL( req.query, (err, posts) => {
      res.send(posts);
    });
  });

  // Get all posts
  router.get('/all', (req, res, next) => {
    Post.getAllPosts( (err, posts) => {
      res.send(posts);
    });
  });

//************************//
//****     Export     ****//
//************************//

  // Export our router!
  module.exports = router;