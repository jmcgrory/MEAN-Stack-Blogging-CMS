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
const Meta = require('../models/Meta');

//*************************//
//****    Functions    ****//
//*************************//

// Get posts with arguments
router.get('/get',
    (req, res, next) => {

        Meta.get(req.query, (err, meta) => {

            if (err) console.log(err);

            res.send(meta);

        });

    });
// Get posts with arguments
router.post('/post',
    (req, res, next) => {

        Meta.post({}, (err, meta) => {

            if (err) console.log(err);

            res.send(meta);

        });

    });


//************************//
//****     Export     ****//
//************************//

// Export our router!
module.exports = router;
