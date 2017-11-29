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
  const PostChunk = require('../models/PostChunk');

//************************//
//**** Add Post Chunk ****//
//************************//

  // Register post request
  router.post('/add', (req, res, next) => {
    
    // define new post
    let newPostChunk = new Post({
      id: req.body.id,
      name: req.body.type,
      content: req.body.content
    });

    PostChunk.addPostChunk(newPostChunk, (err, postChunk) => {
      if(err){
        res.json({success: false, msg: 'Failed to create chunk'});
      } else {
        res.json({success: true, msg: 'Post Chunk Added'});
      }
    });
  });

//************************//
//****     Export     ****//
//************************//

  // Export our router!
  module.exports = router;