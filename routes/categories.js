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
  const Category = require('../models/Category');

//*************************//
//****    Functions    ****//
//*************************//

    // Get single post
    router.get('/single', (req, res, next) => {

        Category.getCategories( req.query, (err, categories) => {
            res.send(categories);
        });

    });

    // Get all posts
    router.get('/all', (req, res, next) => {

        Category.getAllPosts( (err, category) => {
            res.send(category);
        });
        
    });

//************************//
//****     Export     ****//
//************************//

  // Export our router!
  module.exports = router;