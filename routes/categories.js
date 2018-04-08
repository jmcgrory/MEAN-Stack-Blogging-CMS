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

        Category.getCategory( req.query, (err, category) => {
            res.send(category);
        });

    });

    // Get all posts
    router.get('/all', (req, res, next) => {

        Category.getCategories( (err, categories) => {
            res.send(categories);
        });
        
    });

//************************//
//****     Export     ****//
//************************//

  // Export our router!
  module.exports = router;