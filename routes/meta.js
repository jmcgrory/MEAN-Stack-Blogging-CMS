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
router.post('/update',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {

        Meta.update(req, (err, meta) => {

            if (err) {

                res.json({ success: false, msg: 'Failed to update' });

            } else {

                res.json({ success: true, msg: 'Meta updated' });

            }

        });

    });


//************************//
//****     Export     ****//
//************************//

// Export our router!
module.exports = router;
