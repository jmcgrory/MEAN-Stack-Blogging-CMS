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
const User = require('../models/User');

//************************//
//****    REGISTER    ****//
//************************//

// Register post request
router.post('/register', (req, res, next) => {

	// define new user
	let newUser = new User({

		name: req.body.name,

		password: req.body.password,

	});

	// User.addUser(newUser, (err, user) => {

	// 	if (err) {

	// 		res.json({ success: false, msg: 'Failed to register user' });

	// 	} else {

	// 		res.json({ success: true, msg: 'User registered' });

	// 	}

	// });

});

//************************//
//****  Authenticate  ****//
//************************//

// Authentication request
router.post('/authenticate', (req, res, next) => {
	// let or const, you decide!
	const name = req.body.name;
	const password = req.body.password;

	// Function from our user model
	User.getUserByName(name, (err, user) => {
		if (err) throw err;

		if (!user) {
			// No user found, return JSON...
			return res.json({
				success: false,
				msg: 'User not found',
				user: null,
				token: null,
			});
		} else {
			// Compare submitted to hashed pword in User model func
			User.comparePassword(password, user.password, (err, isMatch) => {
				if (err) throw err;
				if (isMatch) {
					// token options
					let opts = { expiresIn: 60000 };

					// Create our token if is a match! (use .toObject bcos lodash )
					const token = jwt.sign(
						user.toObject(),
						config.secret,
						opts
					);

					// send back the right data via json response...
					res.json({
						success: true,
						token: token,
						msg: 'User found',
						user: {
							id: user._id,
							name: user.name,
						},
					});
				} else {
					// Error message ja
					return res.json({
						success: false,
						msg: 'Wrong Password',
						token: false,
						user: false,
					});
				}
			});
		}
	});
});

//************************//
//****     Export     ****//
//************************//

// Export our router!
module.exports = router;
